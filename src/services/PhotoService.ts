import http from './http';
import type { Photo } from '../models/Photo';

// Esta es la función que el Router dice que no encuentra
export const getPhotos = async (): Promise<Photo[]> => {
  const response = await http.get<Photo[]>('/photos/getAll');
  return response.data;
};

// Esta es la función para subir archivos que creamos antes
export const uploadPhoto = async (userId: number, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('Photo', file);
  formData.append('UserId', userId.toString());

  await http.post('/photos/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};