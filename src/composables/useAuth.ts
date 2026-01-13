import { ref } from 'vue';
import { AuthService } from '../services/AuthService';
import type { RegisterRequest, LoginRequest } from '../models/Auth';

// Estado reactivo global (fuera de la función para que persista entre componentes)
const currentUser = ref(JSON.parse(localStorage.getItem("userSession") || 'null'));

export function useAuth() {
  const message = ref("");
  const isError = ref(false);
  const isLoading = ref(false);

  const login = async (data: LoginRequest) => {
    isLoading.value = true;
    try {
      const response = await AuthService.login(data);
      
      // 1. Guardamos el token para validación de seguridad
      localStorage.setItem("token", response.token); 
      
      // 2. Simulamos/Guardamos los datos del usuario para la UI
      // Si tu API no devuelve el nombre, aquí podrías usar data.email
      const userData = { name: data.email.split('@')[0], email: data.email };
      localStorage.setItem("userSession", JSON.stringify(userData));
      currentUser.value = userData;

      message.value = "Login exitoso. Redirigiendo...";
      isError.value = false;
      return true;
    } catch (error: any) {
      message.value = error.message || "Error al iniciar sesión";
      isError.value = true;
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (data: RegisterRequest) => {
    isLoading.value = true;
    try {
      await AuthService.register(data);
      message.value = "Usuario creado exitosamente. Ya puedes iniciar sesión.";
      isError.value = false;
      return true;
    } catch (error: any) {
      message.value = error.message || "Error al registrarse";
      isError.value = true;
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userSession");
    currentUser.value = null;
  };

  return { message, isError, isLoading, login, register, logout, currentUser };
}