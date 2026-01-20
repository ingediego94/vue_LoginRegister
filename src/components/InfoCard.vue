<template>
  <div class="card shadow-sm h-100 position-relative">
    
    <DeletePhotoComponent 
      v-if="currentUser?.role === 1" 
      :photoId="id" 
      @deleted="$emit('photoDeleted', id)"
    />

    <div class="media-wrapper">
      <video 
        v-if="esVideo(imagenUrl)" 
        :src="imagenUrl" 
        class="card-img-top" 
        controls
        preload="none"
        poster="https://placehold.jp/24/6610f2/ffffff/400x200.png?text=Video"
      ></video>
      
      <img 
        v-else 
        :src="imagenUrl" 
        class="card-img-top" 
        alt="Recurso multimedia"
        loading="lazy"
      >
    </div>

    <div class="card-body p-3 text-center">
      <h6 class="card-title fw-bold mb-1">{{ titulo }}</h6>
      <p class="card-text small text-muted">{{ descripcion }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth';
import DeletePhotoComponent from './DeletePhotoComponent.vue';

const { currentUser } = useAuth();

defineProps<{
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
}>();

defineEmits(['photoDeleted']);

const esVideo = (url: string): boolean => {
  if (!url) return false;
  const extensiones = ['.mp4', '.webm', '.ogg', '.mov'];
  return extensiones.some(ext => url.toLowerCase().endsWith(ext));
};
</script>

<style scoped>
.media-wrapper {
  height: 180px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>