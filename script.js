//add form input to the console

const form = document.querySelector('#entryForm');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');

//stops the page reloading
form.addEventListener('submit',(event)=> {
    event.preventDefault();
    console.log('Title', titleInput.value);
    console.log('Entry', descriptionInput.value);
});

//new aray for saved diary entries
const entries = JSON.parse(localStorage.getItem('entries')) || [];

// --- new-entry page ---


if (form) {

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const entry = {
      title: document.querySelector('#title').value,

      description: document.querySelector('#description').value,

      date: new Date().toISOString(),
    };

    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    console.log('Saved', entry);
    form.reset();
  });

}

// --- vault page ---

const entryList = document.querySelector('.entry-list');
if (entryList) {
    entries.forEach((entry) => {
        const div = document.createElement('div');
        div.className = 'entry';

        const h2 = document.createElement('h2');
        h2.textContent = entry.title;

        const p = document.createElement('p');
        p.textContent = entry.description;
        div.append(h2, p);

    entryList.appendChild(div);

  });

}


 