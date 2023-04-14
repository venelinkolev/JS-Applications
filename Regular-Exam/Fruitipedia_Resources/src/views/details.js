import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteFruit, getByFruitId } from '../data/fruits.js';
import { getUserData } from '../util.js';

const detailsTemplate = (currentFruit, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${currentFruit.imageUrl} alt="example1" />
      <p id="details-title">${currentFruit.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${currentFruit.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">${currentFruit.nutrition}</p>
        </div>
        ${currentFruit.canEdit
          ? html`
              <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
                <a href="/catalog/${currentFruit._id}/edit" id="edit-btn"
                  >Edit</a
                >
                <a href="javascript:void(0)" @click=${onDelete} id="delete-btn"
                  >Delete</a
                >
              </div>
            `
          : null}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const userData = getUserData();

  const id = ctx.params.id;

  const currentFruit = await getByFruitId(id);
  if (userData && userData._id == currentFruit._ownerId) {
    currentFruit.canEdit = true;
  }

  async function onDelete() {
    const conf = confirm('Are you sure!');

    if (conf) {
      await deleteFruit(id);

      ctx.page.redirect('/catalog');
    }
  }
  ctx.render(detailsTemplate(currentFruit, onDelete));
}
