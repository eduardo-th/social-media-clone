const form = document.querySelector('#form');
const tagContainer = document.querySelector('#tagContainer');
const tagInput = document.querySelector('#tags');
const textArea=document.querySelector('#body')

function createTag(tagText) {
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
function isValidTag(tag) {
  const minCharLength = 3;
  const maxCharLength = 20;
  return tag.length >= minCharLength && tag.length <= maxCharLength;
}
function countTags() {
  const allTags = document.querySelectorAll('.badge');
  if (allTags.length >= 3 && allTags.length <= 10) {
    tagContainer.classList.remove('is-invalid');
    return true;
  } else {
    tagContainer.classList.add('is-invalid');
    return false;
  }
}
tagInput.addEventListener('keyup', (event) => {
  event.stopPropagation();
  if (event.keyCode === 13) {
    if (isValidTag(event.target.value)) {
      const tag = tagInput.value;
      tagInput.value = '';
      createTag(tag);
      tagContainer.classList.remove('is-invalid');
      event.target.classList.remove('is-invalid');
      form.classList.remove('was-validated');
    } else {
      event.target.classList.add('is-invalid');
    }
  }
});
form.addEventListener('submit', (event) => {
  event.stopPropagation();
  if (!countTags() || !form.checkValidity()) {
    event.preventDefault();
  } else {
    const allTags = document.querySelectorAll('.badge span');
    const arrTags = [];
    allTags.forEach((tag) => {
      arrTags.push(tag.textContent);
    });
    tagInput.value = arrTags.join(',');
  }
  form.classList.add('was-validated');
});
form.addEventListener('keydown', (event) => {
  event.stopPropagation();
  if (event.keyCode === 13 && event.target != textArea) {
    event.preventDefault();
  }
});
