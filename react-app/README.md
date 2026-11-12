# Portfolio 3 — React + Firebase

Personal portfolio of Mark Icel Sarmiento. React 19 + Vite, live data from Firebase Realtime Database,
contact form through EmailJS, admin panel with email/password login.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Structure

```
src/
├─ main.jsx                 entry, styles import order
├─ App.jsx                  routes, page transitions, shell
├─ data/site.js             ← profile, services, tools, certificates, testimonials, contact
├─ lib/firebase.js          ← Firebase config (public client keys)
├─ hooks/                   usePosts, useTheme, useDocumentTitle
├─ components/
│  ├─ AppShell.jsx          sidebar + main area
│  ├─ bento/                the six home cards
│  ├─ post/                 post card, modal, markdown renderer, video embed
│  └─ admin/                login, dashboard, post form, image uploader
├─ pages/                   Home, Projects, Blog, Admin, NotFound
├─ styles/                  tokens → base → shell → content → admin
└─ utils/                   embedParser, stripHtml, image compression
```

## Content

Everything static lives in `src/data/site.js` — name, handle, services, tools, tech stack,
certificates, testimonials, social links and contact email. Projects, blog posts and highlights
come from Firebase, so they are edited from `/admin` (or the Firebase console).

Certificates: each entry in `CERTIFICATES` points to a PDF in `public/certificates/`. To add one,
drop the PDF there and append `{ title, issuer, date, summary, file, tint }` to the array.

## Admin setup (one time)

1. **Firebase console → Authentication → Sign-in method**: Email/Password must be enabled.
2. **Authentication → Users → Add user**: create your own admin account (email + password).
3. Copy that user's **UID** and add it under Realtime Database → Data:
   ```
   admins/
     <your-uid>: true
   ```
4. **Realtime Database → Rules**: paste the contents of `database.rules.json` and publish.
   Until you do, the database keeps its current (likely open) rules — the login screen would
   then be cosmetic only, because anyone could still write directly.

Then open `/admin`, sign in, and you can create, edit and delete projects and blog posts,
upload banner/gallery images (compressed in the browser to WebP data URLs, matching the
existing `{ data: "..." }` shape), and pick the featured post per category.

## Deploy

Vercel: import the repo, root directory `PORTFOLIO3/react-app`, build `npm run build`,
output `dist`. `vercel.json` already contains the SPA rewrite.
