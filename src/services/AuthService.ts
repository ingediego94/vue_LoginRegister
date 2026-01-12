import type { RegisterRequest, LoginRequest, AuthResponse } from '../models/Auth';

const API_URL = 'https://mysystem-c6ecfc1b7c0f.herokuapp.com/api/Auth';

export const AuthService = {
  async register(data: RegisterRequest): Promise<void> {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en el registro');
    }
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Credenciales inválidas');
    }

    return await response.json();
  }
};