<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getAlbumById, albums } from '../data/albums'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/format'
import CoverArt from '../components/CoverArt.vue'
import AlbumCard from '../components/AlbumCard.vue'
import AppIcon from '../components/icons/IconLibrary.vue'

const props = defineProps({
  id: { type: [String, Number], required: true },
})

const album = computed(() => getAlbumById(props.id))

const cart = useCartStore()
const justAdded = ref(false)
let timer = null

function addToCart() {
  if (!album.value) return
  cart.add(album.value)
  justAdded.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (justAdded.value = false), 1600)
}

// Похожие альбомы того же жанра (кроме текущего).
const related = computed(() => {
  if (!album.value) return []
  return albums.filter((a) => a.genre === album.value.genre && a.id !== album.value.id).slice(0, 3)
})
</script>

<template>
  <div class="section container">
    <RouterLink to="/catalog" class="back-link">
      <AppIcon name="arrow-left" :size="18" />
      Назад в каталог
    </RouterLink>

    <!-- Альбом найден -->
    <article v-if="album" class="album">
      <div class="album__cover">
        <CoverArt :album="album" vinyl />
      </div>

      <div class="album__info">
        <span class="chip">{{ album.genre }}</span>
        <h1 class="album__title">{{ album.title }}</h1>
        <p class="album__artist">{{ album.artist }}</p>

        <dl class="album__meta">
          <div><dt>Год</dt><dd>{{ album.year }}</dd></div>
          <div><dt>Жанр</dt><dd>{{ album.genre }}</dd></div>
          <div><dt>Треков</dt><dd>{{ album.tracklist.length }}</dd></div>
        </dl>

        <p class="album__description">{{ album.description }}</p>

        <div class="album__buy">
          <span class="album__price">{{ formatPrice(album.price) }}</span>
          <button
            class="btn btn--primary"
            type="button"
            :class="{ 'btn--added': justAdded }"
            @click="addToCart"
          >
            <AppIcon :name="justAdded ? 'check' : 'cart'" :size="18" />
            {{ justAdded ? 'Добавлено в корзину' : 'Добавить в корзину' }}
          </button>
        </div>

        <!-- Трек-лист -->
        <section class="tracklist" aria-label="Трек-лист">
          <h2 class="tracklist__title">Трек-лист</h2>
          <ol class="tracklist__list">
            <li v-for="(track, index) in album.tracklist" :key="index" class="tracklist__item">
              <span class="tracklist__num">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="tracklist__name">{{ track }}</span>
            </li>
          </ol>
        </section>
      </div>
    </article>

    <!-- Альбом не найден -->
    <div v-else class="not-found-inline">
      <h1>Альбом не найден</h1>
      <p class="muted">Возможно, ссылка устарела или такого альбома нет в каталоге.</p>
      <RouterLink to="/catalog" class="btn btn--primary">Вернуться в каталог</RouterLink>
    </div>

    <!-- Похожие -->
    <section v-if="related.length" class="related">
      <h2 class="section__title section__title--line">Похожее в жанре «{{ album.genre }}»</h2>
      <div class="related__grid">
        <AlbumCard v-for="item in related" :key="item.id" :album="item" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--muted);
  font-weight: 500;
  margin-bottom: 1.5rem;
  transition: color var(--transition);
}
.back-link:hover {
  color: var(--accent);
}

.album {
  display: grid;
  gap: 2rem;
}

.album__cover {
  max-width: 420px;
}

.album__info {
  display: flex;
  flex-direction: column;
}
.album__title {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  margin: 0.75rem 0 0.25rem;
}
.album__artist {
  font-size: 1.15rem;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 1.25rem;
}

.album__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 0;
  border-block: 1px solid var(--border);
  margin-bottom: 1.25rem;
}
.album__meta dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 0.15rem;
}
.album__meta dd {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
}

.album__description {
  color: var(--text);
  margin-bottom: 1.5rem;
  max-width: 60ch;
}

.album__buy {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 1.75rem;
}
.album__price {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--text);
}
.btn--added {
  --btn-bg: var(--success);
  --btn-fg: #10140f;
}

/* --- Трек-лист --- */
.tracklist__title {
  font-size: 1.3rem;
  margin-bottom: 0.9rem;
}
.tracklist__item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid var(--border);
  transition: background var(--transition);
}
.tracklist__item:hover {
  background: var(--surface);
}
.tracklist__num {
  font-family: var(--font-display);
  color: var(--accent);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.tracklist__name {
  color: var(--text);
}

/* --- Не найдено --- */
.not-found-inline {
  text-align: center;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}
.not-found-inline h1 {
  font-size: 1.8rem;
}

/* --- Похожее --- */
.related {
  margin-top: 3.5rem;
}
.related__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .related__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 900px) {
  .album {
    grid-template-columns: minmax(0, 420px) 1fr;
    align-items: start;
    gap: 3rem;
  }
  .album__cover {
    position: sticky;
    top: calc(var(--header-h) + 1.5rem);
  }
}
</style>
