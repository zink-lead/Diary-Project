// shared helpers

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

 

// new-entry page


const form = document.querySelector('#entryForm');

const feedback = document.querySelector('#feedback');

let hideTimer;

function showFeedback(message, isError = false) {
  
  feedback.textContent = message;
  
  feedback.classList.toggle('error', isError);
  
  feedback.classList.add('show');
  
  clearTimeout(hideTimer);
  
  hideTimer = setTimeout(() => feedback.classList.remove('show'), 2500);
    }

 
    if (form) {
    
    form.addEventListener('submit', (event) => {
    
      event.preventDefault();


//added to stop empy entries, trim also stops an empty entry of just spaces to be entered, access my showFeedback function above with a new message 

const title = document.querySelector('#title').value.trim();

const description = document.querySelector('#description').value.trim();

    if (!title || !description) {
      
      showFeedback('Please fill in both fields', true);
      
      return;
    }

    try {
      
      const entries = getEntries();

      entries.push({
        
        title: document.querySelector('#title').value,
        
        description: document.querySelector('#description').value,
        
        date: new Date().toISOString(),
      });

      localStorage.setItem('entries', JSON.stringify(entries));
      
      form.reset();
      
      showFeedback('Entry saved ✓');
    
    } catch (err) {
      
      showFeedback('Could not save entry', true);
    }
  });
}
 

// vault page

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

 

// index page 

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