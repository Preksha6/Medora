import { create } from 'zustand';
import api from '../services/api';

const authStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  register: async (
    name,
    email,
    password,
    age,
    gender
) => {

    set({
        isLoading: true,
        error: null
    });

    try {

        const response =
        await api.post(

            "/auth/register",

            {
                name,
                email,
                password,
                age,
                gender
            }
        );

        const {
            user,
            token
        } = response.data;

        localStorage.setItem(
            "token",
            token
        );

        set({

            user,
            token,

            isAuthenticated: true,

            isLoading: false
        });

        return true;

    } catch (error) {

        console.log(
            error.response?.data
        );

        set({

            error:

            error.response?.data?.message ||

            "Registration failed",

            isLoading: false
        });

        return false;
    }
},

  fetchProfile: async () => {

    const token =
    localStorage.getItem(
        "token"
    );

    if (!token) return;

    try {

        const response =
        await api.get(
            "/auth/profile"
        );

        set({

            user: response.data,

            isAuthenticated: true
        });

    } catch (error) {

        localStorage.removeItem(
            "token"
        );

        set({

            user: null,

            token: null,

            isAuthenticated: false
        });
    }
},

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default authStore;
