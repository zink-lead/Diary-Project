//retrieve locally saved diary entries for the main page, put in own js file to access from index page

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the data (empty array if nothing is saved yet)
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
 
    // flip ther array to access newest entries
    const recentEntries = [...entries].reverse().slice(0, 5);
 
    // Acces existing cards
    const cards = document.querySelectorAll('.card');
 
    cards.forEach((card, i) => {
        const entry = recentEntries[i];
 
    // Clear whatever is in the card
        card.innerHTML = '';
 
    // Placeholder if card is empty
    if (!entry) {
        if (i === 0) card.textContent = 'So much space';
        return;
    }
 
    const date = document.createElement('p');
    date.textContent = entry.date || '';
    
    const title = document.createElement('h3');
    title.textContent = entry.title || 'Untitled';
 
    const text = document.createElement('p');
    text.textContent = entry.text || entry.description || '';
 
    card.append(title, date, text);
  });
});
 