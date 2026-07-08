<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/format'
import CoverArt from './CoverArt.vue'
import AppIcon from './icons/IconLibrary.vue'

const props = defineProps({
  album: { type: Object, required: true },
})

const cart = useCartStore()
const justAdded = ref(false)
let timer = null

function addToCart() {
  cart.add(props.album)
  justAdded.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (justAdded.value = false), 1400)
}
</script>

<template>
  <article class="card">
    <RouterLink :to="`/album/${album.id}`" class="card__media" :aria-label="`Открыть альбом «${album.title}»`">
      <CoverArt :album="album" vinyl />
      <span class="card__genre chip">{{ album.genre }}</span>
    </RouterLink>

    <div class="card__body">
      <p class="card__artist muted">{{ album.artist }}</p>
      <h3 class="card__title">
        <RouterLink :to="`/album/${album.id}`" class="card__title-link">{{ album.title }}</RouterLink>
      </h3>
      <p class="card__meta muted">{{ album.year }} · {{ album.tracklist.length }} трек(ов)</p>

      <div class="card__footer">
        <span class="card__price">{{ formatPrice(album.price) }}</span>
        <button
          class="btn btn--primary btn--sm"
          type="button"
          :class="{ 'btn--added': justAdded }"
          @click="addToCart"
        >
          <AppIcon :name="justAdded ? 'check' : 'cart'" :size="16" />
          {{ justAdded ? 'Добавлено' : 'В корзину' }}
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition:
    transform var(--transition),
    border-color var(--transition),
    box-shadow var(--transition);
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(224, 134, 59, 0.4);
  box-shadow: var(--shadow-md);
}

.card__media {
  position: relative;
  display: block;
  padding: 0.9rem 0.9rem 0;
}
/* Виниловый диск выезжает при наведении на карточку */
.card:hover .card__media :deep(.cover__disc) {
  transform: translate(28%, -50%);
}
/* Бейдж жанра — внизу обложки, тёмное «стекло», чтобы не перекрывать имя исполнителя сверху */
.card__genre {
  position: absolute;
  top: auto;
  bottom: 1.3rem;
  left: 1.3rem;
  background: rgba(20, 16, 13, 0.7);
  color: var(--text);
  border-color: rgba(243, 234, 217, 0.22);
  backdrop-filter: blur(6px);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.9rem 1rem 1.1rem;
  flex: 1;
}
.card__artist {
  font-size: 0.85rem;
}
.card__title {
  font-size: 1.15rem;
}
.card__title-link {
  transition: color var(--transition);
}
.card__title-link:hover {
  color: var(--accent);
}
.card__meta {
  font-size: 0.82rem;
  margin-bottom: 0.5rem;
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
}
.card__price {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}
.btn--added {
  --btn-bg: var(--success);
  --btn-fg: #10140f;
}
</style>
