/**
 * All static, hand-edited content lives here.
 * Projects, blog posts and highlights come from Firebase instead.
 */

export const PROFILE = {
  name: 'Mark Icel Sarmiento',
  handle: '@cronzph',
  role: 'Developer · Automation · IoT',
  email: 'cronzph@gmail.com',
  location: 'Philippines',
  available: true,
  photo: '/me.webp',
  resume: '/Mark_Icel_Sarmiento_resume.pdf',
  headline: { solid: 'Build It Strong.', soft: 'Benefit From It FOREVER.' },
  lede: 'Websites, mobile apps and automations that keep working after the handoff.',
  about:
    "I'm Mark Icel, a developer and hardware tinkerer. I build web and mobile apps, wire up Arduino and IoT systems, and automate the boring parts with n8n. Concept to deployment, clean code, no loose ends.",
  credentials:
    'IT graduate, self-taught in automation and AI tooling. Every claim on this page comes with a demo or a repo behind it.',
  contactBlurb:
    "Have a system that needs building, or one that needs fixing? Tell me what it has to do and I'll tell you how I'd build it.",
};

// EDIT: replace with your real profile links.
export const SOCIALS = [
  { label: 'GitHub', short: 'GH', href: 'https://github.com/cronzph', icon: 'github' },
  {
    label: 'LinkedIn',
    short: 'IN',
    href: 'https://www.linkedin.com/in/mark-icel-sarmiento-8457b4417',
    icon: 'linkedin',
  },
  {
    label: 'Facebook',
    short: 'FB',
    href: 'https://www.facebook.com/profile.php?id=61593995310196',
    icon: 'facebook',
  },
];

export const NAV = [
  { label: 'Home', to: '/', icon: 'home', end: true },
  { label: 'Projects', to: '/projects', icon: 'folder' },
  { label: 'Blog', to: '/blog', icon: 'note' },
  { label: 'Services', to: '/#services', icon: 'layers' },
  { label: 'About', to: '/about', icon: 'user' },
  { label: 'Contact', to: '/#contact', icon: 'mail' },
];

// `icon` is a file in public/icons (Simple Icons, CC0). Tools without one fall
// back to a lettered tile in their brand colour.
export const TOOLS = [
  // Web
  { name: 'React', dot: '#61dafb', icon: 'react' },
  { name: 'Next.js', dot: '#a1a1aa', icon: 'nextdotjs' },
  { name: 'Vite', dot: '#a855f7', icon: 'vite' },
  { name: 'Node.js', dot: '#7cc242', icon: 'nodedotjs' },
  { name: 'Firebase', dot: '#fbbf24', icon: 'firebase' },
  { name: 'Supabase', dot: '#34d399', icon: 'supabase' },
  { name: 'Vercel', dot: '#a1a1aa', icon: 'vercel' },
  // Automation at hardware
  { name: 'n8n', dot: '#f472b6', icon: 'n8n' },
  { name: 'Arduino', dot: '#22d3ee', icon: 'arduino' },
  { name: 'ESP32', dot: '#f97316', icon: 'espressif' },
  // AI coding
  { name: 'Antigravity', dot: '#a78bfa' },
  { name: 'RooCode', dot: '#a855f7' },
  { name: 'Kilo Code', dot: '#fbbf24' },
  { name: 'Claude Code', dot: '#f97316', icon: 'anthropic' },
  { name: 'Copilot', dot: '#a1a1aa', icon: 'githubcopilot' },
  { name: 'CodeBuddy', dot: '#34d399', icon: 'codebuddy' },
  { name: 'OpenCode', dot: '#94a3b8', icon: 'opencode' },
  { name: 'WorkBuddy', dot: '#38bdf8' },
  // Local models at proxy
  { name: 'Ollama', dot: '#a1a1aa', icon: 'ollama' },
  { name: 'LiteLLM', dot: '#7cc242' },
  { name: 'Bedrock', dot: '#fbbf24' },
  // Dev environment
  { name: 'VS Code', dot: '#38bdf8' },
  { name: 'Cursor', dot: '#94a3b8', icon: 'cursor' },
  { name: 'Git', dot: '#f87171', icon: 'git' },
  { name: 'GitHub', dot: '#a1a1aa', icon: 'github' },
  { name: 'Python', dot: '#38bdf8', icon: 'python' },
  { name: 'Java', dot: '#fbbf24', icon: 'openjdk' },
  { name: 'Kotlin', dot: '#a78bfa', icon: 'kotlin' },
  { name: 'Android SDK', dot: '#34d399', icon: 'android' },
  { name: 'AndroidIDE', dot: '#22d3ee' },
  { name: 'Termux', dot: '#7cc242' },
  { name: 'Gradle', dot: '#38bdf8', icon: 'gradle' },
  // Ops
  { name: 'mkcert', dot: '#22d3ee' },
  { name: 'Tailscale', dot: '#94a3b8', icon: 'tailscale' },
  { name: 'Azure', dot: '#38bdf8' },
  { name: 'Obsidian', dot: '#a78bfa', icon: 'obsidian' },
  { name: 'Notion', dot: '#a1a1aa', icon: 'notion' },
];

export const SERVICES = [
  'Web development',
  'Mobile apps',
  'AI automation',
  'Arduino & IoT',
  'IT support',
];

