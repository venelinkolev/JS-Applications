function loadRepos() {
  const loadBtn = document.querySelector('button');

  const userName = document.getElementById('username').value;
  const repos = document.getElementById('repos');

  let url = `https://api.github.com/users/${userName}/repos`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.log(res);
        console.log(res.status, res.statusText);
        return Promise.reject(`${res.status}: ${res.statusText}`);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      repos.replaceChildren();
      for (let line of data) {
        let li = document.createElement('li');
        li.innerHTML = `<a href="${line.html_url}"> ${line.full_name} </a>`;
        repos.appendChild(li);
      }
    })
    .catch((err) => {
      repos.innerHTML = `<p>${err}</p>`;
    });
}
