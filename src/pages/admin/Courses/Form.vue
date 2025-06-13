<!-- src/pages/admin/Courses/Form.vue -->
<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="600">
      <v-card-title>
        {{ isEdit ? 'Editar Curso' : 'Novo Curso' }}
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" @submit.prevent="onSubmit">
          <v-text-field
            v-model="form.name"
            label="Nome"
            :rules="[rules.required]"
            required
          />

          <!-- Rich Text Editor Quill -->
          <div class="mb-4">
            <label class="d-block mb-1 font-medium">Descrição</label>
            <QuillEditor
              v-model:content="form.description"
              contentType="html"
              theme="snow"
              class="rich-editor"
            />
          </div>

          <v-file-input
            v-model="form.file"
            label="Imagem do Curso"
            prepend-icon="mdi-image"
            accept="image/*"
            :rules="[isEdit ? () => true : rules.required]"
            :clearable="isEdit"
          />

          <v-select
            v-model="form.modality"
            :items="modalityOptions"
            item-title="label"
            item-value="value"
            label="Modalidade"
            :rules="[rules.required]"
            required
          />

          <v-select
            v-model="form.type"
            :items="typeOptions"
            item-title="label"
            item-value="value"
            label="Tipo"
            :rules="[rules.required]"
            required
          />

          <v-text-field
            v-model.number="form.enade"
            label="Nota ENADE"
            type="number"
            min="0"
            max="100"
          />
        </v-form>

        <v-alert v-if="error" type="error" dense class="mt-4">
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="onCancel">Cancelar</v-btn>
        <v-btn color="primary" :loading="loading" @click="onSubmit">
          {{ isEdit ? 'Salvar' : 'Criar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useCoursesStore, type Course } from '../../../stores/courses'

// hooks e store
const router = useRouter()
const route = useRoute()
const coursesStore = useCoursesStore()

// refs e flags
const formRef = ref()
const loading = ref(false)
const error = ref('')

// determina modo
const isEdit = computed(() => route.name === 'CourseEdit')
const courseId = computed(() =>
  route.params.id ? Number(route.params.id) : null
)

// estado do form
const form = reactive<{
  name: string
  description: string
  file: File | null
  modality: string
  type: string
  enade: number | null
}>({
  name: '',
  description: '',
  file: null,
  modality: 'presencial',
  type: 'bacharelado',
  enade: null
})

// opções de select
const modalityOptions = [
  { label: 'Presencial', value: 'presencial' },
  { label: 'Online',     value: 'online'     },
  { label: 'Híbrida',    value: 'hibrida'    },
]

const typeOptions = [
  { label: 'Bacharelado', value: 'bacharelado' },
  { label: 'Tecnólogo',   value: 'tecnologo'   },
]

// validação
const rules = {
  required: (v: any) => (!!v && v !== '<p><br></p>') || 'Este campo é obrigatório'
}

// se edição, carrega dados (exibe HTML no Quill)
onMounted(async () => {
  if (isEdit.value && courseId.value !== null) {
    loading.value = true
    try {
      await coursesStore.fetchCourse(courseId.value)
      const c = coursesStore.selected as Course
      form.name        = c.name
      form.description = c.description || ''
      form.modality    = c.modality
      form.type        = c.type
      form.enade       = c.enade ?? null
      // form.file permanece null na edição
    } catch {
      error.value = 'Falha ao carregar dados do curso.'
    } finally {
      loading.value = false
    }
  }
})

// submissão
async function onSubmit() {
  // validação manual do richtext
  const valid = await formRef.value.validate?.()
  if (!valid) return

  loading.value = true
  error.value   = ''

  const payload = new FormData()
  payload.append('name', form.name)
  payload.append('description', form.description)
  payload.append('modality', form.modality)
  payload.append('type', form.type)
  if (form.enade !== null) payload.append('enade', String(form.enade))
  if (form.file) payload.append('image', form.file)

  try {
    if (isEdit.value && courseId.value !== null) {
      await coursesStore.updateCourse(courseId.value, payload)
    } else {
      await coursesStore.createCourse(payload)
    }
    router.push({ name: 'CoursesList' })
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao salvar curso.'
  } finally {
    loading.value = false
  }
}

// cancelar
function onCancel() {
  router.back()
}
</script>

<style scoped>
.rich-editor {
  min-height: 200px;
}
</style>
