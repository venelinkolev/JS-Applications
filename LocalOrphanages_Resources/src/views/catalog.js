import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPosts } from '../data/posts.js';

//TODO Replace with actual view

const catalogTemplate = (data, post) => html`<section id="dashboard-page">
  <h1 class="title">All Posts</h1>

  <!-- Display a div with information about every post (if any)-->
  <div class="all-posts">
    ${data.length > 0
      ? html` ${data.map(post)} `
      : html`
          <!-- Display an h1 if there are no posts -->
          <h1 class="title no-posts-title">No posts yet!</h1>
        `}
  </div>
</section>`;

export async function catalogPage(ctx) {
  const data = await getAllPosts();

  const post = (data) => html` <div class="post">
    <h2 class="post-title">${data.title}</h2>
    <img class="post-image" src=${data.imageUrl} alt="Material Image" />
    <div class="btn-wrapper">
      <a href="/catalog/${data._id}" class="details-btn btn">Details</a>
    </div>
  </div>`;

  ctx.render(catalogTemplate(data, post));
}
