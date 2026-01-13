import axios, { AxiosError } from 'axios';
import type { RegisterRequest, LoginRequest, AuthResponse } from '../models/Auth';

// const API_URL = 'https://mysystem-c6ecfc1b7c0f.herokuapp.com/api/Auth';
const API_URL = import.meta.env.VITE_API_URL;

// Creamos una instancia de axios para reutilizar la configuración
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const AuthService = {
  async register(data: RegisterRequest): Promise<void> {
    try {
      // Axios envía 'data' como JSON automáticamente
      await apiClient.post('/register', data);
    } catch (error) {
      this.handleError(error, 'Error en el registro');
    }
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/login', data);
      // Axios guarda la respuesta del servidor en la propiedad .data
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Credenciales inválidas');
    }
  },

  // Método auxiliar para procesar errores de C# / ASP.NET Core
  handleError(error: unknown, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.response?.data?.title;
      throw new Error(serverMessage || defaultMessage);
    }
    throw new Error(defaultMessage);
  }
};