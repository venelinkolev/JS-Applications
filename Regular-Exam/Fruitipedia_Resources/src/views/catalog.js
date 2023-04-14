import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllFruits } from '../data/fruits.js';

const catalogTemplate = (data, fruit) => html`
  <h2>Fruits</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${data.length > 0
      ? html` ${data.map(fruit)} `
      : html`
          <!-- Display an h2 if there are no posts -->
          <h2>No fruit info yet.</h2>
        `}
  </section>
`;

export async function catalogPage(ctx) {
  const data = await getAllFruits();

  const fruit = (data) => html` <div class="fruit">
    <img src=${data.imageUrl} alt="example1" />
    <h3 class="title">${data.name}</h3>
    <p class="description">${data.description}</p>
    <a class="details-btn" href="/catalog/${data._id}">More Info</a>
  </div>`;

  ctx.render(catalogTemplate(data, fruit));
}
