const form = document.querySelector('#form');
const tagInput = document.querySelector('#tags');

tagInput.addEventListener('keyup', (event) => {
  event.stopPropagation();
  if (event.keyCode === 13) {
    const tag = tagInput.value;
    tagInput.value = '';
    createTag(tag);
  }
});
function createTag(tagText) {
  const tagContainer = document.querySelector('#tagContainer');

  const tagElem = document.createElement('div');
  const span = document.createElement('span');
  const close = document.createElement('button');

  tagElem.classList.add('col-auto', 'badge', 'text-bg-dark', 'p-0', 'ps-1', 'me-1');
  span.textContent = tagText;
  close.classList.add('btn-close', 'btn-close-white', 'align-middle');
  close.addEventListener('click', (event) => {
    event.target.parentNode.remove();
  });
  tagElem.append(span, close);
  tagContainer.append(tagElem);
}
form.addEventListener('submit', (event) => {
  event.stopPropagation();
  const allTags = document.querySelectorAll('.badge');
  const arrTags = [];
  allTags.forEach((tag) => {
    arrTags.push(tag.textContent);
  });
  tagInput.value = arrTags.join(',');
});
form.addEventListener('keydown', (event) => {
  event.stopPropagation();
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});
