<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/format'
import CoverArt from '../components/CoverArt.vue'
import AppIcon from '../components/icons/IconLibrary.vue'

const cart = useCartStore()
const { items, totalCount, totalPrice, isEmpty } = storeToRefs(cart)

const ordered = ref(false)

function checkout() {
  // Заглушка оформления заказа (без бэкенда).
  ordered.value = true
  cart.clear()
}
</script>

<template>
  <div class="section container cart">
    <header class="cart__head">
      <span class="eyebrow">Корзина</span>
      <h1 class="cart__title">Ваш заказ</h1>
    </header>

    <!-- Заказ оформлен -->
    <div v-if="ordered" class="done">
      <span class="done__icon"><AppIcon name="check" :size="30" /></span>
      <h2 class="done__title">Спасибо за заказ!</h2>
      <p class="muted">Это учебная заглушка — реального оформления не происходит. Но было приятно 🙂</p>
      <RouterLink to="/catalog" class="btn btn--primary">Вернуться в каталог</RouterLink>
    </div>

    <!-- Пустая корзина -->
    <div v-else-if="isEmpty" class="empty">
      <span class="empty__disc" aria-hidden="true"></span>
      <h2 class="empty__title">В корзине пока пусто</h2>
      <p class="muted">Добавьте пару пластинок — и они появятся здесь.</p>
      <RouterLink to="/catalog" class="btn btn--primary">Перейти в каталог</RouterLink>
    </div>

    <!-- Список товаров -->
    <div v-else class="cart__layout">
      <ul class="cart-list">
        <li v-for="item in items" :key="item.id" class="cart-item">
          <RouterLink :to="`/album/${item.id}`" class="cart-item__cover">
            <CoverArt :album="item" />
          </RouterLink>

          <div class="cart-item__info">
            <p class="cart-item__artist muted">{{ item.artist }}</p>
            <h3 class="cart-item__title">
              <RouterLink :to="`/album/${item.id}`">{{ item.title }}</RouterLink>
            </h3>
            <p class="cart-item__price muted">{{ formatPrice(item.price) }} за шт.</p>
          </div>

          <div class="cart-item__controls">
            <div class="qty" role="group" :aria-label="`Количество: ${item.title}`">
              <button type="button" class="qty__btn" aria-label="Уменьшить" @click="cart.decrement(item.id)">
                <AppIcon name="minus" :size="16" />
              </button>
              <span class="qty__value">{{ item.qty }}</span>
              <button type="button" class="qty__btn" aria-label="Увеличить" @click="cart.increment(item.id)">
                <AppIcon name="plus" :size="16" />
              </button>
            </div>

            <span class="cart-item__sum">{{ formatPrice(item.price * item.qty) }}</span>

            <button
              type="button"
              class="cart-item__remove"
              :aria-label="`Удалить ${item.title} из корзины`"
              @click="cart.remove(item.id)"
            >
              <AppIcon name="trash" :size="18" />
            </button>
          </div>
        </li>
      </ul>

      <!-- Итог -->
      <aside class="summary">
        <h2 class="summary__title">Итого</h2>
        <dl class="summary__rows">
          <div><dt class="muted">Товаров</dt><dd>{{ totalCount }} шт.</dd></div>
          <div><dt class="muted">Доставка</dt><dd>Бесплатно</dd></div>
          <div class="summary__total"><dt>К оплате</dt><dd>{{ formatPrice(totalPrice) }}</dd></div>
        </dl>
        <button type="button" class="btn btn--primary btn--block" @click="checkout">
          Оформить заказ
        </button>
        <button type="button" class="btn btn--ghost btn--block summary__clear" @click="cart.clear()">
          Очистить корзину
        </button>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.cart__head {
  margin-bottom: 1.75rem;
}
.cart__title {
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  margin-top: 0.3rem;
}

/* Пустое / завершённое состояние */
.empty,
.done {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.7rem;
  padding: 3rem 1rem;
}
.empty__disc {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: repeating-radial-gradient(circle at center, #14100d 0 3px, #241e18 3px 5px);
  position: relative;
  margin-bottom: 0.5rem;
}
.empty__disc::after {
  content: '';
  position: absolute;
  inset: 40%;
  border-radius: 50%;
  background: var(--accent);
}
.empty__title,
.done__title {
  font-size: 1.5rem;
}
.done__icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: #10140f;
  background: var(--success);
  margin-bottom: 0.5rem;
}

/* Раскладка */
.cart__layout {
  display: grid;
  gap: 1.5rem;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-item {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.cart-item__cover {
  display: block;
  width: 72px;
}
.cart-item__info {
  min-width: 0;
}
.cart-item__artist {
  font-size: 0.82rem;
}
.cart-item__title {
  font-size: 1.1rem;
  margin: 0.1rem 0 0.3rem;
}
.cart-item__title a:hover {
  color: var(--accent);
}
.cart-item__price {
  font-size: 0.85rem;
}

.cart-item__controls {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}
.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.qty__btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: none;
  background: var(--bg);
  color: var(--text);
  transition: background var(--transition);
}
.qty__btn:hover {
  background: var(--surface-2);
  color: var(--accent);
}
.qty__value {
  min-width: 38px;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.cart-item__sum {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  margin-left: auto;
}
.cart-item__remove {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--muted);
  transition:
    color var(--transition),
    border-color var(--transition);
}
.cart-item__remove:hover {
  color: var(--danger);
  border-color: var(--danger);
}

/* Итог */
.summary {
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  align-self: start;
}
.summary__title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
.summary__rows > div {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.summary__rows dd {
  font-weight: 500;
}
.summary__total {
  border-top: 1px solid var(--border);
  margin-top: 0.5rem;
  padding-top: 0.9rem !important;
}
.summary__total dt {
  font-family: var(--font-display);
  font-weight: 600;
}
.summary__total dd {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--accent);
}
.summary .btn--block {
  margin-top: 0.9rem;
}
.summary__clear {
  color: var(--muted);
}

@media (min-width: 900px) {
  .cart-item {
    grid-template-columns: 80px 1fr auto;
    align-items: center;
  }
  .cart-item__controls {
    grid-column: auto;
    border-top: none;
    padding-top: 0;
    flex-wrap: nowrap;
    gap: 1.25rem;
  }
  .cart__layout {
    grid-template-columns: 1fr 320px;
    align-items: start;
  }
  .summary {
    position: sticky;
    top: calc(var(--header-h) + 1.5rem);
  }
}
</style>
