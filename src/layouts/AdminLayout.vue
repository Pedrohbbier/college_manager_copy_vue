<template>
  <v-layout>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Admin Panel</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app permanent width="200">
      <v-list nav dense>
        <RouterLink to="/admin/dashboard" class="v-list-item">
          <v-list-item-title>Dashboard</v-list-item-title>
        </RouterLink>
        <RouterLink to="/admin/courses" class="v-list-item">
          <v-list-item-title>Cursos</v-list-item-title>
        </RouterLink>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="fill-height pa-4">
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
const logout = () => auth.logout()
</script>