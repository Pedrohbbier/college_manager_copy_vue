import { defineStore } from 'pinia'
import { api } from '../plugins/axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: number; email: string; name: string },
    token: localStorage.getItem('token') || '',
    loading: false as boolean,
    error: '' as string,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(payload: { name: string; email: string; password: string; role: string }) {
      this.loading = true
      this.error = ''
      try {
        const res = await api.post('/auth/register', payload)
        this.user = res.data.data.user
        this.token = res.data.data.token
        localStorage.setItem('token', this.token)
        router.push('/admin/dashboard')
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro no registro'
      } finally {
        this.loading = false
      }
    },
    async login(payload: { email: string; password: string }) {
      this.loading = true
      this.error = ''
      try {
        const res = await api.post('/auth/login', payload)
        this.user = res.data.data.user
        this.token = res.data.data.token
        localStorage.setItem('token', this.token)
        router.push('/admin/dashboard')
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro no login'
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token')
      router.push('/admin/login')
    }
  }
})