// Each build opens a detail panel. `points` are the real, checkable facts.
export const AI_BUILDS = [
  {
    id: 'notes-ai',
    name: 'Notes AI',
    dot: '#8b5cf6',
    status: 'Live',
    tagline: 'Paste a note, the AI files it for you.',
    stack: ['Vanilla JS', 'Groq', 'Firebase', 'Vercel', 'PWA'],
    points: [
      'Groq (Llama 3.3 70B) reads each note and picks the category itself, so nothing gets tagged by hand.',
      'Firebase Auth and Realtime Database keep every account in sync across phone and desktop.',
      'Installs as a PWA and keeps working offline through a service worker.',
    ],
    note: 'The Groq key never reaches the browser. A serverless function on Vercel proxies every call.',
    repo: 'https://github.com/cronzph/AI-NOTES',
  },
  {
    id: 'cph-maxhub',
    name: 'CPH-MaxHub',
    dot: '#34d399',
    status: 'Running',
    tagline: 'My phone is the AI gateway.',
    stack: ['Android', 'Java', 'NanoHTTPD', 'SQLite', 'Bedrock'],
    points: [
      'Serves the OpenAI API from the phone, so Open WebUI, SillyTavern or a plain script can point at it over LAN or Tailscale.',
      'One proxy instance per port: Bedrock, Groq, Cerebras, OpenRouter, OpenAI or a custom endpoint.',
      'Hard token caps per instance, usage stored day by day in SQLite, keys encrypted on the device.',
    ],
    note: 'Bedrock vision calls get rewritten from OpenAI image_url blocks into the native image format on the way through.',
    repo: 'https://github.com/cronzph/CPHMaxHub',
  },
  {
    id: 'mcp-bridge',
    name: 'MCP storage bridge',
    dot: '#38bdf8',
    status: 'Working',
    tagline: "The AI can read and write my phone's storage.",
    stack: ['Node', 'MCP SDK', 'Cloudflare Workers', 'Termux'],
    points: [
      'Six tools: list, read, write, delete, mkdir and search.',
      'Every path is locked inside one root folder, so a ../ path cannot escape.',
      'A Worker with a fixed URL reads the current tunnel from KV, so the connector never needs editing after a reboot.',
    ],
    note: 'Lesson from the build: Termux has no systemd, so the tunnel restarts by script.',
  },
  {
    id: 'hermes',
    name: 'Hermes home server',
    dot: '#f59e0b',
    status: 'Partial',
    tagline: 'An old netbook turned into a 24/7 node.',
    stack: ['Debian 12', 'Tailscale', 'SSH', 'systemd'],
    points: [
      'Debian 12 i386 on a Lenovo S110. The 64-bit ISO fails on this CPU.',
      'Lid-close sleep is masked, so it stays up with the lid shut.',
      'Reached over Tailscale from the main machine. No ports open to the internet.',
    ],
    note: 'It can run cron, backups and monitoring. It cannot run local models.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Incredibly reliable and fast — they built our system from scratch and made life so much easier for our store.',
    name: 'Maria Santos',
    role: 'Owner, Sari-Sari Store',
    tags: ['Inventory', 'Web app'],
  },
  {
    quote:
      'One of the few devs who understands both software and hardware. The IoT automation just works.',
    name: 'Alex Reyes',
    role: 'Startup CTO',
    tags: ['IoT', 'Automation'],
  },
];

// EDIT: certificates. Each `file` must point to a PDF in public/certificates/.
export const CERTIFICATES = [
  {
    title: 'HTML',
    issuer: 'Mimo',
    date: '28 July 2026',
    summary:
      'Core concepts of websites and the HTML knowledge required to create web pages.',
    file: '/certificates/mimo-html.pdf',
    tint: '#e34f26',
  },
  {
    title: 'CSS',
    issuer: 'Mimo',
    date: '28 July 2026',
    summary: 'Core concepts of CSS and the knowledge required to style web pages.',
    file: '/certificates/mimo-css.pdf',
    tint: '#2965f1',
  },
  {
    title: 'JavaScript',
    issuer: 'Mimo',
    date: '28 July 2026',
    summary: 'Core concepts needed to program in JavaScript, from syntax to logic.',
    file: '/certificates/mimo-javascript.pdf',
    tint: '#d4a017',
  },
  {
    title: 'Python',
    issuer: 'Mimo',
    date: '28 July 2026',
    summary:
      'Data structures, control statements, functions and modules — the core of Python.',
    file: '/certificates/mimo-python.pdf',
    tint: '#3776ab',
  },
];

export const CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Arduino / IoT',
  'Networking',
  'Cyber Security',
  'IT Support',
  'AI Automation',
  'Game Development',
  'Smart Systems',
];

export const CAT_COLORS = {
  'Web Development': '#4f9eff',
  'Mobile Development': '#a78bfa',
  'Arduino / IoT': '#34d399',
  Networking: '#f59e0b',
  'Cyber Security': '#f87171',
  'IT Support': '#60a5fa',
  'AI Automation': '#e879f9',
  'Game Development': '#fb923c',
  'Smart Systems': '#2dd4bf',
};

export const EMAILJS = {
  serviceId: 'service_yvudknq',
  templateId: 'template_jty3phn',
  publicKey: 'E1How4bzSQe9KvDTR',
};
