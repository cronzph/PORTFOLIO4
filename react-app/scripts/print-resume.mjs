/**
 * Rebuilds public/Mark_Icel_Sarmiento_resume.pdf from the résumé source.
 *
 * The résumé is plain HTML, printed to PDF by a headless Edge/Chrome so the
 * output is identical every run: A4, no margins, backgrounds on, exactly one
 * page. Doing this through the print dialog by hand is what breaks the layout,
 * so run `npm run resume` instead.
 *
 * Edit the text in ../resume/resume.html and the photo in ../resume/photo.jpg.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = resolve(APP_DIR, '..', 'resume', 'resume.html');
const OUTPUT = join(APP_DIR, 'public', 'Mark_Icel_Sarmiento_resume.pdf');
/* Same file next to the source, so the working folder always has a current
   copy to open and check. */
const MIRROR = resolve(APP_DIR, '..', 'resume', 'Mark_Icel_Sarmiento_resume.pdf');

/* A4 at 96dpi. The stylesheet is 210mm x 297mm, so anything taller spills
   onto a second page. */
const A4_HEIGHT_PX = Math.round((297 * 96) / 25.4);

/* Edge first, then Chrome. Set CHROME_PATH to use something else. */
const BROWSERS = [
  process.env.CHROME_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

function findBrowser() {
  const found = BROWSERS.find((path) => existsSync(path));
  if (!found) {
    console.error('No Edge or Chrome found. Set CHROME_PATH to the browser executable.');
    process.exit(1);
  }
  return found;
}

/** Minimal CDP client over the browser's own WebSocket. */
async function connect(port) {
  const { webSocketDebuggerUrl } = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
  const ws = new WebSocket(webSocketDebuggerUrl);
  await new Promise((open) => ws.addEventListener('open', open, { once: true }));

  let nextId = 1;
  const waiting = new Map();

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    const call = waiting.get(message.id);
    if (!call) return;
    waiting.delete(message.id);
    if (message.error) call.reject(new Error(message.error.message));
    else call.resolve(message.result);
  });

  const send = (method, params = {}, sessionId) =>
    new Promise((resolveCall, rejectCall) => {
      const id = nextId++;
      waiting.set(id, { resolve: resolveCall, reject: rejectCall });
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });

  return { ws, send };
}

/** Wait for the DevTools port file, then return the port. */
async function waitForPort(profileDir) {
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      const port = readFileSync(join(profileDir, 'DevToolsActivePort'), 'utf8').split('\n')[0].trim();
      if (port) return Number(port);
    } catch {
      /* not written yet */
    }
    await sleep(250);
  }
  throw new Error('The browser never opened its debugging port.');
}

if (!existsSync(SOURCE)) {
  console.error(`Missing résumé source: ${SOURCE}`);
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), 'resume-print-'));
const browser = spawn(findBrowser(), [
  '--headless=new',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--disable-gpu',
  '--remote-allow-origins=*',
  'about:blank',
], { stdio: 'ignore' });

let ws;
try {
  const port = await waitForPort(profile);
  const client = await connect(port);
  ws = client.ws;

  const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
  const send = (method, params) => client.send(method, params, sessionId);

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: `file:///${SOURCE.replace(/\\/g, '/')}` });
  await sleep(1500);

  const measured = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      height: document.documentElement.scrollHeight,
      photo: (() => {
        const img = document.querySelector('.head__photo');
        return img && img.complete && img.naturalWidth > 0 ? img.naturalWidth + 'px' : 'missing';
      })(),
    })`,
    returnByValue: true,
  });
  const { height, photo } = JSON.parse(measured.result.value);

  const { data } = await send('Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  });
  const pdfBytes = Buffer.from(data, 'base64');
  writeFileSync(OUTPUT, pdfBytes);
  writeFileSync(MIRROR, pdfBytes);

  // Count the pages in the file that was just written, not the ones intended.
  const pdf = readFileSync(OUTPUT).toString('latin1');
  const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length;
  const kb = Math.round(statSync(OUTPUT).size / 1024);

  console.log(`photo   ${photo}`);
  console.log(`height  ${height}px of ${A4_HEIGHT_PX}px`);
  console.log(`output  ${OUTPUT} (${kb} KB, ${pages} page${pages === 1 ? '' : 's'})`);
  console.log(`copy    ${MIRROR}`);

  if (height > A4_HEIGHT_PX) {
    console.warn('WARNING: the content is taller than one A4 page. Trim the text before shipping.');
  }
  if (pages > 1) {
    console.warn('WARNING: the PDF spilled onto a second page.');
  }
} finally {
  ws?.close();
  browser.kill();
  await sleep(300);
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* temp folder */ }
}
