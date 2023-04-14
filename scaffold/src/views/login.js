import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

//TODO Replace with actual view

const loginTemplate = (onLogin) => html`
  <h1>Login</h1>
  <form @submit=${onLogin}>
    <label>Email: <input type="text" name="email" /></label>;
    <label>Password: <input type="text" name="password" /></label>
    <button>Login</button>
  </form>
`;

export function loginPage(ctx) {
  ctx.render(loginTemplate(createSubmitHandler(onLogin)));

  //TODO change user object based on requirements
  async function onLogin({ email, password }, form) {
    if (email == '' || password == '') {
      return alert('All fields are requires');
    }

    await login(email, password);

    form.reset();
    //TODO use redirect location from requirements
    ctx.page.redirect('/');
  }
}