import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteShoe, getById } from '../data/shoes.js';
import { getUserData } from '../util.js';

//TODO Replace with actual view

const detailsTemplate = (shoe, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
      <img src=${shoe.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
      <p>Model: <span id="details-model">${shoe.model}</span></p>
      <p>Release date: <span id="details-release">${shoe.release}</span></p>
      <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
      <p>Value: <span id="details-value">${shoe.value}</span></p>
    </div>
    ${shoe.canEdit
      ? html`
          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            <a href="/catalog/${shoe._id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >
          </div>
        `
      : null}
  </div>
</section>`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const userData = getUserData();

  const currentShoe = await getById(id);

  if (userData && userData._id == currentShoe._ownerId) {
    currentShoe.canEdit = true;
  }

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      deleteShoe(id);

      ctx.page.redirect('/catalog');
    }
  }

  ctx.render(detailsTemplate(currentShoe, onDelete));
}
