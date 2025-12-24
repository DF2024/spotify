import { create } from 'zustand';
import api from '../api/axios';

// Función segura para leer del localStorage
const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
            return JSON.parse(storedUser);
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const useAuthStore = create((set) => ({
    user: getStoredUser(),
    token: localStorage.getItem('token') || null,

    login: async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            
            const { token, user } = response.data;
            
            // Validación: Si el backend no envía user, lanzamos error manual
            if (!user || !token) {
                throw new Error("Respuesta del servidor incompleta");
            }
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({ token, user });
            return true;
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            return false;
        }
    },

    register: async(username, email, password) => {
        try {
            await api.post('api/auth/register', {username, email, password})

            // Si no da error, retornamos true.
            // Nota: No hacemos login automático aquí, redirigiremos al usuario para que inicie sesión.
            return true
        } catch (error) {
            console.error("Register error:", error.response?.data || error.message)
            return false
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
    },

    isAdmin: () => {
        const user = getStoredUser();
        return user?.role === 'admin';
    }
}));