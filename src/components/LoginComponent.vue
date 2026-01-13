<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuth } from '../composables/useAuth';

    const {login, message, isError } = useAuth();
    const router = useRouter();

    const formData = ref({
    email: '',
    password: ''
    });

const handleSubmit = async () => {
  const success = await login(formData.value);
  if (success) {
    // Redirigir al dashboard tras login exitoso
    // router.push('/dashboard'); 
    console.log("Redirigiendo...");
    router.push('/dashboard');
  }
};
</script>



<template>
  <div class="page-container">
    <form class="general-form" @submit.prevent="handleSubmit">

      <h2 class="form-title">Login Form</h2>

      <p v-if="message" :style="{ color: isError ? 'red' : 'green', marginBottom: '10px' }">
        {{ message }}
      </p>

      <div class="boxes">
        <label class="form-labels" for="user_email-login">Email</label>
        <input id="user_email-login" v-model="formData.email" type="email" placeholder="Your email" required>
      </div>

      <div class="boxes">
        <label class="form-labels" for="user_password-login">Password</label>
        <input id="user_password-login" v-model="formData.password" type="password" placeholder="Your password" required>
      </div>

      <p class="login-prompt">Don't you have an account yet? <router-link to="/register">Register</router-link></p>

      <button class="submit-btn" type="submit">Login</button>
      

    </form>

  </div>
</template>



<style scoped>

  .page-container{
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

  .form-title{
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: rgb(102, 27, 173);
  }

  .boxes{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .form-labels{
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    align-self: flex-start;
  }

  input{
    box-sizing: border-box;
    width: 100%;
    height: 2.5rem;
    border: solid 1px #ccc;
    border-radius: 4px;
    padding: 0 10px;
    transition: border-color 0.3s;
    font-size: 1.3rem;
  }

  input:focus{
    outline: none;
    border-color: blueviolet;
  }

  .submit-btn{
    width: 100%;
    padding: 0.8rem;
    background-color: blueviolet;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
  }

  .submit-btn:hover{
    background-color: rgb(93, 18, 163);
  }

  .login-prompt{
    font-size: 0.9rem;
    margin: 1rem 0;
  }
</style>
