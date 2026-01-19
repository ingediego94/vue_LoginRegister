<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useAsync } from '../composables/useAsync';
import { uploadPhoto } from '../services/PhotoService';

const { currentUser } = useAuth();
const { isLoading, run } = useAsync();
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  // Validación inicial: si no hay archivos o no hay usuario, salimos
  if (!files || files.length === 0 || !currentUser.value) return;

  try {
    // Convertimos la FileList a un Array para usar un ciclo más seguro
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      // TypeScript ahora sabe con certeza que 'file' es de tipo 'File'
      await run(uploadPhoto(currentUser.value.id, file));
    }
    
    alert('¡Recursos subidos exitosamente!');
    
    // Limpiamos el input para permitir nuevas subidas
    if (fileInput.value) fileInput.value.value = '';
    
  } catch (error) {
    console.error("Error al subir archivo:", error);
    alert('Hubo un problema al cargar los archivos al servidor.');
  }
};
</script>

<template>
  <div class="upload-card shadow-sm border rounded p-4 mb-4 bg-white">
    <div class="d-flex align-items-center mb-3">
      <h5 class="mb-0 text-primary fw-bold">Subir Imágenes / Videos</h5>
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
      <div class="spinner-border spinner-border-sm me-2" role="status"></div>
      <span>Procesando archivos...</span>
    </div>
  </div>
</template>

<style scoped>
.upload-card {
  max-width: 100%;
  border-left: 5px solid #6610f2 !important; /* Estilo violeta coherente */
}

input[type="file"]::file-selector-button {
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;
}

input[type="file"]::file-selector-button:hover {
  background-color: #0b5ed7;
}
</style>