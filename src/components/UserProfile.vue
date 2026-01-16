<template>
  <div class="card border-primary mb-4 text-center p-4">
    <h2>Bienvenido, {{ nombre }}</h2>
    <p>Sesión activa: <strong>{{ email }}</strong></p>
    
    <button @click="$emit('logout')" class="btn btn-danger">
      Cerrar Sesión
    </button>
    
  </div>
</template>

<script setup>
defineProps(['nombre', 'email']);
defineEmits(['logout']);
</script>