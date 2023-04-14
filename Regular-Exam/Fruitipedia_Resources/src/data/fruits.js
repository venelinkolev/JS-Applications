import { del, get, post, put } from './api.js';

const endPoints = {
  create: '/data/fruits',
  catalog: '/data/fruits?sortBy=_createdOn%20desc',
  byId: '/data/fruits/',
  search: '/data/fruits?where=',
};

export async function getAllFruits() {
  return get(endPoints.catalog);
}

export async function getByFruitId(id) {
  return get(endPoints.byId + id);
}

export async function getByUserId(userId) {
  return get(
    '/data/posts?where=_ownerId%3D%22' + userId + '%22&sortBy=_createdOn%20desc'
  );
}

export async function createFruit(data) {
  return post(endPoints.create, data);
}

export async function updateFruit(id, data) {
  return put(endPoints.byId + id, data);
}

export async function deleteFruit(id) {
  return del(endPoints.byId + id);
}

export async function searchFruit(query) {
  return get(endPoints.search + query);
}
