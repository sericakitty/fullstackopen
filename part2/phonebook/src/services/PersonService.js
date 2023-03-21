
// 2.13 creating Service module for handling requests to json-server
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const updatePerson = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson)
}

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const personService = {
  getAll,
  createPerson,
  updatePerson,
  removePerson
}

export default personService