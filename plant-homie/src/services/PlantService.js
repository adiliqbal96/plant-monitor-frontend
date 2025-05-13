import axios from 'axios';

const API = axios.create({
  baseURL: 'https://planthomieapi-hfg3f5huercmcccz.westeurope-01.azurewebsites.net/api'
});

export const getAllPlants = () => API.get('/plant');
export const getLatestPlant = () => API.get('/plant/latest');
export const createPlant = (plant) => API.post('/plant', plant);
export const deletePlant = (id) => API.delete(`/plant/${id}`);