import { ref } from 'vue';

export function useAsync() {
  const isLoading = ref(false);

  /**
   * Ejecuta una promesa y gestiona automáticamente el estado 'isLoading'.
   * @param promise La función asíncrona a ejecutar.
   */
  async function run<T>(promise: Promise<T>): Promise<T> {
    isLoading.value = true;
    try {
      return await promise;
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, run };
}