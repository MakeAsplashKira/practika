<script setup>
import { RouterLink } from 'vue-router'

const year = 2026 // учебный проект, фиксированный год

const nav = [
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О магазине' },
  { to: '/contacts', label: 'Контакты' },
  { to: '/cart', label: 'Корзина' },
]
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__logo">
          <span class="footer__disc" aria-hidden="true"></span>
          Обо́рот
        </span>
        <p class="muted footer__tagline">
          Музыка, которую можно подержать в руках. Винил, CD и цифра — учебный проект.
        </p>
      </div>

      <nav class="footer__nav" aria-label="Навигация в подвале">
        <h3 class="footer__heading">Разделы</h3>
        <ul>
          <li v-for="item in nav" :key="item.to">
            <RouterLink :to="item.to" class="footer__link">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="footer__contacts">
        <h3 class="footer__heading">Контакты</h3>
        <ul class="muted">
          <li>г. Санкт-Петербург, ул. Рубинштейна, 15</li>
          <li>+7 (921) 448-72-19</li>
          <li>hello@oborot.ru</li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="muted">© {{ year }} Обо́рот. Учебный проект. Все обложки и цены вымышленные.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.footer__inner {
  display: grid;
  gap: 2rem;
  padding-block: 2.5rem;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
}
.footer__disc {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: repeating-radial-gradient(circle at center, #14100d 0 2px, #241e18 2px 3px);
  position: relative;
}
.footer__disc::after {
  content: '';
  position: absolute;
  inset: 40%;
  border-radius: 50%;
  background: var(--accent);
}
.footer__tagline {
  margin-top: 0.75rem;
  max-width: 34ch;
  font-size: 0.92rem;
}

.footer__heading {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.9rem;
}
.footer__nav li,
.footer__contacts li {
  margin-bottom: 0.5rem;
}
.footer__link {
  color: var(--text);
  transition: color var(--transition);
}
.footer__link:hover {
  color: var(--accent);
}

.footer__bottom {
  border-top: 1px solid var(--border);
}
.footer__bottom-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: space-between;
  padding-block: 1.25rem;
  font-size: 0.85rem;
}

@media (min-width: 768px) {
  .footer__inner {
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 3rem;
  }
}
</style>
