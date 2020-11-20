import axios from 'axios';

const api = axios.create({
    baseURL: "https://ativo-e-oprante-backend.herokuapp.com"
});

export default api;