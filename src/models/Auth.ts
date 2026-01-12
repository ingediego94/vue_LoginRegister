export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  // Añade aquí otros campos si tu API devuelve más, como:
  // user: { name: string, role: string }
}