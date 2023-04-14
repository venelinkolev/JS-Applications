const host = 'http://localhost:3030/';

async function request(url, options) {
  try {
    const res = await fetch(host + url, options);
    if (!res.ok) {
      //debugger;
      const err = await res.json();
      throw new Error(err.message);
    }

    try {
      if (res.status == 204) {
        return res;
      }
      const data = await res.json();
      return data;
    } catch (error) {
      alert(error.message);
      return error;
    }

    //return data;
  } catch (error) {
    alert(error.message);
    throw error.message;
  }
}

function getOption(method, body) {
  const options = {
    method,
    headers: {},
  };

  const user = JSON.parse(sessionStorage.getItem('userData'));

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  if (user) {
    const token = user.accessToken;
    options.headers['X-Authorization'] = token;
  }

  return options;
}

export async function get(url) {
  return await request(url, getOption('GET'));
}

export async function post(url, data) {
  return await request(url, getOption('POST', data));
}

export async function put(url, data) {
  return await request(url, getOption('PUT', data));
}

export async function del(url) {
  return await request(url, getOption('DELETE'));
}
