function attachEvents() {
  const messages = document.getElementById('messages');
  const author = document.querySelector('input[name="author"]');
  const content = document.querySelector('input[name="content"]');

  const submit = document.getElementById('submit');
  const refresh = document.getElementById('refresh');

  submit.addEventListener('click', submitFunc);
  refresh.addEventListener('click', refreshFunc);

  let url = `http://localhost:3030/jsonstore/messenger`;

  async function submitFunc() {
    //debugger;

    try {
      if (author.value == '' || content.value == '') {
        throw new Error('Error');
      }

      const body = {
        author: author.value,
        content: content.value,
      };

      const options = option('POST', body);

      const res = await fetch(url, options);
      if (!res.ok) {
        const error = res.json();
        throw new Error(error.message);
      }

      refreshFunc();
    } catch (error) {}

    author.value = '';
    content.value = '';
    console.log('Submit');
  }

  async function refreshFunc() {
    messages.value = '';
    const data = await getRequest();

    messages.value = Object.values(data)
      .map((element) => `${element.author}: ${element.content}`)
      .join('\n');
    // console.log(Object.values(data));
    // console.log('Refresh');
  }

  function option(method, body) {
    return {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
  }

  async function getRequest() {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const error = res.json();
        throw new Error(error.message);
      }

      const data = await res.json();
      //console.log(data);
      return data;
    } catch (error) {
      alert(error);
    }
  }
}

attachEvents();
