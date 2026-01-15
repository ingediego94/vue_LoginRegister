import apiClient from './http';
import type { UserListItem } from '../models/Auth';

export const UserService = {
  async getAllUsers(): Promise<UserListItem[]> {
    try {
      console.log("Intentando obtener usuarios...");
      const response = await apiClient.get<UserListItem[]>('/User/getAll');
      console.log("Datos recibidos:", response.data);
      return response.data;
    } catch (error: any) {
      // Esto nos dirá en la consola si es un error 401 (No autorizado) o 404 (No encontrado)
      console.error("Error detallado en el servicio:", error.response || error);
      throw error;
    }
  }
};