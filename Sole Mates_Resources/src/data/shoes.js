import { del, get, post, put } from './api.js';

const endPoints = {
  create: '/data/shoes',
  catalog: '/data/shoes?sortBy=_createdOn%20desc',
  byId: '/data/shoes/',
};

export async function getAllShoes() {
  return get(endPoints.catalog);
}

export async function getById(id) {
  return get(endPoints.byId + id);
}

export async function createShoe(data) {
  return post(endPoints.create, data);
}

export async function updateShoe(id, data) {
  return put(endPoints.byId + id, data);
}

export async function deleteShoe(id) {
  return del(endPoints.byId + id);
}
