# Kasi Developer Documentation

Official developer documentation portal for Kasi's AI-powered conversational commerce platform.

**Live at:** [docs.usekasi.com](https://docs.usekasi.com)

## 📁 Structure

| File | Description |
|------|-------------|
| `index.html` | Main layout with sidebar navigation, breadcrumbs, and all documentation articles |
| `style.css` | Design system with light/dark themes, Kasi brand colors, responsive layout |
| `app.js` | Client-side search, SPA routing, theme toggle, code copy buttons |
| `favicon.svg` | Kasi "K" icon used as browser favicon |
| `kasi-logo.svg` | Kasi wordmark logo used in the header |

### Standalone HTML Guides
These are older standalone exports. The main `index.html` contains their content in a unified format:
- `KASI SOCIAL MEDIA INTEGRATION.html`
- `VPS DEPLOYMENT GUIDE.html`

## 🚀 Running Locally

No build tools needed. Open `index.html` directly or use a local server:

```bash
# Using Node
npx serve .

# Using Python
python -m http.server 8000
```

## 📝 Adding New Documentation Pages

1. **Add article HTML** inside `<main class="main-content">` in `index.html`:
```html
<article id="your-article-id" class="doc-article">
  <div class="article-header">
    <div class="article-badges">
      <span class="article-badge badge-reading">X min read</span>
      <span class="article-badge badge-level-beginner">Beginner</span>
    </div>
    <h1>Article Title</h1>
    <p class="article-description">Brief description.</p>
  </div>
  <h2>Section</h2>
  <p>Content...</p>
</article>
```

2. **Add sidebar link** inside `<aside>`:
```html
<li>
  <a class="menu-item-link" data-target="your-article-id">
    <svg><!-- icon --></svg>
    <span>Page Title</span>
  </a>
</li>
```

3. Push to `main` — Vercel deploys automatically.

## 🔐 Security

All API keys, tokens, and credentials are redacted with asterisks (`****`). Never commit real secrets to this repository.

## 🌐 Deployment

Connected to **Vercel** via GitHub. Every push to `main` auto-deploys to `docs.usekasi.com`.
