<script setup lang="ts">
import { useAsync } from '../composables/useAsync';
import { deletePhoto } from '../services/PhotoService';

const props = defineProps<{ photoId: number }>();
const emit = defineEmits(['deleted']);
const { isLoading, run } = useAsync();

const handleDelete = async () => {
  // Confirmación nativa del navegador (Simple y efectiva)
  const mensaje = `¿Desea borrar el archivo seleccionado? (ID: ${props.photoId})`;
  
  if (window.confirm(mensaje)) {
    try {
      await run(deletePhoto(props.photoId));
      emit('deleted', props.photoId);
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert('No se pudo eliminar el recurso del servidor.');
    }
  }
};
</script>

<template>
  <div class="delete-container">
    <button 
      class="btn-delete-icon" 
      @click="handleDelete"
      :disabled="isLoading"
      title="Eliminar archivo"
    >
      <i v-if="!isLoading" class="bi bi-trash3-fill"></i>
      <span v-else class="spinner-border spinner-border-sm"></span>
    </button>
  </div>
</template>

<style scoped>
.delete-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
}

.btn-delete-icon {
  background-color: #dc3545; /* Rojo */
  color: white;
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.btn-delete-icon:hover {
  transform: scale(1.15);
  background-color: #bb2d3b;
}

.btn-delete-icon:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>