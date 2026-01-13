<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuth } from '../composables/useAuth';

  // Extraemos isLoading junto a las demás propiedades
  const { register, message, isError, isLoading } = useAuth();

  // Definimos el estado inicial para poder reutilizarlo
  const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  };

  const formData = ref({ ...initialState });

  const handleSubmit = async () => {
    const success = await register(formData.value);
    
    if (success) {
      // 1. Limpiamos el formulario asignando el estado inicial
      formData.value = { ...initialState };

      // 2. Opcional: Podrías limpiar el mensaje después de unos segundos
      setTimeout(() => { message.value = '' }, 4000);
    }
  };
</script>

<template>
  <div class="page-container">
    <form class="general-form" @submit.prevent="handleSubmit">

      <h2 class="form-title">Register Form</h2>

      <p v-if="message" :style="{ color: isError ? 'red' : 'green', marginBottom: '10px' }">
        {{ message }}
      </p>

      <div class="boxes">
        <label class="form-labels" for="user_name">Name</label>
        <input id="user_name" v-model="formData.name" type="text" placeholder="Your name" required :disabled="isLoading">
      </div>

      <div class="boxes">
        <label class="form-labels" for="user_lastname">Lastname</label>
        <input id="user_lastname" v-model="formData.lastName" type="text" placeholder="Your lastname" required :disabled="isLoading">
      </div>

      <div class="boxes">
        <label class="form-labels" for="user_email">Email</label>
        <input id="user_email" v-model="formData.email" type="email" placeholder="Your email" required :disabled="isLoading">
      </div>

      <div class="boxes">
        <label class="form-labels" for="user_password">Password</label>
        <input id="user_password" v-model="formData.password" type="password" placeholder="Your password" required :disabled="isLoading">
      </div>

      <p class="login-prompt">Already have an account? <router-link to="/login">Login</router-link></p>

      <button class="submit-btn" type="submit" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span v-else>Register</span>
      </button>

    </form>
  </div>
</template>

<style scoped>

.page-container {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.general-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px blueviolet;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  background-color: white;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.2);
}

.form-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: rgb(102, 27, 173);
}

.boxes {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
}

.form-labels {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  align-self: flex-start;
}

input {
  box-sizing: border-box;
  width: 100%;
  height: 2.5rem;
  border: solid 1px #ccc;
  border-radius: 4px;
  padding: 0 10px;
  transition: border-color 0.3s;
  font-size: 1.3rem;
}

input:focus {
  outline: none;
  border-color: blueviolet;
}

/* Estilos nuevos para el botón y el spinner */
.submit-btn {
  width: 100%;
  height: 3rem; /* Altura fija para que no salte al aparecer el spinner */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blueviolet;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: rgb(93, 18, 163);
}

.submit-btn:disabled {
  background-color: #a29bfe;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-prompt {
  font-size: 0.9rem;
  margin: 1rem 0;
}
</style>