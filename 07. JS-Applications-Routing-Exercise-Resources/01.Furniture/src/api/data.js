import * as api from './api.js';

const endpoint = {
  login: 'users/login',
  register: 'users/register',
  logout: 'users/logout',
  createItem: 'data/catalog',
  getAllItem: 'data/catalog',
  getItemById: 'data/catalog/',
  myItem: 'data/catalog?where=_ownerId%3D%22',
};

export async function login(email, password) {
  const result = await api.post(endpoint.login, { email, password });

  sessionStorage.setItem('userData', JSON.stringify(result));

  return result;
}

export async function register(email, password) {
  //debugger;
  const result = await api.post(endpoint.register, { email, password });

  sessionStorage.setItem('userData', JSON.stringify(result));

  return result;
}

export async function logout() {
  const result = await api.get(endpoint.logout);

  sessionStorage.removeItem('userData');

  return result;
}

export async function createItem(data) {
  const result = await api.post(endpoint.createItem, data);

  return result;
}

export async function getAllItem() {
  const result = await api.get(endpoint.getAllItem);

  return result;
}

export async function getItemById(id) {
  //debugger;
  const result = await api.get(endpoint.getItemById + id);

  return result;
}

export async function updateById(id, data) {
  const result = await api.put(endpoint.getItemById + id, data);

  return result;
}

export async function deleteItem(id) {
  const result = await api.del(endpoint.getItemById + id);

  return result;
}

export async function getMyItems() {
  const user = JSON.parse(sessionStorage.getItem('userData'));
  const userId = user && user._id;

  let id = `${userId}%22`;

  const result = await api.get(endpoint.myItem + id);

  return result;
}
