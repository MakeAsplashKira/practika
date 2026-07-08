<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import AppIcon from './icons/IconLibrary.vue'

const cart = useCartStore()
const { totalCount } = storeToRefs(cart)

const route = useRoute()
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О магазине' },
  { to: '/contacts', label: 'Контакты' },
]

// Закрываем мобильное меню при смене маршрута.
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="brand" aria-label="Обо́рот — на главную">
        <span class="brand__disc" aria-hidden="true"></span>
        <span class="brand__name">Обо́рот</span>
      </RouterLink>

      <nav class="nav" :class="{ 'nav--open': menuOpen }" aria-label="Основная навигация">
        <ul class="nav__list">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="nav__link" active-class="nav__link--active">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <RouterLink to="/cart" class="cart-link" aria-label="Открыть корзину">
          <AppIcon name="cart" :size="22" />
          <span v-if="totalCount > 0" class="cart-link__badge" aria-hidden="true">{{ totalCount }}</span>
          <span class="visually-hidden">Товаров в корзине: {{ totalCount }}</span>
        </RouterLink>

        <button
          class="burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="24" />
          <span class="visually-hidden">Меню</span>
        </button>
      </div>
    </div>

    <!-- Выпадающее мобильное меню -->
    <transition name="drawer">
      <nav v-if="menuOpen" id="mobile-nav" class="mobile-nav" aria-label="Мобильная навигация">
        <ul>
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="mobile-nav__link" active-class="mobile-nav__link--active">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(26, 22, 19, 0.82);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: var(--header-h);
}

/* --- Логотип --- */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
}
.brand__disc {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background:
    repeating-radial-gradient(circle at center, #14100d 0 2px, #241e18 2px 3px);
  position: relative;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px var(--border);
}
.brand__disc::after {
  content: '';
  position: absolute;
  inset: 40%;
  border-radius: 50%;
  background: var(--accent);
}
.brand:hover .brand__disc {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* --- Десктоп-навигация (скрыта на мобильных) --- */
.nav {
  display: none;
}
.nav__list {
  display: flex;
  gap: 0.35rem;
}
.nav__link {
  display: inline-block;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  color: var(--muted);
  font-weight: 500;
  transition:
    color var(--transition),
    background var(--transition);
}
.nav__link:hover {
  color: var(--text);
  background: var(--surface);
}
.nav__link--active {
  color: var(--accent);
  background: var(--accent-soft);
}

/* --- Действия справа --- */
.header__actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cart-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  color: var(--text);
  transition:
    background var(--transition),
    color var(--transition);
}
.cart-link:hover {
  background: var(--surface);
  color: var(--accent);
}
.cart-link__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  display: grid;
  place-items: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: #1a1210;
  background: var(--accent);
  border-radius: 999px;
  border: 2px solid var(--bg);
}

.burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  transition: background var(--transition);
}
.burger:hover {
  background: var(--surface);
}

/* --- Мобильное выпадающее меню --- */
.mobile-nav {
  border-top: 1px solid var(--border);
  background: var(--bg);
  padding: 0.5rem 1.25rem 1rem;
}
.mobile-nav__link {
  display: block;
  padding: 0.85rem 0.5rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--text);
  border-bottom: 1px solid var(--border);
}
.mobile-nav__link--active {
  color: var(--accent);
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* --- Планшет и десктоп: показываем меню, прячем бургер --- */
@media (min-width: 768px) {
  .nav {
    display: block;
  }
  .burger {
    display: none;
  }
  .mobile-nav {
    display: none;
  }
}
</style>
