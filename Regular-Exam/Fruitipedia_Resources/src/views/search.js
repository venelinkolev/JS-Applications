import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchFruit } from '../data/fruits.js';

const searchTemplate = (searchHendler, data, fruit) => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form @submit="${searchHendler}class" ="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
      </form>
      <h4>Results:</h4>
      <div class="search-result">
        <!--If there are matches display a div with information about every fruit-->

        ${data.length > 0
          ? html` ${data.map(fruit)} `
          : html` <p class="no-result">No result.</p> `}
      </div>
    </div>
  </section>
`;

export async function searchPage(ctx) {
  let result = '';

  async function searchHendler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const { search } = Object.fromEntries(formData);

    console.log(search);

    if (search == '') {
      return alert('No empty fields!');
    }

    const query = encodeURIComponent(`name LIKE "${search}"`);
    const data = await searchFruit(query);

    const fruit = (data) => html` <div class="fruit">
      <img src=${data.imageUrl} alt="example1" />
      <h3 class="title">${data.name}</h3>
      <p class="description">${data.description}</p>
      <a class="details-btn" href="/catalog/${data._id}">More Info</a>
    </div>`;
    ctx.render(searchTemplate(searchHendler, data, fruit));
  }

  ctx.render(searchTemplate(searchHendler, []));
}
