import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyItems } from '../api/data.js';
import { getItemTemp } from './fragments/itemFragment.js';

//let ctx = null;

export async function myFurnitureView(context) {
  // ctx = context;
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const id = userData._id;
  const items = await getMyItems(id);
  context.render(createTemplate(items));
}

function createTemplate(items) {
  return html` <div class="row space-top">
      <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
      </div>
    </div>
    <div class="row space-top">
      ${Object.values(items).map((e) => getItemTemp(e))}
    </div>`;
}
/*
  <div class="row space-top">
          <div class="col-md-12">
              <h1>My Furniture</h1>
              <p>This is a list of your publications.</p>
          </div>
      </div>
      <div class="row space-top">
          <div class="col-md-4">
              <div class="card text-white bg-primary">
                  <div class="card-body">
                          <img src="./images/table.png" />
                          <p>Description here</p>
                          <footer>
                              <p>Price: <span>235 $</span></p>
                          </footer>
                          <div>
                              <a href="#" class="btn btn-info">Details</a>
                          </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
           */
