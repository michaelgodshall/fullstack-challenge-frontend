import axios from 'axios';

// Use this data to connect to the API backend
export const API_URL = 'https://fullstack-challenge-backend.herokuapp.com/api/';
export const AUTH_TOKEN = '75170349a6970b64fe1f511210e0adc6dfa162df';
export const HOUSEHOLDS_ENDPOINT = 'households';

// Set the default axios url
axios.defaults.baseURL = API_URL;

// Send the authorization token with every axios request
axios.defaults.headers.common['Authorization'] = `Token ${AUTH_TOKEN}`;
