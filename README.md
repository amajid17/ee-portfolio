# EE Portfolio — React + Vite + Tailwind CSS 4

A portfolio template built for electrical engineering students. Covers analog circuits, embedded systems, DSP lab work, personal software projects, and a senior design capstone section. All content lives in a single `data.ts` file — no component editing required to make it yours.

Production build inlines everything into one `dist/index.html` via `vite-plugin-singlefile`. Static hosting friendly — no server, no build pipeline on the host.

---

## Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Build | Vite 7 + vite-plugin-singlefile |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript (strict) |

---

## Local development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the built output locally
```

---

## Project structure

```
public/
  images/          static assets (portrait, screenshots, preview video)
  resume.pdf        drop your résumé here — linked automatically

src/
  data.ts           single source of truth for all portfolio content
  components/
    chrome.tsx        navbar, footer, section headings, scroll reveal
    hero.tsx          hero section + live scope canvas
    about-skills.tsx  about card + skill fluency bars
    projects.tsx      EE lab cards + comb filter explorer + personal apps
    capstone-contact.tsx  senior design section + contact form
  App.tsx           page composition

index.html          meta tags, fonts, favicon
.github/workflows/deploy.yml   GitHub Pages auto-deploy
```

---

## Customizing

Edit `src/data.ts` — it holds every piece of content the site renders. The components read from it; you should not need to touch them for standard customization.

**Required before going live:**

```ts
// src/data.ts
name:     "Your Name"
email:    "you@university.edu"
linkedin: "https://linkedin.com/in/yourhandle"  // set "" to hide the button
github:   "https://github.com/yourusername"
```

**Résumé:** drop `resume.pdf` into `public/`. The download button links to `/resume.pdf` and will work automatically once the file is there.

**Images:** replace the files in `public/images/` with your own. Keep the same filenames or update the references in `data.ts`.

**Labs:** each entry in the `LABS` array takes a `summary`, `tags`, `specs`, and a `category` (`"Analog" | "Power" | "Digital" | "DSP"`). The filter tabs on the projects page are generated from these automatically.

**Personal projects:** the `PERSONAL` array supports an optional `preview` field for mobile app screenshots and a demo video. See the `PersonalProject` type in `data.ts` for the full shape.

---

## Deploying to GitHub Pages

Deployment is automated via GitHub Actions. One-time setup:

**1. Create a repo**

Go to [github.com/new](https://github.com/new). Public repo required for free GitHub Pages. Do not initialize with a README.

**2. Push**

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

**3. Enable Pages**

Repo → Settings → Pages → Build and deployment → Source → **GitHub Actions** → Save.

**4. Verify**

Actions tab → "Deploy to GitHub Pages" → wait for green. Site goes live at:

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

After the initial setup, every push to `main` triggers a rebuild and redeploy automatically.

> If you name the repo `YOUR_USERNAME.github.io`, the site will be at `https://YOUR_USERNAME.github.io/` with no subdirectory path. Update `base` in `vite.config.ts` accordingly:
> ```ts
> base: "/"  // instead of "/REPO_NAME/"
> ```

---

## Notes

- The `vite-plugin-singlefile` build inlines all JS and CSS into `index.html`. The only external files are anything you place in `public/` (images, PDF). This means the entire site ships as a single transferable file.
- Tailwind CSS 4 is used via the Vite plugin — no `tailwind.config.js` required. Custom tokens are defined in `index.css` under `@theme`.
- TypeScript strict mode is enabled. The `LABS` and `PERSONAL` arrays are fully typed — adding a malformed entry will surface as a compile error before it reaches the browser.
