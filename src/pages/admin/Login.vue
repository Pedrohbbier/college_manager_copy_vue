<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const onSubmit = () => auth.login({ email: email.value, password: password.value })
</script>

<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="E-mail" required />
        <v-text-field v-model="password" label="Senha" type="password" required />
      </v-form>
      <v-alert v-if="auth.error" type="error" dense>{{ auth.error }}</v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn :loading="auth.loading" color="primary" @click="onSubmit">Entrar</v-btn>
      <v-spacer />
      <RouterLink to="/admin/register">Criar conta</RouterLink>
    </v-card-actions>
  </v-card>
</template>
