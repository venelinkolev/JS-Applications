import { html } from '../../node_modules/lit-html/lit-html.js';
import { getByFruitId, updateFruit } from '../data/fruits.js';
import { submitHandler } from '../util.js';

const editTemplate = (currentFruit, onEdit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Fruit</h2>
      <form @submit=${onEdit} class="edit-form">
        <input
          type="text"
          name="name"
          .value=${currentFruit.name}
          id="name"
          placeholder="Fruit Name"
        />
        <input
          type="text"
          name="imageUrl"
          .value=${currentFruit.imageUrl}
          id="Fruit-image"
          placeholder="Fruit Image URL"
        />
        <textarea
          id="fruit-description"
          name="description"
          .value=${currentFruit.description}
          placeholder="Description"
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          .value=${currentFruit.nutrition}
          placeholder="Nutrition"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const id = ctx.params.id;

  const currentFruit = await getByFruitId(id);

  async function onEdit({ name, imageUrl, description, nutrition }) {
    if ([name, imageUrl, description, nutrition].some((el) => el == '')) {
      return alert('No empty fields!');
    }

    await updateFruit(id, { name, imageUrl, description, nutrition });

    ctx.page.redirect(`/catalog/${id}`);
  }

  ctx.render(editTemplate(currentFruit, submitHandler(onEdit)));
}
