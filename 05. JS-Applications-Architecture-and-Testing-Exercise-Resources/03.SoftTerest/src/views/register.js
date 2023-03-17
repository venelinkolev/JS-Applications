import { register } from '../api/user.js';

const section = document.getElementById('registerView');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

let ctx = null;

export function showRegister(context) {
  ctx = context;
  context.showSection(section);
}

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const email = formData.get('email');
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');

  if (password != repeatPassword) {
    alert('Not match');
    throw new Error('Not match');
  } else {
    await register(email, password);

    ctx.updateNavBar();
    ctx.goTo('/');
  }
}
