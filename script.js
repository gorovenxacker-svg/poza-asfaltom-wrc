// JavaScript лише покращує галерею. Без нього всі роботи й посилання доступні.
const filters = document.querySelector('.filters');
const cards = [...document.querySelectorAll('.gallery-grid .sketch-card')];
if (filters) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
    document.querySelector('#count').textContent = cards.filter(card => !card.hidden).length;
  });
}
const dialog = document.querySelector('#art-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-art]').forEach(link => {
    link.addEventListener('click', event => {
      // Ctrl/Cmd + клік зберігає стандартну поведінку посилання.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const card = link.closest('.sketch-card');
      const image = document.querySelector('#art-image');
      image.src = link.getAttribute('href');
      image.alt = link.querySelector('img').alt;
      document.querySelector('#art-title').textContent = card.querySelector('h2').textContent;
      document.querySelector('#art-category').textContent = card.querySelector('.card-meta span').textContent;
      document.querySelector('#art-description').textContent = card.querySelector('p').textContent;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  }});
}
