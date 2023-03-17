function attachEvents() {
  let url = `http://localhost:3030/jsonstore/phonebook`;
  function option(method, body) {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }
  async function getRequest() {
    const res = await fetch(url);

    const data = await res.json();

    return data;
  }

  async function postRequest(body) {
    const options = option('POST', body);
    const res = await fetch(url, options);

    const data = await res.json();

    return data;
  }

  async function deleteRequest(id) {
    let urlDelete = `http://localhost:3030/jsonstore/phonebook/${id}`;
    const options = option('DELETE', null);

    const res = await fetch(urlDelete, options);

    const data = await res.json();

    return data;
  }
  console.log('TODO...');
}

attachEvents();
