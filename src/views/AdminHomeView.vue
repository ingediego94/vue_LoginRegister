<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useAsync } from '../composables/useAsync';
import { getPhotos } from '../services/PhotoService';
import type { Photo } from '../models/Photo';

// Componentes
import UsersListComponent from '../components/UsersListComponent.vue';
import UploadComponent from '../components/UploadComponent.vue';
import InfoCard from '../components/InfoCard.vue';

const { currentUser, logout } = useAuth();
const router = useRouter();
const { isLoading, run } = useAsync();
const photos = ref<Photo[]>([]);

const handleLogout = () => {
  logout();
  router.push('/login');
};

// Función para cargar/refrescar la galería
const loadGallery = async () => {
  try {
    photos.value = await run(getPhotos());
  } catch (error) {
    console.error("Error al cargar galería:", error);
  }
};

const removePhotoFromUI = (id: number) => {
  photos.value = photos.value.filter(p => p.id !== id);
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Sin fecha';
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? 'Fecha inválida' : d.toLocaleDateString();
};

onMounted(loadGallery);
</script>

<template>
  <div class="users-container">
    <div class="header">
      <h2 class="form-title text-center">Panel de Administrador</h2>
      <div class="user-info text-center mb-3">
        <p class="mb-1">Bienvenido: <strong>{{ currentUser?.name }}</strong></p>
        <span class="role-badge">Admin</span>
      </div>
      
      <div class="d-flex justify-content-between align-items-center w-100 mt-2">
        <UsersListComponent />
        <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
      </div>
    </div>

    <UploadComponent @success="loadGallery" />

    <div class="row g-4 mt-2">
      <div v-if="isLoading && photos.length === 0" class="col-12 text-center py-5">
        <div class="spinner-border text-primary"></div>
        <p>Actualizando recursos...</p>
      </div>

      <div class="col-md-4" v-for="photo in photos" :key="photo.id">
        <InfoCard 
          :id="photo.id"
          :titulo="'Archivo ID: ' + photo.id"
          :descripcion="'Subido el: ' + formatDate(photo.createdAt)"
          :imagenUrl="photo.urlImage"
          @photoDeleted="removePhotoFromUI"
        />
      </div>

      <div v-if="!isLoading && photos.length === 0" class="col-12 text-center">
        <p class="text-muted">No hay archivos para mostrar.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-container {
  padding: 2rem;
  font-family: sans-serif;
  max-width: 1100px;
  margin: 0 auto;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid blueviolet;
  padding-bottom: 1.5rem;
}

.form-title {
  color: rgb(102, 27, 173);
  font-size: 2rem;
}

.role-badge {
  background-color: blueviolet;
  color: white;
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.logout-btn {
  padding: 8px 20px;
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