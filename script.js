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

const entries = JSON.parse(localStorage.getItem('entries')) || [];

//const form = document.getElementById('entryForm');

const entry = {
    title: document.getElementById('Title'),
    description: document.getElementById('description'),
};

entries.push(entry);

localStorage.setItem('entries', JSON.stringify(entries));