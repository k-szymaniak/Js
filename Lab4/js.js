const addNote = document.getElementById('addNote');
const header = document.getElementById('header');
const body = document.getElementById('body');
const color = document.getElementById('color');
const notes = document.getElementById('notes');

addNote.addEventListener('click', (e) => {
  e.preventDefault();
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
    <h2>${header.value}</h2>
    <p>${body.value}</p>
    <button type="button" class="edit">Edit</button>
    <button type="button" class="delete">Delete</button>
  `;
  note.style.backgroundColor = color.value;
  notes.appendChild(note);

  const notesArray = JSON.parse(localStorage.getItem('notes')) || [];
  notesArray.push({header: header.value, body: body.value, color: color.value});
  localStorage.setItem('notes', JSON.stringify(notesArray));
});

notes.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('edit')) {
    const header = e.target.previousSibling.previousSibling;
    const body = e.target.previousSibling;
    header.contentEditable = true;
    body.contentEditable = true;
  }
});