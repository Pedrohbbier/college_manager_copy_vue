<!-- src/layouts/MenuLayout.vue -->
<template>
  <!-- APP BAR -->
  <v-app-bar
    app
    color="primary"
    dark
    elevate-on-scroll
    class="px-0"
  >
    <!-- Logo -->
    <RouterLink to="/" class="d-flex align-center text-decoration-none ml-6">
      <v-img
        src="https://universidadepositivo.vtexassets.com/assets/vtex.file-manager-graphql/images/b813482a-c85c-4b0e-a3f7-c35188581a77___dfb2f550115d8f395c09f48a27fcad51.png"
        alt="Universidade Positivo"
        contain
        height="40"
        width="auto"
      />
    </RouterLink>

    <v-spacer />

    <!-- Itens do menu -->
    <v-btn text class="mx-4" to="/">Cursos</v-btn>
    <v-btn text class="mx-4" to="/">Estude na UP</v-btn>
    <v-btn text class="mx-4" to="/">Benefícios</v-btn>

    <!-- Dropdown “A Universidade Positivo” -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn text class="mx-4" v-bind="props">
          A Universidade Positivo
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/sobre/historia">
          <v-list-item-title>Nossa História</v-list-item-title>
        </v-list-item>
        <v-list-item to="/sobre/missao">
          <v-list-item-title>Missão e Visão</v-list-item-title>
        </v-list-item>
        <!-- …outros links se quiser… -->
      </v-list>
    </v-menu>

    <v-btn text class="mx-4" to="/inscricao">Minha Inscrição</v-btn>

    <!-- Ícone de carrinho com badge -->

    <!-- Ícone de acessibilidade -->
    <v-btn icon class="mx-4">
      <v-icon size="24">mdi-wheelchair-accessibility</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- CONTEÚDO DAS ROTAS FILHAS -->
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
</style>
