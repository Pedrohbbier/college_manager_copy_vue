<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="goCreate">
          <v-icon left>mdi-plus</v-icon>
          Novo Curso
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="error"
          type="error"
          dense
          class="mb-4"
        >
          {{ error }}
        </v-alert>

        <v-data-table
          :headers="headers"
          :items="courses"
          :loading="loading"
          class="elevation-1"
          disable-sort
        >
          <template #item.actions="{ item }">
            <v-btn
              icon
              small
              @click="goEdit(item.id)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              small
              :loading="loading"
              @click="remove(item.id)"
            >
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCoursesStore, type Course } from '../../../stores/courses'

// store e router
const coursesStore = useCoursesStore()
const router = useRouter()

// reativos
const loading = computed(() => coursesStore.loading)
const courses = computed<Course[]>(() => coursesStore.courses)
const error = ref('')

// definição das colunas
const headers = [
  { text: 'Nome',       value: 'name'     },
  { text: 'Modalidade', value: 'modality' },
  { text: 'Tipo',       value: 'type'     },
  { text: 'ENADE',      value: 'enade'    },
  { text: 'Ações',      value: 'actions', sortable: false },
]

onMounted(() => {
  coursesStore.fetchCourses()
})

function goCreate() {
  router.push({ name: 'CourseCreate' })
}

function goEdit(id: number) {
  router.push({ name: 'CourseEdit', params: { id } })
}

async function remove(id: number) {
  const confirm = window.confirm('Tem certeza que deseja excluir este curso?')
  if (!confirm) return

  try {
    await coursesStore.deleteCourse(id)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao excluir curso.'
  }
}
</script>

<style scoped>
</style>
