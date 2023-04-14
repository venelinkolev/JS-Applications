import { html } from '../../node_modules/lit-html/lit-html.js';
import { deletePost, getById } from '../data/posts.js';
import { getUserData } from '../util.js';

//TODO Replace with actual view

const detailsTemplate = (post, onDelete) => html`
  <section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
      <div id="details">
        <div class="image-wrapper">
          <img src=${post.imageUrl} alt="Material Image" class="post-image" />
        </div>
        <div class="info">
          <h2 class="title post-title">${post.title}</h2>
          <p class="post-description">Description: ${post.description}</p>
          <p class="post-address">Address: ${post.address}</p>
          <p class="post-number">Phone number: ${post.phone}</p>
          <p class="donate-Item">Donate Materials: 0</p>
          ${post.canEdit
            ? html`
                <!--Edit and Delete are only for creator-->
                <div class="btns">
                  <a href="/catalog/${post._id}/edit" class="edit-btn btn"
                    >Edit</a
                  >
                  <a
                    href="javascript:void(0)"
                    class="delete-btn btn"
                    @click="${onDelete}}"
                    >Delete</a
                  >

                  <!--Bonus - Only for logged-in users ( not authors )-->
                  <!-- <a href="/catalog/${post._id}" class="donate-btn btn">Donate</a> -->
                </div>
              `
            : null}
        </div>
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;

  const userData = getUserData();

  const post = await getById(id);

  if (userData && userData._id == post._ownerId) {
    post.canEdit = true;
  }

  function onDelete() {
    const choice = confirm('Are you sure!');

    if (choice) {
      deletePost(id);

      ctx.page.redirect('/catalog');
    }
  }
  ctx.render(detailsTemplate(post, onDelete));
}
