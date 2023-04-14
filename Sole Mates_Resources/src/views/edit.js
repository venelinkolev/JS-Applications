import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateShoe } from '../data/shoes.js';

//TODO Replace with actual view

const editTemplate = (onSubmit, shoe) => html`<section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input
        type="text"
        name="brand"
        .value=${shoe.brand}
        id="shoe-brand"
        placeholder="Brand"
      />
      <input
        type="text"
        name="model"
        .value=${shoe.model}
        id="shoe-model"
        placeholder="Model"
      />
      <input
        type="text"
        name="imageUrl"
        .value=${shoe.imageUrl}
        id="shoe-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        .value=${shoe.release}
        id="shoe-release"
        placeholder="Release date"
      />
      <input
        type="text"
        name="designer"
        .value=${shoe.designer}
        id="shoe-designer"
        placeholder="Designer"
      />
      <input
        type="text"
        name="value"
        .value=${shoe.value}
        id="shoe-value"
        placeholder="Value"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editPage(ctx) {
  const id = ctx.params.id;

  const currentShoe = await getById(id);

  ctx.render(editTemplate(onSubmit, currentShoe));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const { brand, model, imageUrl, release, designer, value } =
      Object.fromEntries(formData);

    if (
      [brand, model, imageUrl, release, designer, value].some((f) => f == '')
    ) {
      return alert('No empty fields');
    }

    await updateShoe(id, {
      brand,
      model,
      imageUrl,
      release,
      designer,
      value,
    });

    ctx.page.redirect('/catalog/' + id);
  }
}
