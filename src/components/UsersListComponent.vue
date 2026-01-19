<script setup lang="ts">
import { ref } from 'vue';
import { UserService } from '../services/UserService';
import { useAsync } from '../composables/useAsync';
import type { UserListItem } from '../models/Auth';

const users = ref<UserListItem[]>([]);
const errorCarga = ref(false);
const { isLoading, run } = useAsync();

// Función para cargar los usuarios que se ejecutará al abrir el modal
const loadUsers = async () => {
  try {
    users.value = await run(UserService.getAllUsers());
    errorCarga.value = false;
  } catch (error) {
    console.error("Error al cargar la tabla:", error);
    errorCarga.value = true;
  }
};
</script>

<template>
  <button 
    type="button" 
    class="btn-open-modal" 
    data-bs-toggle="modal" 
    data-bs-target="#usersModal"
    @click="loadUsers"
  >
    Ver Lista de Usuarios
  </button>

  <div class="modal fade" id="usersModal" tabindex="-1" aria-labelledby="usersModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="usersModalLabel">Usuarios Registrados</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          <div v-if="isLoading" class="text-center p-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2">Consultando base de datos .NET...</p>
          </div>

          <div v-else-if="errorCarga" class="alert alert-danger text-center">
            ⚠️ Error al conectar con el servidor.
          </div>

          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead class="table-violet">
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }} {{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span :class="user.role === 1 ? 'badge bg-primary' : 'badge bg-secondary'">
                      {{ user.role === 1 ? 'Admin' : 'Usuario' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-open-modal {
  padding: 12px 24px;
  background-color: blueviolet;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-open-modal:hover {
  transform: scale(1.05);
  background-color: rgb(102, 27, 173);
}

.table-violet {
  background-color: blueviolet;
  color: white;
}

.modal-header {
  border-bottom: 2px solid blueviolet;
}

.modal-title {
  color: rgb(102, 27, 173);
  font-weight: bold;
}
</style>