document.addEventListener('DOMContentLoaded', () => {
  // ─── Theme Toggle ───
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('kasi-docs-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('kasi-docs-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeToggleBtn.innerHTML = theme === 'dark'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  }

  // ─── Section Navigation ───
  const menuLinks = document.querySelectorAll('.menu-item-link');
  const articles = document.querySelectorAll('.doc-article');
  const breadcrumb = document.getElementById('current-section-breadcrumb');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  function navigateTo(targetId) {
    const link = document.querySelector(`.menu-item-link[data-target="${targetId}"]`);
    if (!link) return;

    menuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    articles.forEach(art => {
      art.classList.toggle('active', art.id === targetId);
    });

    breadcrumb.textContent = link.querySelector('span').textContent;
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash without triggering scroll
    history.replaceState(null, '', `#${targetId}`);
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.getAttribute('data-target'));
    });
  });

  // Logo home link
  const logoHome = document.getElementById('logo-home');
  if (logoHome) {
    logoHome.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('intro');
    });
  }

  // Handle initial hash
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    navigateTo(hash);
  }

  // ─── Mobile Sidebar ───
  const menuBtn = document.getElementById('menu-btn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  // ─── Code Copy Buttons ───
  document.querySelectorAll('pre').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
    block.appendChild(btn);

    btn.addEventListener('click', () => {
      const code = block.querySelector('code')?.innerText || block.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#0BBF6A"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
        }, 2000);
      });
    });
  });

  // ─── Search ───
  const searchInput = document.getElementById('search-input');
  
  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      searchInput.blur();
      clearSearch();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
      clearSearch();
      return;
    }

    // Search across all articles to find matches
    let foundMatch = false;
    articles.forEach(article => {
      const searchables = article.querySelectorAll('p, li, h2, h3, h4, td, code');
      let hasMatch = false;

      searchables.forEach(el => {
        const text = el.innerText.toLowerCase();
        if (text.includes(query)) {
          hasMatch = true;
          el.style.backgroundColor = 'rgba(15,140,85,0.08)';
          el.style.borderRadius = '4px';
        } else {
          el.style.backgroundColor = '';
          el.style.borderRadius = '';
        }
      });

      if (hasMatch && !foundMatch) {
        // Navigate to first article with matches
        navigateTo(article.id);
        foundMatch = true;
      }
    });
  });

  function clearSearch() {
    document.querySelectorAll('.doc-article p, .doc-article li, .doc-article h2, .doc-article h3, .doc-article h4, .doc-article td, .doc-article code').forEach(el => {
      el.style.backgroundColor = '';
      el.style.borderRadius = '';
    });
  }

  // ─── Smooth anchor scrolling ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
