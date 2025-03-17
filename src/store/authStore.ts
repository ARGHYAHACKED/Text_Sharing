import { create } from 'zustand';
import { User } from '../types';
import api from '../lib/axios';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    set({ user: response.data.user });
  },
  register: async (email, password) => {
    const response = await api.post('/api/auth/register', { email, password });
    set({ user: response.data.user });
  },
  logout: async () => {
    await api.post('/api/auth/logout');
    set({ user: null });
  },
  checkAuth: async () => {
    try {
      const response = await api.get('/api/auth/me');
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },
}));

export default useAuthStore;