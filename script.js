// ---------- shared helpers ----------

const getEntries = () => JSON.parse(localStorage.getItem('entries')) || [];

 

function formatDate(iso) {

  return iso ? new Date(iso).toLocaleString() : '';

}

 

// builds the title / date / text elements used by both vault and index

function buildEntryContent(entry) {

  const title = document.createElement('h3');

  title.textContent = entry.title || 'Untitled';

 

  const date = document.createElement('p');

  date.textContent = formatDate(entry.date);

 

  const text = document.createElement('p');

  text.textContent = entry.description || '';

 

  return [title, date, text];

}

 

// ---------- new-entry page ----------

const form = document.querySelector('#entryForm');

if (form) {

  form.addEventListener('submit', (event) => {

    event.preventDefault();

 

    const entries = getEntries();

    entries.push({

      title: document.querySelector('#title').value,

      description: document.querySelector('#description').value,

      date: new Date().toISOString(),

    });

 

    localStorage.setItem('entries', JSON.stringify(entries));

    form.reset();

  });

}

 

// ---------- vault page ----------

const vault = document.querySelector('.entry-list');

if (vault) {

  const entries = getEntries();

 

  if (entries.length === 0) {

    vault.textContent = 'No diary entries yet.';

  } else {

    [...entries].reverse().forEach((entry) => {   // newest first

      const card = document.createElement('div');

      card.classList.add('entry');

      card.append(...buildEntryContent(entry));

      vault.appendChild(card);

    });

  }

}

 

// ---------- index page ----------

const cards = document.querySelectorAll('.card');

if (cards.length > 0) {

  const recent = [...getEntries()].reverse().slice(0, 5);

 

  cards.forEach((card, i) => {

    const entry = recent[i];

    card.innerHTML = '';

 

    if (!entry) {

      if (i === 0) card.textContent = 'So much space';

      return;

    }

    card.append(...buildEntryContent(entry));

  });

}