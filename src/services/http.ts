import axios, {AxiosError} from "axios";

// const API_URL = 'https://mysystem-c6ecfc1b7c0f.herokuapp.com/api/Auth';
const API_URL = import.meta.env.VITE_API_URL;

// Creamos una instancia de axios para reutilizar la configuración
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;