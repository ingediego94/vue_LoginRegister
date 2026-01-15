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


// INTERCEPTOR: Esto es como un filtro que revisa cada salida al backend
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Sacamos el token guardado
  
  if (token) {
    // Lo ponemos en las cabeceras como espera el backend (Bearer Token)
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});


export default apiClient;