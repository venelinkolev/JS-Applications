import * as api from './api.js';

const endPoints = {
  getAllIdea: 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
  createIdea: 'data/ideas',
  getIdeaById: 'data/ideas/',
  deleteIdeaById: 'data/ideas/',
};

export async function getAllIdea() {
  return api.get(endPoints.getAllIdea);
}

export async function createIdea(data) {
  return api.post(endPoints.createIdea, data);
}

export async function getIdeaById(id) {
  return api.get(endPoints.getIdeaById + id);
}

export async function deleteIdeaById(id) {
  return api.del(endPoints.deleteIdeaById + id);
}
