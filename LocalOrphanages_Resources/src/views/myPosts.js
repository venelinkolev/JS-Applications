import { html } from '../../node_modules/lit-html/lit-html.js';
import { getByUserId } from '../data/posts.js';
import { getUserData } from '../util.js';

//TODO Replace with actual view

const myPostsTemplate = (data, post) => html`
  <section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <!-- Display a div with information about every post (if any)-->
    <div class="my-posts">
      ${data.length > 0
        ? html` ${data.map(post)} `
        : html`
            <!-- Display an h1 if there are no posts -->
            <h1 class="title no-posts-title">You have no posts yet!</h1>
          `}
    </div>
  </section>
`;

export async function myPostsPage(ctx) {
  const userId = getUserData()._id;

  const data = await getByUserId(userId);

  const post = (data) => html`<div class="post">
    <h2 class="post-title">${data.title}</h2>
    <img class="post-image" src=${data.imageUrl} alt="Material Image" />
    <div class="btn-wrapper">
      <a href="/catalog/${data._id}" class="details-btn btn">Details</a>
    </div>
  </div>`;

  ctx.render(myPostsTemplate(data, post));
}
