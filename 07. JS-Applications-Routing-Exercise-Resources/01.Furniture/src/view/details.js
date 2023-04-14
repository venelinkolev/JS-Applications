import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getItemById } from '../api/data.js';

let ctx = null;

export async function detailsView(context) {
  ctx = context;
  const id = context.params.id;
  const item = await getItemById(id);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  let isOwner = userData._id == item._ownerId;
  context.render(createTemplate(item, isOwner, delateItemById));
}

async function delateItemById(event) {
  //debugger;
  event.preventDefault();
  const id = event.target.dataset.id;
  //debugger;
  await deleteItem(id);

  ctx.page.redirect('/');
}

function renderOwnerBtn(isOwner, delateItemById, id) {
  return isOwner
    ? html` <div>
        <a href="/edit/${id}" class="btn btn-info">Edit</a>
        <a
          @click=${delateItemById}
          data-id=${id}
          href="javascript:void(0)"
          class="btn btn-red"
          >Delete</a
        >
      </div>`
    : '';
}

function createTemplate(item, isOwner, delateItemById) {
  const itemImgNameArr = item.img.split('/');
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img
              src=${'/images/' + itemImgNameArr[itemImgNameArr.length - 1]}
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${renderOwnerBtn(isOwner, delateItemById, item._id)}
      </div>
    </div>`;
}
