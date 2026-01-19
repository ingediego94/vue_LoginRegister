<template>
  <div class="card shadow-sm mb-4">
    <video 
      v-if="esVideo(imagenUrl)" 
      :src="imagenUrl" 
      class="card-img-top" 
      controls
      preload="none"
      poster="https://via.placeholder.com/400x200?text=Video+Disponible"
    ></video>
    
    <img 
      v-else 
      :src="imagenUrl" 
      class="card-img-top" 
      alt="Recurso visual"
      loading="lazy"
    >

    <div class="card-body text-center">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ descripcion }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  titulo: string;
  descripcion: string;
  imagenUrl: string;
}>();

const esVideo = (url: string): boolean => {
  if (!url) return false;
  const extensionesVideo = ['.mp4', '.webm', '.ogg', '.mov'];
  return extensionesVideo.some(ext => url.toLowerCase().endsWith(ext));
};
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
  background-color: #eee;
}
</style>