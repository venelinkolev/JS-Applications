import { del, get, post, put } from './api.js';

const endPoints = {
  create: '/data/posts',
  catalog: '/data/posts?sortBy=_createdOn%20desc',
  byId: '/data/posts/',
};

export async function getAllPosts() {
  return get(endPoints.catalog);
}

export async function getById(id) {
  return get(endPoints.byId + id);
}

export async function getByUserId(userId) {
  return get(
    '/data/posts?where=_ownerId%3D%22' + userId + '%22&sortBy=_createdOn%20desc'
  );
}

export async function createPost(data) {
  return post(endPoints.create, data);
}

export async function updatePost(id, data) {
  return put(endPoints.byId + id, data);
}

export async function deletePost(id) {
  return del(endPoints.byId + id);
}
