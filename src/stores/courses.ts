import { defineStore } from 'pinia'
import { api } from '@/plugins/axios'

export interface Course {
  id: number
  name: string
  description?: string
  image?: string
  modality: string
  type: string
  enade?: number
}

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[],
    selected: null as Course | null,
    loading: false,
    error: '' as string
  }),
  getters: {
    count: (state) => state.courses.length
  },
  actions: {
    async fetchCourses() {
      this.loading = true; this.error = ''
      try {
        const res = await api.get('/courses')
        this.courses = res.data.data.courses
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao carregar cursos'
      } finally {
        this.loading = false
      }
    },

    async fetchCourse(id: number) {
      this.loading = true; this.error = ''
      try {
        const res = await api.get(`/courses/${id}`)
        this.selected = res.data.data.course
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao carregar curso'
      } finally {
        this.loading = false
      }
    },

    async createCourse(payload: Omit<Course, 'id'> | FormData) {
      this.loading = true; this.error = ''
      try {
        let res
        if (payload instanceof FormData) {
          res = await api.post('/courses', payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        } else {
          res = await api.post('/courses', payload)
        }
        this.courses.push(res.data.data.course)
        return res.data.data.course as Course
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao criar curso'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateCourse(
      id: number,
      payload: Partial<Omit<Course, 'id'>> | FormData
    ) {
      this.loading = true; this.error = ''
      try {
        let res
        if (payload instanceof FormData) {
          res = await api.put(`/courses/${id}`, payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        } else {
          res = await api.put(`/courses/${id}`, payload)
        }
        const updated = res.data.data.course as Course
        const idx = this.courses.findIndex(c => c.id === id)
        if (idx !== -1) this.courses[idx] = updated
        return updated
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao atualizar curso'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteCourse(id: number) {
      this.loading = true; this.error = ''
      try {
        await api.delete(`/courses/${id}`)
        this.courses = this.courses.filter(c => c.id !== id)
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao remover curso'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
