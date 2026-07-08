<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="section container notfound">
    <div class="notfound__disc" aria-hidden="true">
      <span class="notfound__label">404</span>
    </div>
    <h1 class="notfound__title">Дорожка не читается</h1>
    <p class="muted notfound__text">
      Такой страницы нет — возможно, ссылка устарела или в адресе опечатка.
    </p>
    <div class="notfound__actions">
      <RouterLink to="/" class="btn btn--primary">На главную</RouterLink>
      <RouterLink to="/catalog" class="btn btn--ghost">В каталог</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding-block: 4rem;
}
.notfound__disc {
  display: grid;
  place-items: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: repeating-radial-gradient(circle at center, #100c09 0 3px, #1d1813 3px 5px);
  box-shadow: var(--shadow-lg);
  margin-bottom: 1rem;
}
.notfound__label {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  font-family: var(--font-display);
  font-weight: 700;
  color: #1a1210;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.notfound__title {
  font-size: clamp(1.6rem, 5vw, 2.4rem);
}
.notfound__text {
  max-width: 44ch;
}
.notfound__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
}
</style>
