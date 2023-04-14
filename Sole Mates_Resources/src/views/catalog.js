import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllShoes } from '../data/shoes.js';

//TODO Replace with actual view

const catalogTemplate = (shoes, card) => html`<section id="dashboard">
  <h2>Collectibles</h2>
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${shoes.length > 0
      ? html` ${shoes.map(card)} `
      : html`
          <!-- Display an h2 if there are no posts -->
          <h2>There are no items added yet.</h2>
        `}
  </ul>
</section>`;

export async function catalogPage(ctx) {
  const getShoes = await getAllShoes();

  const shoeCard = (shoe) => html`<li class="card">
    <img src=${shoe.imageUrl} alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/catalog/${shoe._id}">Details</a>
  </li>`;

  ctx.render(catalogTemplate(getShoes, shoeCard));
}
