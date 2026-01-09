import { ref } from 'vue';

// Definimos el tipo fuera para poder exportarlo si se necesita
export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

// Mantenemos los usuarios iniciales (Estado global del composable)
const users = ref<User[]>([
    { id: 1, name: "Diego", email: "diego@gmail.com", password: "Qwe.123*" },
    { id: 2, name: "Carlos", email: "carlos@gmail.com", password: "1234" },
    { id: 3, name: "Maria", email: "maria@gmail.com", password: "112233" }
]);

export function useAuth() {
    const message = ref("");
    const isError = ref(false);

    const login = (email: string, password: string) => {
        const user = users.value.find(u => u.email === email && u.password === password);
        
        if (user) {
            message.value = `¡Bienvenido ${user.name}! Login exitoso.`;
            isError.value = false;
            localStorage.setItem("userSession", JSON.stringify(user));
            return true;
        } else {
            message.value = "Credenciales incorrectas.";
            isError.value = true;
            return false;
        }
    };

    const register = (name: string, email: string, password: string) => {
        const exists = users.value.find(u => u.email === email);

        if (!exists) {
            const newId = users.value.length + 1;
            users.value.push({ id: newId, name, email, password });
            message.value = `Usuario ${name} creado exitosamente.`;
            isError.value = false;
            return true;
        } else {
            message.value = `El email ${email} ya está registrado.`;
            isError.value = true;
            return false;
        }
    };

    return {
        users, // Por si quieres listarlos en algún sitio
        message,
        isError,
        login,
        register
    };
}