import { getAllIdea } from '../api/data.js';

const section = document.getElementById('dashboard-holder');

section.addEventListener('click', onDetailSection);

let ctx = null;

export async function showCatalog(context) {
  ctx = context;

  context.showSection(section);

  const ideas = await getAllIdea();

  if (ideas.length == 0) {
    section.innerHTML = ` <h1>No ideas yet! Be the first one :)</h1>`;
  } else {
    section.replaceChildren(...ideas.map(createIdea));
  }
}

function createIdea(idea) {
  const div = document.createElement('div');
  div.classList = 'card overflow-hidden current-card details';
  div.style.height = '18rem';
  div.style.width = '20rem';

  div.innerHTML = `
  <div class="card-body">
    <p class="card-text">${idea.title}</p>
  </div>
    <img
      class="card-image"
      src=${idea.img}
      alt="Card image cap"
      />
  <a data-id=${idea._id} class="btn" href="/details">Details</a>
  `;

  return div;
}

function onDetailSection(event) {
  if (event.target.tagName == 'A') {
    event.preventDefault();
    const id = event.target.dataset.id;
    ctx.goTo('/details', id);
  }
}

/*
 <div
          class="card overflow-hidden current-card details"
          style="width: 20rem; height: 18rem"
        >
          <div class="card-body">
            <p class="card-text">Dinner Recipe</p>
          </div>
          <img
            class="card-image"
            src="./images/dinner.jpg"
            alt="Card image cap"
          />
          <a class="btn" href="">Details</a>
        </div>
*/
