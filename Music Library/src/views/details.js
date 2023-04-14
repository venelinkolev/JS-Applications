import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteAlbums, getById } from '../data/albums.js';
import { getUserData } from '../util.js';

//TODO Replace with actual view

const detailsTemplate = (album, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src=${album.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>
          <strong>Band:</strong><span id="details-singer">${album.singer}</span>
        </p>
        <p>
          <strong>Album name:</strong
          ><span id="details-album">${album.album}</span>
        </p>
        <p>
          <strong>Release date:</strong
          ><span id="details-release">${album.release}</span>
        </p>
        <p>
          <strong>Label:</strong><span id="details-label">${album.label}</span>
        </p>
        <p>
          <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
        </p>
      </div>
      <!-- <div id="likes">Likes: <span id="likes-count">0</span></div> -->

      <!--Edit and Delete are only for creator-->
      ${album.canEdit
        ? html`
            <div id="action-buttons">
              <!-- <a href="" id="like-btn">Like</a> -->
              <a href="/catalog/${album._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
                >Delete</a
              >
            </div>
          `
        : null}
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const album = await getById(id);
  const userData = getUserData();

  if (userData && userData._id == album._ownerId) {
    album.canEdit = true;
  }

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteAlbums(id);
      ctx.page.redirect('/catalog');
    }
  }

  //console.log(id, album);
  ctx.render(detailsTemplate(album, onDelete));

  //ctx.page.redirect('/catalog');
}
