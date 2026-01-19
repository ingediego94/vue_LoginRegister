<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useAsync } from '../composables/useAsync'; // Importamos el composable

// Componentes
import UserProfile from '../components/UserProfile.vue';
import InfoCard from '../components/InfoCard.vue';

// Servicios y Modelos
import { getPhotos } from '../services/PhotoService';
import type { Photo } from '../models/Photo';

const router = useRouter();
const { currentUser, logout } = useAuth();
const { isLoading, run } = useAsync(); // Inicializamos el gestor de carga

const photos = ref<Photo[]>([]);

const handleLogout = () => {
  logout();
  router.push('/login');
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Sin fecha';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString();
};

onMounted(async () => {
  try {
    if (currentUser.value) {
      // Usamos 'run' para que gestione automáticamente isLoading
      photos.value = await run(getPhotos());
    }
  } catch (error) {
    console.error("Error al obtener los recursos:", error);
  }
});
</script>

<template>
  <div class="container mt-5">
    <div v-if="currentUser" class="row justify-content-center">
      
      <div class="col-md-9 mb-4">
        <UserProfile 
          :nombre="currentUser.name" 
          :email="currentUser.email" 
          @logout="handleLogout" 
        />
      </div>

      <div v-if="isLoading" class="col-12 text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando recursos desde el servidor...</p>
      </div>

      <template v-else>
        <div class="col-md-4" v-for="photo in photos" :key="photo.id">
          <InfoCard 
            :titulo="'ID: ' + photo.id" 
            :descripcion="'Subido el: ' + formatDate(photo.createdAt)"
            :imagenUrl="photo.urlImage" 
          />
        </div>

        <div v-if="photos.length === 0" class="col-12 text-center mt-4">
          <p class="text-muted">No se encontraron archivos en la galería.</p>
        </div>
      </template>

    </div>

    <div v-else class="row justify-content-center">
      <div class="col-md-6 text-center shadow p-5 bg-white rounded">
        <h2 class="text-danger">Acceso Denegado</h2>
        <p>Por favor, inicia sesión para continuar.</p>
        <router-link to="/login" class="btn btn-primary">Ir al Login</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
}

:deep(.card-img-top) {
  height: 200px;
  object-fit: cover;
  background-color: #f8f9fa; /* Fondo gris claro mientras carga el recurso */
}
</style>