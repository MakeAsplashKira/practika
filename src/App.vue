<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app">
    <a href="#main" class="skip-link">Перейти к содержимому</a>
    <AppHeader />

    <main id="main" class="app__main">
      <RouterView v-slot="{ Component }">
        <transition name="route-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app__main {
  flex: 1 0 auto;
}
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.6rem 1rem;
  background: var(--accent);
  color: #1a1210;
  font-weight: 600;
  border-radius: 0 0 var(--radius-sm) 0;
}
.skip-link:focus {
  left: 0;
}
</style>
