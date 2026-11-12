/**
 * Everything written on the About page.
 * Edit the text here — the page only lays it out.
 * Private details (device prices, salary targets, client rates) are
 * deliberately left out of this file. It is a public page.
 */

export const ABOUT = {
  eyebrow: 'About',
  title: 'One developer, from first sketch to handover.',
  lede: "I'm Mark Icel Sarmiento. I build web and mobile apps, wire up hardware, and set up AI tools that take the repetitive work off your hands. Based in the Philippines, working solo under CronzPH.",

  facts: [
    { label: 'Based in', value: 'Philippines' },
    { label: 'Working as', value: 'Solo developer' },
    { label: 'Background', value: 'IT graduate' },
    { label: 'Status', value: 'Open for work' },
  ],

  intro: [
    'I run CronzPH, a one-person studio. The person you talk to is the person who designs, builds, tests and hands over the system. No account manager in between.',
    "Most of what I know came from needing something that didn't exist yet. A code index that runs on a phone. A way for an AI to reach a phone's storage. One local proxy so five editors could share a model. When the tool isn't there, I build it.",
  ],

  story: {
    title: 'The short version',
    sub: 'How a phone-only setup turned into a full build environment.',
    steps: [
      {
        num: '01',
        title: 'A phone was the whole setup',
        body: 'No laptop, no desktop. Termux was the shell and AndroidIDE built the APKs. The first Android apps were written, compiled and debugged on a small screen.',
      },
      {
        num: '02',
        title: 'Learning by shipping',
        body: "I'm an IT graduate, self-taught in automation. Most of this stack came from a project with a deadline, not a course with a certificate.",
      },
      {
        num: '03',
        title: 'Building the missing tools',
        body: "When the usual tools didn't fit, I wrote my own: a codebase index for a phone, a storage bridge for AI, a local model proxy.",
      },
      {
        num: '04',
        title: 'A real desk, same habit',
        body: 'Since November 2026 I work on a Windows machine with a dedicated GPU. The habit stayed the same: if the tool is missing, build it.',
      },
    ],
  },

  work: {
    title: 'What I do',
    sub: 'Six kinds of work, one person doing all of them.',
    items: [
      {
        icon: 'code',
        title: 'Web development',
        body: 'React and Next.js front ends, Firebase or Supabase behind them, deployed on Vercel. Dashboards, storefronts, admin panels, anything with live data.',
        tags: ['React', 'Next.js', 'Firebase', 'Supabase'],
      },
      {
        icon: 'phone',
        title: 'Mobile apps',
        body: 'Native Android in Java and Kotlin, built with the Android SDK and Gradle. I started on a phone, so I know how a build fails before it reaches the desktop.',
        tags: ['Java', 'Kotlin', 'Android SDK'],
      },
      {
        icon: 'bolt',
        title: 'AI automation',
        body: 'Workflow automations, local models behind one API, and MCP tools that let an assistant touch real files. The boring parts run themselves.',
        tags: ['n8n', 'LiteLLM', 'Ollama', 'MCP'],
      },
      {
        icon: 'chip',
        title: 'Hardware and IoT',
        body: 'Arduino and ESP32 boards, sensors, solar and battery builds. Software that ends in a relay clicking is still software.',
        tags: ['Arduino', 'ESP32', 'Solar'],
      },
      {
        icon: 'wrench',
        title: 'IT support',
        body: 'Windows setups, networking, device troubleshooting, dev environments. The unglamorous work that keeps a small business running.',
        tags: ['Windows', 'Networking', 'Tailscale'],
      },
      {
        icon: 'note',
        title: 'Docs and handover',
        body: 'Setup guides, runbooks and handover notes written for the person who has to run the system, not for the developer who built it.',
        tags: ['Manuals', 'Runbooks'],
      },
    ],
  },

  process: {
    title: 'How I work',
    sub: 'Twelve steps, six gates. The same path on every project, small or large.',
    items: [
      {
        num: '01',
        title: 'Discover',
        body: 'Questions first. What the system has to do, who touches it, and what breaks if it stops. The scope gets written down before anything is built.',
        covers: ['00 Interviewer', '01 Planner'],
      },
      {
        num: '02',
        title: 'Design',
        body: 'Screens, structure and the data model decided together, because a field added later is cheaper than a schema rewritten later.',
        covers: ['02 Architect', '03 Data Architect', '04 UI Designer'],
      },
      {
        num: '03',
        title: 'Prototype',
        body: 'A clickable pass of the real screens. You approve the flow while it is still cheap to change.',
        covers: ['05 Prototyper'],
      },
      {
        num: '04',
        title: 'Build',
        body: 'The feature ships complete: create, edit, delete, permissions and the empty states. Not just the happy path.',
        covers: ['07 Coder'],
      },
      {
        num: '05',
        title: 'Prove',
        body: 'Checked for holes, tested on real devices, and every failure traced to its cause instead of patched at the symptom.',
        covers: ['06 Security', '08 QA', '09 Debugger'],
      },
      {
        num: '06',
        title: 'Ship',
        body: 'Deployed, documented, then walked through with you. You see it working before you read about it.',
        covers: ['10 Shipper', '11 Presenter'],
      },
    ],
  },

  setup: {
    title: 'The setup',
    sub: 'What the work actually runs on.',
    rigSummary:
      'A 16-inch Windows laptop with an 8GB GPU, a second monitor, and a phone that still runs Linux.',
    rig: [
      { label: 'Machine', value: 'Gigabyte Aero X16' },
      { label: 'Processor', value: 'Ryzen AI 7 350' },
      { label: 'Memory', value: '32GB DDR5' },
      { label: 'Graphics', value: 'RTX 5050, 8GB VRAM' },
      { label: 'Display', value: '16in 2560×1600 + 24in 144Hz' },
      { label: 'Storage', value: '2TB NVMe' },
      { label: 'Also on the desk', value: 'Phone on Termux, Debian netbook' },
    ],
    stack: [
      { group: 'Web', items: ['React', 'Next.js', 'Vite', 'Node.js', 'Firebase', 'Supabase', 'Vercel'] },
      { group: 'Mobile', items: ['Java', 'Kotlin', 'Android SDK', 'Gradle', 'AndroidIDE'] },
      { group: 'AI', items: ['Ollama', 'LiteLLM', 'Bedrock', 'Claude', 'Gemini', 'MCP'] },
      { group: 'Daily tools', items: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Obsidian', 'Tailscale'] },
    ],
  },

  now: {
    title: 'Building now',
    sub: 'Active work, with the real status of each one.',
    items: [
      {
        name: 'CronzPH',
        status: 'Running',
        body: 'The studio itself. Web builds, AI automation and hardware work for small businesses, plus a first retainer client.',
        tags: ['Studio', 'Clients'],
      },
      {
        name: 'MCP storage bridge',
        status: 'Working',
        body: "An AI assistant that can list, read and write my phone's storage through a fixed Cloudflare URL, so the connector never needs editing.",
        tags: ['Node', 'MCP', 'Cloudflare'],
      },
    ],
  },

  cta: {
    title: 'Have something that needs building?',
    body: "Tell me what it has to do. I'll tell you how I'd build it and what it takes.",
  },
};
