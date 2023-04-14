import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItem } from '../api/data.js';
import { getItemTemp } from './fragments/itemFragment.js';

export async function catalogView(context) {
  const items = await getAllItem();
  context.render(createTemplate(items));
}

function createTemplate(data) {
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
      </div>
    </div>
    <div class="row space-top">
      ${Object.values(data).map((e) => getItemTemp(e))}
    </div>`;
}
