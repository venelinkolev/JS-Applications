import { del, get, post, put } from './api.js';

const endPoints = {
  create: '/data/albums',
  catalog: '/data/albums?sortBy=_createdOn%20desc',
  byId: '/data/albums/',
};

export async function getAllAlbums() {
  return get(endPoints.catalog);
}

export async function getById(id) {
  return get(endPoints.byId + id);
}

export async function createAlbums(data) {
  return post(endPoints.create, data);
}

export async function updateAlbums(id, data) {
  return put(endPoints.byId + id, data);
}

export async function deleteAlbums(id) {
  return del(endPoints.byId + id);
}
