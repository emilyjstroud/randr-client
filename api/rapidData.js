import { clientCredentials } from '../utils/client';

// GET RAPIDS
const getRapids = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rapids`)
    .then((response) => response.json())
    .then(resolve)
    .then(reject);
});

// CREATE RAPID
const createRapid = (rapid) => new Promise((resolve, reject) => {
  const rapidObj = {
    level: rapid.level,
  };
  fetch(`${clientCredentials.databaseURL}/rapids`, {
    method: 'POST',
    body: JSON.stringify(rapidObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

// DELETE RAPID
const deleteRapid = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rapids/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// GET SINGLE RAPID
const getSingleRapid = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rapids/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        level: data.level,
      });
    })
    .catch((error) => reject(error));
});

// GET RIVER RAOIDS
const getRiverRapids = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/river_rapids?river=${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateRapid = (rapid, id) => new Promise((resolve, reject) => {
  const rapidObj = {
    id: rapid.id,
    level: rapid.level,
  };
  fetch(`${clientCredentials.databaseURL}/rapids/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rapidObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getRapids,
  createRapid,
  deleteRapid,
  getSingleRapid,
  getRiverRapids,
  updateRapid,
};
