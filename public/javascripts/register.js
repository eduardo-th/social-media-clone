const form = document.querySelector('#form');
const test = document.querySelector('#test');

form.addEventListener('submit', (event) => {
  event.stopPropagation();
  const password = document.querySelectorAll('[type=password]')[0];
  const confirmPassword = document.querySelectorAll('[type=password]')[1];

  if (!form.checkValidity() || password.value !== confirmPassword.value) {
    event.preventDefault();
  }
  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add('is-invalid');
  } else {
    confirmPassword.classList.remove('is-invalid');
  }
  form.classList.add('was-validated');
});
