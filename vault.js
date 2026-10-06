document.addEventListener('DOMContentLoaded', () => {
    const vault = document.querySelector('.entry-list');
    if (!vault) return;

    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    if (entries.length === 0) {
        vault.textContent = 'No diary entries yet.';
        return;
    }

    // Newest first 
    [...entries].reverse().forEach(entry => {
        const card = document.createElement('div');
        card.classList.add('entry');

        const title = document.createElement('h3');
        title.textContent = entry.title || 'Untitled';

        const date = document.createElement('p');
        date.textContent = entry.date || '';

        const text = document.createElement('p');
        text.textContent = entry.text || entry.description || '';

        card.append(title, date, text);
        vault.appendChild(card);
    });
});