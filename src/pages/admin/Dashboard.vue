<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="2">
          <v-card-title>
            Total de Cursos
            <v-spacer />
            <v-icon large>mdi-book-open</v-icon>
          </v-card-title>
          <v-card-text class="display-1 text-center">
            {{ coursesStore.count }}
          </v-card-text>
          <v-card-actions>
            <RouterLink to="/admin/courses">
              <v-btn text>Ver todos</v-btn>
            </RouterLink>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="2">
          <v-card-title>
            Ações Rápidas
            <v-spacer />
            <v-icon large>mdi-rocket-launch</v-icon>
          </v-card-title>
          <v-card-text>
            <v-btn block color="primary" @click="goCreate">
              + Novo Curso
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="2">
          <v-card-title>
            Boas-vindas
            <v-spacer />
            <v-icon large>mdi-hand-wave</v-icon>
          </v-card-title>
          <v-card-text>
            Olá, <strong>{{ userName }}</strong>!<br />
            Bem-vindo ao painel administrativo.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCoursesStore } from '../../stores/courses'
import { useAuthStore }    from '../../stores/auth'
import { useRouter }       from 'vue-router'

const coursesStore = useCoursesStore()
const authStore    = useAuthStore()
const router       = useRouter()

onMounted(() => {
  coursesStore.fetchCourses()
})

const userName = computed(() => authStore.user?.name || 'Administrador')

function goCreate() {
  router.push('/admin/courses/create')
}
</script>

<style scoped>
</style>
