import http from './http'; // Suponiendo que 'http' es su instancia de axios configurada
import type { Photo } from '../models/Photo';

export const getPhotos = async (): Promise<Photo[]> => {
  const response = await http.get<Photo[]>('/photos/getAll');
  return response.data;
};