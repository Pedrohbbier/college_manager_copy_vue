\<!-- src/pages/PublicCourseDetail.vue -->
<template>
  <div>
    <!-- Hero -->
    <v-img
      :src="`${baseUrl}/${course.image}`"
      height="320px"
      class="detail-hero"
      gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.7)"
    >
      <v-row class="fill-height pa-0 ma-0" align="center">
        <v-col cols="12">
          <h1 class="white--text display-1 font-weight-bold">{{ course.name }}</h1>
        </v-col>
      </v-row>
    </v-img>

    <v-container fluid class="mt-8">
      <!-- Cards + Summary -->
      <v-row>
        <!-- Info Cards Carousel -->
        <v-col cols="12" md="8">
          <v-slide-group show-arrows class="info-cards">
            <v-slide-item
              v-for="(card, i) in infoCards"
              :key="i"
            >
              <v-card outlined class="pa-4 ma-2" style="min-width: 200px">
                <v-row no-gutters align="center">
                  <v-col cols="3">
                    <v-icon size="32">{{ card.icon }}</v-icon>
                  </v-col>
                  <v-col cols="9">
                    <div class="subtitle-2 font-weight-medium">{{ card.title }}</div>
                    <div class="caption">{{ card.subtitle }}</div>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>

        <!-- Summary Card -->
        <v-col cols="12" md="4">
          <v-card elevation="2" class="pa-6">
            <h2 class="text-h6 font-weight-bold mb-4">{{ course.name }}</h2>
            <v-chip small class="ma-1">
              <v-icon left small>mdi-school-outline</v-icon>
              {{ course.type }}
            </v-chip>
            <v-chip small class="ma-1">
              <v-icon left small>mdi-clock-outline</v-icon>
              {{ course.enade ?? '–' }} semestres
            </v-chip>
            <v-chip small class="ma-1">
              <v-icon left small>mdi-map-marker-distance</v-icon>
              {{ course.modality }}
            </v-chip>
            <v-btn block color="primary" class="white--text mt-6">
              Começar minha inscrição
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Descrição -->
      <v-row class="mt-8">
        <v-col cols="12" md="8">
          <h2 class="text-h6 font-weight-bold mb-4">Conheça o curso</h2>
          <div class="body-1" v-html="course.description"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCoursesStore, type Course } from '@/stores/courses'

const route = useRoute()
const router = useRouter()
const coursesStore = useCoursesStore()
const baseUrl = import.meta.env.VITE_API_URL as string

// estado reativo do curso
const course = reactive<Course>({
  id: 0,
  name: '',
  description: '',
  image: '',
  modality: '',
  type: '',
  enade: null
})

// carrega dados
onMounted(async () => {
  const id = Number(route.params.id)
  await coursesStore.fetchCourse(id)
  Object.assign(course, coursesStore.selected!)
})

// voltar
function goBack() {
  router.back()
}

// define os cards de info
const infoCards = computed(() => [
  { title: 'Formação', subtitle: course.type, icon: 'mdi-school-outline' },
  { title: 'Aula',     subtitle: course.modality, icon: 'mdi-desktop-mac' },
  { title: 'Enade',    subtitle: String(course.enade ?? '–'), icon: 'mdi-flask-outline' }
])
</script>

<style scoped>
.detail-hero {
  position: relative;
}

.info-cards {
  /* garante scroll suave horizontal */
  overflow-x: auto;
  display: flex;
}
.info-cards .v-slide-group__wrapper {
  flex-wrap: nowrap;
}
</style>
