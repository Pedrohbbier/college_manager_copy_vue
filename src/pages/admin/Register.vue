<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('student')

const onSubmit = () =>
  auth.register({ name: name.value, email: email.value, password: password.value, role: role.value })
</script>

<template>
  <v-card>
    <v-card-title>Registrar</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Nome" required />
        <v-text-field v-model="email" label="E-mail" required />
        <v-text-field v-model="password" label="Senha" type="password" required />
        <v-select
          v-model="role"
          :items="['student','teacher']"
          label="Função"
          required
        />
      </v-form>
      <v-alert v-if="auth.error" type="error" dense>{{ auth.error }}</v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn :loading="auth.loading" color="primary" @click="onSubmit">Registrar</v-btn>
      <v-spacer />
      <RouterLink to="/admin/login">Já tenho conta</RouterLink>
    </v-card-actions>
  </v-card>
</template>
