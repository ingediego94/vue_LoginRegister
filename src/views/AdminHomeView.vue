<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { UserService } from '../services/UserService';
import type { UserListItem } from '../models/Auth';

const { currentUser, logout } = useAuth();
const router = useRouter();

const users = ref<UserListItem[]>([]);
const errorCarga = ref(false); // Nueva variable para saber si falló

const handleLogout = () => {
  logout();
  router.push('/login');
};

onMounted(async () => {
  try {
    const data = await UserService.getAllUsers();
    users.value = data;
    errorCarga.value = false;
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
    errorCarga.value = true; // Si hay error, activamos el aviso
  }
});
</script>

<template>
  <div class="users-container">
    <div class="header">
      <h2 class="form-title">Panel de Administrador</h2>
      <div class="user-info">
        <p>Bienvenido: <strong>{{ currentUser?.name }}</strong></p>
        <span class="role-badge">Admin</span>
      </div>
      <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
    </div>

    <div class="table-wrapper">
      <div v-if="errorCarga" style="padding: 20px; text-align: center; color: red;">
        <p>⚠️ Error al conectar con el servidor. Revisa tu conexión o el token.</p>
      </div>

      <div v-else-if="users.length === 0" style="padding: 20px; text-align: center;">
        <p>Cargando lista de usuarios...</p>
      </div>

      <table v-else class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Correo Electrónico</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role === 1 ? 'Administrador' : 'Usuario' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Estilos coherentes con tu diseño original */
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
}

.table-wrapper {
  overflow-x: auto; /* Para que sea responsive en móviles */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.users-table th {
  background-color: blueviolet;
  color: white;
  padding: 15px;
  text-align: left;
}

.users-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.users-table tr:hover {
  background-color: #f9f5ff;
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
</style>