import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

//TODO Replace with actual view

const registerTemplate = (onregister) => html`
  <h1>Register</h1>
  <form @submit=${onregister}>
    <label>Email: <input type="text" name="email" /></label>;
    <label>Password: <input type="text" name="password" /></label>
    <label>Repeat: <input type="text" name="repass" /></label>
    <button>Register</button>
  </form>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)));

  //TODO change user object based on requirements
  async function onRegister({ email, password, repass }, form) {
    if (email == '' || password == '') {
      return alert('All fields are requires');
    }

    if (password != repass) {
      return alert('Passwords do not match');
    }

    await register(email, password);

    form.reset();
    //TODO use redirect location from requirements
    ctx.page.redirect('/');
  }
}
