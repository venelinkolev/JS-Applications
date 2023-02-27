function loadRepos() {
  const loadBtn = document.querySelector('button');
  const result = document.getElementById('res');

  loadBtn.addEventListener('click', requestFunc);

  //debugger;
  let url = 'https://api.github.com/users/testnakov/repos';

  const httpRequest = new XMLHttpRequest();

  function requestFunc() {
    httpRequest.addEventListener('readystatechange', () => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        result.textContent = httpRequest.responseText;
      }
    });

    httpRequest.open('GET', url);
    httpRequest.send();

    console.log('TODO...');
  }
}
