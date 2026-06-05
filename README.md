# Kasi Developer Documentations

This repository contains the source code for the official Kasi Developer Documentation portal, deployed live at [docs.usekasi.com](https://docs.usekasi.com).

## 📁 File Structure

* `index.html` — The main layout structure containing sidebars, navigation breadcrumbs, metadata, and core guides.
* `style.css` — Custom design system with light/dark theme variables, premium glassmorphism accents, and responsive layout guidelines.
* `app.js` — Client-side logic for live search filters, SPA article routing, collapsible panels, and code copy buttons.

## 🚀 Running Locally
You don't need any build steps! Simply open `index.html` in any web browser, or launch a local static server:
```bash
# Using Node's serve
npx serve .

# Or using Python
python -m http.server 8000
```

## 🌐 Deployment
This portal is connected to Vercel via GitHub integrations. Every push to the `main` branch automatically builds and deploys to `docs.usekasi.com`.
