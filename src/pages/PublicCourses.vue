<template>
  <v-container fluid>
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold">Encontre aqui o seu curso de Graduação</h1>
        <p class="text-subtitle-1">
          A Universidade Positivo pode te ajudar a ir mais longe. Escolha entre vários cursos, de Bacharelado a tecnólogos, e dê o próximo passo na sua carreira.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          placeholder="O que você procura?"
          prepend-inner-icon="mdi-magnify"
          dense
          rounded
          outlined
          hide-details
        />

        <h3 class="mt-6 mb-2">Filtros</h3>
        <v-divider class="mb-4" />

        <h4 class="subtitle-2 font-weight-medium">Você tem preferência por</h4>

        <v-checkbox label="Licenciatura" />
        <v-checkbox label="Bacharelado" />
        <v-checkbox label="Tecnológico" />

        <v-divider class="my-4" />

        <h4 class="subtitle-2 font-weight-medium">Modalidade</h4>

        <v-checkbox label="Online" />
        <v-checkbox label="Presencial" />
        <v-checkbox label="Hibrido" />

      </v-col>

      <v-col cols="12" md="9">
        <div class="d-flex justify-space-between align-center mb-4">
          <div class="subtitle-1">
            {{ courses.length }} Cursos encontrados
          </div>
        </div>

        <v-row dense>
          <v-col
            v-for="course in courses"
            :key="course.id"
            cols="12"
            sm="6"
            md="4"
          >
          <RouterLink
              :to="{ name: 'PublicCourseDetail', params: { id: course.id } }"
              class="course-link"
            >

            <v-card elevation="2" class="mb-6">
              <v-img
                :src="`${baseUrl}/${course.image}`"
                height="160px"
                cover
              />

              <v-card-title class="font-weight-bold">
                {{ course.name }}
              </v-card-title>

              <v-card-subtitle class="pb-2">
                <v-chip small class="ma-1">
                  <v-icon left class="mr-2" small>mdi-school-outline</v-icon>
                  {{ course.type }}
                </v-chip>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn block color="primary" class="white--text">
                  {{ course.modality }}
                </v-btn>
              </v-card-actions>
            </v-card>
            </RouterLink>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCoursesStore } from '@/stores/courses'

const coursesStore = useCoursesStore()

const baseUrl = import.meta.env.VITE_API_URL as string


onMounted(() => {
  coursesStore.fetchCourses()
})

const courses = computed(() => coursesStore.courses)
</script>

<style scoped>
h1 {
  margin-bottom: 0.25rem;
}
h3 {
  font-size: 1.125rem;
}
.v-card-subtitle {
  flex-direction: row;
}
</style>
