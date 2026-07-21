const GITHUB_USERNAME = 'LakshyaNandwana';
const REPO_COUNT = 6;

function timeAgo(isoDate) {
  const seconds = Math.floor((Date.now() - new Date(isoDate)) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [name, secondsInUnit] of units) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) return `${value} ${name}${value > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

function renderStats(user) {
  const stats = document.getElementById('githubStats');
  stats.innerHTML = `
    <a class="github-profile" href="${user.html_url}" target="_blank" rel="noopener">
      <img src="${user.avatar_url}" alt="" class="github-avatar" width="48" height="48" />
      <span>@${user.login}</span>
    </a>
    <div class="stat">
      <strong>${user.public_repos}</strong>
      <span class="muted-small">Public repos</span>
    </div>
    <div class="stat">
      <strong>${user.followers}</strong>
      <span class="muted-small">Followers</span>
    </div>
    <div class="stat">
      <strong>${new Date(user.created_at).getFullYear()}</strong>
      <span class="muted-small">On GitHub since</span>
    </div>
  `;
}

function renderRepos(repos) {
  const grid = document.getElementById('githubRepos');
  if (!repos.length) {
    grid.innerHTML = '<p class="muted-small">No public repositories yet.</p>';
    return;
  }
  grid.innerHTML = repos.map((repo) => `
    <article class="repo-card">
      <div class="repo-card-head">
        <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
        ${repo.fork ? '<span class="chip repo-fork-badge">Forked</span>' : ''}
      </div>
      <p>${repo.description ? escapeHtml(repo.description) : 'No description provided.'}</p>
      <div class="repo-card-meta">
        ${repo.language ? `<span class="chip">${escapeHtml(repo.language)}</span>` : ''}
        ${repo.stargazers_count > 0 ? `<span class="muted-small">★ ${repo.stargazers_count}</span>` : ''}
        <span class="muted-small">Updated ${timeAgo(repo.pushed_at)}</span>
      </div>
    </article>
  `).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderError() {
  const section = document.getElementById('githubActivity');
  section.querySelector('.github-body').innerHTML = `
    <p class="muted-small">
      Couldn't load live GitHub data right now — see the full profile at
      <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener">github.com/${GITHUB_USERNAME}</a>.
    </p>
  `;
}

async function loadGithubActivity() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${REPO_COUNT}`),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');

    const user = await userRes.json();
    const repos = await reposRes.json();

    renderStats(user);
    renderRepos(repos);
  } catch (err) {
    renderError();
  }
}

document.addEventListener('DOMContentLoaded', loadGithubActivity);
