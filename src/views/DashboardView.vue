<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
// Importamos nuestros nuevos componentes
import UserProfile from '../components/UserProfile.vue';
import InfoCard from '../components/InfoCard.vue';

const router = useRouter();
const { currentUser, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<template>
  <div class="container mt-5">
    <div v-if="currentUser" class="row justify-content-center">
      
      <div class="col-md-9">
        <UserProfile 
          :nombre="currentUser.name" 
          :email="currentUser.email" 
          @logout="handleLogout" 
        />
      </div>

      <div class="col-md-4">
        <InfoCard 
          titulo="Mi Paisaje" 
          descripcion="Una imagen bonita para el dashboard."
          imagenUrl="https://picsum.photos/400/250?random=1" 
        />
      </div>
      
      <div class="col-md-4">
        <InfoCard 
          titulo="Otra foto de paisaje" 
          descripcion="Otra hermosa foto de paisaje."
          imagenUrl="https://picsum.photos/400/250?random=2" 
        />
      </div>

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
/* Ya no necesitamos tanto CSS manual porque Bootstrap hace el trabajo pesado */
.container {
  max-width: 1000px;
}
</style>