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
  id: number;
  name: string;
  lastName : string;
  email: string;
  role: number;     // 1= Admin;   2=User
  // Añade aquí otros campos si tu API devuelve más, como:
  // user: { name: string, role: string }
}


// Interfaz para la lista de usuarios del endpoint /getAll
export interface UserListItem{
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: number;
}