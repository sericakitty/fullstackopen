import { useState, useEffect } from 'react';
import axios from 'axios';

// 7.8 - custom hook for fetching data from the server
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => { // fetch data from the server and save it to the state
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);

  const create = async (resource) => { // make create function async
    try {
      const response = await axios.post(baseUrl, resource); // use await to get the response
      setResources(resources.concat(response.data)); // update the resources state with the new resource
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  const service = { // return an object that contains the resources and the create function
    create,
  };

  return [resources, service];
};

export default useResource;