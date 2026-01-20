<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useAsync } from '../composables/useAsync';
import { uploadPhoto } from '../services/PhotoService';

const { currentUser } = useAuth();
const { isLoading, run } = useAsync();
const fileInput = ref<HTMLInputElement | null>(null);

// Definimos el evento que notificará al padre
const emit = defineEmits(['success']);

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0 || !currentUser.value) return;

  try {
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      await run(uploadPhoto(currentUser.value.id, file));
    }
    
    // Notificamos al Dashboard para que refresque la lista
    emit('success');
    
    if (fileInput.value) fileInput.value.value = '';
    
  } catch (error) {
    console.error("Error al subir archivo:", error);
    alert('Hubo un problema al cargar los archivos.');
  }
};
</script>

<template>
  <div class="upload-card shadow-sm border rounded p-4 mb-4 bg-white">
    <div class="d-flex align-items-center mb-3 text-primary fw-bold">
      <i class="bi bi-cloud-arrow-up-fill me-2 fs-4"></i>
      <h5 class="mb-0">Subir Imágenes / Videos</h5>
    </div>

    <div class="input-group">
      <input 
        type="file" 
        class="form-control" 
        multiple 
        accept="image/*,video/*"
        @change="handleFileUpload"
        :disabled="isLoading"
        ref="fileInput"
      >
    </div>

    <div v-if="isLoading" class="mt-3 d-flex align-items-center text-primary">
      <div class="spinner-border spinner-border-sm me-2"></div>
      <span>Procesando y refrescando galería...</span>
    </div>
  </div>
</template>

<style scoped>
.upload-card {
  border-left: 5px solid blueviolet !important;
}
</style>