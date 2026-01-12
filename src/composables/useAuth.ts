import { ref } from 'vue';
import { AuthService } from '../services/AuthService';
import type { RegisterRequest, LoginRequest } from '../models/Auth';

export function useAuth() {
  const message = ref("");
  const isError = ref(false);
  const isLoading = ref(false); // Útil para deshabilitar botones

  const login = async (data: LoginRequest) => {
    isLoading.value = true;
    try {
      const response = await AuthService.login(data);
      localStorage.setItem("token", response.token); // Guardamos el JWT
      message.value = "Login exitoso. Redirigiendo...";
      isError.value = false;
      return true;
    } catch (error: any) {
      message.value = error.message;
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
      message.value = error.message;
      isError.value = true;
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return { message, isError, isLoading, login, register };
}