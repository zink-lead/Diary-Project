const saveButton = document.querySelector('#saveBtn');
const input = document.querySelector('#title');

saveButton.addEventListener('click', () => {
    console.log(input.value);
});