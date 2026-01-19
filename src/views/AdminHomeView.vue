<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import UsersListComponent from '../components/UsersListComponent.vue';
import UploadComponent from '../components/UploadComponent.vue';

const { currentUser, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<template>
  <div class="users-container">
    <div class="header">
      <h2 class="form-title">Panel de Administrador</h2>
      <div class="user-info">
        <p>Bienvenido: <strong>{{ currentUser?.name }}</strong></p>
        <span class="role-badge">Admin</span>
      </div>
      
      <UsersListComponent />

      <button @click="handleLogout" class="logout-btn mt-4">Cerrar Sesión</button>
    </div>

    <UploadComponent />

    <div class="table-wrapper">
      </div>
  </div>
</template>

<style scoped>
/* Mantengo sus estilos originales intactos */
.users-container {
  padding: 2rem;
  font-family: sans-serif;
  max-width: 900px;
  margin: 0 auto;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid blueviolet;
  padding-bottom: 1rem;
}

.form-title {
  color: rgb(102, 27, 173);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.user-info {
  margin-bottom: 1rem;
  text-align: center;
}

.role-badge {
  background-color: blueviolet;
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-bottom: 15px;
  display: inline-block;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.logout-btn:hover {
  background-color: #ff2e44;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>