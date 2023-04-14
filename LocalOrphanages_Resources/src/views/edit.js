import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, updatePost } from '../data/posts.js';
import { createSubmitHandler } from '../util.js';

//TODO Replace with actual view

const editTemplate = (currentPost, onSubmit) => html`
  <section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
      <h1 class="title">Edit Post</h1>

      <article class="input-group">
        <label for="title">Post Title</label>
        <input
          type="title"
          name="title"
          .value=${currentPost.title}
          id="title"
          value=""
        />
      </article>

      <article class="input-group">
        <label for="description">Description of the needs </label>
        <input
          type="text"
          name="description"
          .value=${currentPost.description}
          id="description"
          value=""
        />
      </article>

      <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input
          type="text"
          name="imageUrl"
          .value=${currentPost.imageUrl}
          id="imageUrl"
          value=""
        />
      </article>

      <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input
          type="text"
          name="address"
          .value=${currentPost.address}
          id="address"
          value=""
        />
      </article>

      <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input
          type="text"
          name="phone"
          .value=${currentPost.phone}
          id="phone"
          value=""
        />
      </article>

      <input type="submit" class="btn submit" value="Edit Post" />
    </form>
  </section>
`;

export async function editPage(ctx) {
  const id = ctx.params.id;

  const currentPost = await getById(id);

  async function onSubmit({ title, description, imageUrl, address, phone }) {
    if ([title, description, imageUrl, address, phone].some((f) => f == '')) {
      return alert('No empty fields!');
    }

    await updatePost(id, { title, description, imageUrl, address, phone });

    ctx.page.redirect(`/catalog/${id}`);
  }

  ctx.render(editTemplate(currentPost, createSubmitHandler(onSubmit)));
}
