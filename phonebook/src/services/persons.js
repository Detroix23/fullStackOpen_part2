// Backend communication for persons on the phonebook

import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

/*
 * Delete and return the person obejct from the JSON DB.
 */
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  console.log('deletePerson - req:', request);
  return request
    .then(response => response.data)
    .catch(() => window.alert(`Already deleted id ${id}.`));
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

export default { getAll, create, deletePerson, updatePerson };
