const host = 'http://localhost:3030/';

async function requester(method, url, data) {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const option = {
    method,
    headers: {},
  };

  if (data) {
    option.headers['Content-Type'] = 'application/json';
    option.body = JSON.stringify(data);
  }

  if (user) {
    const token = user.accessToken;
    option.headers['X-Authorization'] = token;
  }

  try {
    const res = await fetch(host + url, option);

    if (!res.ok) {
      if (res.status == 403) {
        sessionStorage.removeItem('user');
      }
      const err = await res.json();
      throw new Error(err.message);
    }

    if (res.status == 204) {
      return res;
    } else {
      return res.json();
    }

    //const data = await res.json();
  } catch (error) {
    alert(error);
    throw error;
  }

  return data;
}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');
const put = requester.bind(null, 'PUT');
const del = requester.bind(null, 'DELETE');

export { get, post, put, del };
