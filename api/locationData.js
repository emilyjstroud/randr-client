import { clientCredentials } from '../utils/client';

// GET LOCATIONS
const getLocations = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations`)
    .then((response) => response.json())
    .then(resolve)
    .then(reject);
});

// CREATE LOCATIONS
const createLocation = (location) => new Promise((resolve, reject) => {
  const locationObj = {
    user: location.user,
    name: location.name,
    blurb: location.blurb,
    photo: location.photo,
  };
  fetch(`${clientCredentials.databaseURL}/locations`, {
    method: 'POST',
    body: JSON.stringify(locationObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

// DELETE LOCATION
const deleteLocation = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// UPDATE LOCATION
const updateLocation = (location, id) => new Promise((resolve, reject) => {
  const locationObj = {
    user: location.user,
    name: location.name,
    blurb: location.blurb,
    photo: location.photo,
  };
  fetch(`${clientCredentials.databaseURL}/locations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locationObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// GET SINGLE LOCATION
const getSingleLocation = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/locations/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

// GET LOCATION RIVERS
const getLocationRivers = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers?location=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

// VIEW LOCATION DETAILS
const viewLocationDetails = (locationId) => new Promise((resolve, reject) => {
  getSingleLocation(locationId)
    .then((locationData) => {
      getLocationRivers(locationId)
        .then((riverData) => {
          resolve({ locationData, riverData });
        });
    }).catch((error) => reject(error));
});

// GET RIVERS WITH LOCATION
const getRiversWithLocation = (locationId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers?locationId=${locationId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// DELETE LOCATION RIVERS
const deleteLocationRivers = (locationId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rivers/${locationId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
  getSingleLocation,
  getLocationRivers,
  getRiversWithLocation,
  deleteLocationRivers,
  viewLocationDetails,
};
