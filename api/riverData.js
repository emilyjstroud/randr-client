import { clientCredentials } from '../utils/client';
import { getRiversWithLocation } from './locationData';

// GET RIVERS
const getRivers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers`)
    .then((response) => response.json())
    .then(resolve)
    .then(reject);
});

// CREATE RIVER
const createRiver = (river) => new Promise((resolve, reject) => {
  const riverObj = {
    name: river.name,
    blurb: river.blurb,
    photo: river.photo,
    location: river.location,
    rapids: river.rapids,
  };
  fetch(`${clientCredentials.databaseURL}/rivers`, {
    method: 'POST',
    body: JSON.stringify(riverObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

// UPDATE RIVER
const updateRiver = (river, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(river),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// DELETE RIVER
const deleteRiver = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// GET SINGLE RIVER
const getSingleRiver = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

// GET RIVERS WITH RAPIDS
const getRiversWithRapid = (rapidId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers?rapidId=${rapidId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// VIEW RIVER DETAILS
const viewRiverDetails = (riverId) => new Promise((resolve, reject) => {
  getSingleRiver(riverId)
    .then((riverData) => {
      getRiversWithLocation(riverId);
      getRiversWithRapid(riverId)
        .then((rapidData) => {
          resolve({ riverData, rapidData });
        });
    }).catch((error) => reject(error));
});

// DELETE RIVER RAPIDS
const deleteRiverRapids = (rapidId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers/${rapidId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getRivers,
  createRiver,
  updateRiver,
  deleteRiver,
  getSingleRiver,
  getRiversWithRapid,
  deleteRiverRapids,
  viewRiverDetails,
};
