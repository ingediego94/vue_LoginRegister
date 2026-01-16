<template>
  <div class="card shadow-sm mb-4">
    <img :src="imagenUrl" class="card-img-top" alt="Imagen informativa">
    <div class="card-body text-center">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ descripcion }}</p>
    </div>
  </div>
</template>

<script setup>
// Definimos qué datos necesita recibir este componente para funcionar
defineProps(['titulo', 'descripcion', 'imagenUrl'])
</script>