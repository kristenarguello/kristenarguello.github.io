// ============================================================
// Config — edit this list to change which repos show up in Projects
// ============================================================
const GITHUB_USERNAME = 'kristenarguello';

const REPOS = [
  { repo: 'gender-identifier-cnn', label: 'Gender Identifier CNN' },
  { repo: 'pdf-uploader-rag', label: 'PDF Uploader RAG' },
  { repo: 'ml-biomedical-data-project', label: 'ML Biomedical Data Project' },
  { repo: 'compiler-C--', label: 'C-- Compiler' },
  { repo: 'anatomicalMaskConditioning', label: 'Anatomical Mask Conditioning' },
  { repo: 'model-interpretability', label: 'Model Interpretability' },
];

// ============================================================
// Theme toggle (light / dark)
// ============================================================
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// GitHub repo cards
// ============================================================
const GITHUB_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.57.69.48A10 10 0 0 0 12 2z"/></svg>`;

function skeletonCard() {
  const card = document.createElement('div');
  card.className = 'project-card skeleton';
  card.innerHTML = `
    <div class="skeleton-line" style="width: 60%; height: 18px;"></div>
    <div class="skeleton-line" style="width: 95%;"></div>
    <div class="skeleton-line" style="width: 80%;"></div>
    <div class="skeleton-line" style="width: 40%; margin-top: 8px;"></div>
  `;
  return card;
}

function renderCard({ label, repo, description, language, url }) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-card-head">
      <span class="project-name">${label}</span>
      <span class="project-icon">${GITHUB_ICON}</span>
    </div>
    <p class="project-desc">${description || 'See the repository for details.'}</p>
    <div class="project-meta">
      ${language ? `<span class="project-lang">${language}</span>` : '<span></span>'}
      <a class="project-link" href="${url}" target="_blank" rel="noopener">View on GitHub &rarr;</a>
    </div>
  `;
  return card;
}

async function loadProjects() {
  const grid = document.getElementById('projectGrid');

  // Show skeletons immediately
  const skeletons = REPOS.map(() => skeletonCard());
  skeletons.forEach((s) => grid.appendChild(s));

  const results = await Promise.all(
    REPOS.map(async ({ repo, label }) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`);
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = await res.json();
        return {
          label,
          repo,
          description: data.description,
          language: data.language,
          url: data.html_url,
        };
      } catch (err) {
        // Fall back to a basic card that still links to GitHub
        return {
          label,
          repo,
          description: null,
          language: null,
          url: `https://github.com/${GITHUB_USERNAME}/${repo}`,
          failed: true,
        };
      }
    })
  );

  grid.innerHTML = '';
  results.forEach((data) => grid.appendChild(renderCard(data)));
}

loadProjects();
