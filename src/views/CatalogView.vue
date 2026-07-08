<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { albums, genres } from '../data/albums'
import AlbumCard from '../components/AlbumCard.vue'
import AppIcon from '../components/icons/IconLibrary.vue'

const route = useRoute()
const router = useRouter()

// Фильтр по жанру инициализируется из query (?genre=...), приходящего с главной.
const activeGenre = ref(route.query.genre && genres.includes(route.query.genre) ? route.query.genre : 'Все')
const search = ref('')
const sort = ref('default') // default | price-asc | price-desc | year-desc | year-asc

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена: дешевле' },
  { value: 'price-desc', label: 'Цена: дороже' },
  { value: 'year-desc', label: 'Год: новее' },
  { value: 'year-asc', label: 'Год: старше' },
]

// Синхронизируем выбранный жанр с URL, если пользователь пришёл по ссылке-плитке.
watch(
  () => route.query.genre,
  (g) => {
    activeGenre.value = g && genres.includes(g) ? g : 'Все'
  },
)

function selectGenre(genre) {
  activeGenre.value = genre
  const query = genre === 'Все' ? {} : { genre }
  router.replace({ query })
}

const visibleAlbums = computed(() => {
  let result = albums

  if (activeGenre.value !== 'Все') {
    result = result.filter((a) => a.genre === activeGenre.value)
  }

  const q = search.value.trim().toLowerCase()
  if (q) {
    result = result.filter(
      (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q),
    )
  }

  // copy перед сортировкой, чтобы не мутировать исходные данные
  result = [...result]
  switch (sort.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'year-desc':
      result.sort((a, b) => b.year - a.year)
      break
    case 'year-asc':
      result.sort((a, b) => a.year - b.year)
      break
  }

  return result
})

function resetFilters() {
  search.value = ''
  sort.value = 'default'
  selectGenre('Все')
}
</script>

<template>
  <div class="section container">
    <header class="catalog__head">
      <span class="eyebrow">Каталог</span>
      <h1 class="catalog__title">Все альбомы</h1>
      <p class="muted">Ищите по названию и исполнителю, фильтруйте по жанру и сортируйте как удобно.</p>
    </header>

    <!-- Панель управления -->
    <div class="controls">
      <div class="search">
        <AppIcon name="search" :size="18" class="search__icon" />
        <label for="catalog-search" class="visually-hidden">Поиск по каталогу</label>
        <input
          id="catalog-search"
          v-model="search"
          type="search"
          class="search__input"
          placeholder="Поиск: название или исполнитель…"
          autocomplete="off"
        />
      </div>

      <div class="sort">
        <label for="catalog-sort" class="visually-hidden">Сортировка</label>
        <select id="catalog-sort" v-model="sort" class="sort__select">
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Фильтр по жанрам -->
    <div class="genre-filter" role="group" aria-label="Фильтр по жанру">
      <button
        type="button"
        class="genre-filter__btn"
        :class="{ 'genre-filter__btn--active': activeGenre === 'Все' }"
        @click="selectGenre('Все')"
      >
        Все
      </button>
      <button
        v-for="genre in genres"
        :key="genre"
        type="button"
        class="genre-filter__btn"
        :class="{ 'genre-filter__btn--active': activeGenre === genre }"
        @click="selectGenre(genre)"
      >
        {{ genre }}
      </button>
    </div>

    <!-- Результаты -->
    <p class="results-count muted">
      Найдено: <strong>{{ visibleAlbums.length }}</strong>
    </p>

    <div v-if="visibleAlbums.length" class="grid">
      <AlbumCard v-for="album in visibleAlbums" :key="album.id" :album="album" />
    </div>

    <div v-else class="empty">
      <span class="empty__disc" aria-hidden="true"></span>
      <h2 class="empty__title">Ничего не нашлось</h2>
      <p class="muted">Попробуйте изменить запрос или сбросить фильтры.</p>
      <button type="button" class="btn btn--ghost" @click="resetFilters">Сбросить фильтры</button>
    </div>
  </div>
</template>

<style scoped>
.catalog__head {
  margin-bottom: 1.75rem;
}
.catalog__title {
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  margin: 0.25rem 0 0.5rem;
}

/* --- Панель поиска/сортировки --- */
.controls {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.search {
  position: relative;
  display: flex;
  align-items: center;
}
.search__icon {
  position: absolute;
  left: 0.9rem;
  color: var(--muted);
  pointer-events: none;
}
.search__input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text);
  font-size: 0.95rem;
  transition: border-color var(--transition);
}
.search__input::placeholder {
  color: var(--muted);
}
.search__input:focus {
  outline: none;
  border-color: var(--accent);
}

.sort__select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text);
  font-size: 0.95rem;
  font-family: inherit;
  cursor: pointer;
}
.sort__select:focus {
  outline: none;
  border-color: var(--accent);
}

/* --- Фильтр жанров --- */
.genre-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.genre-filter__btn {
  padding: 0.45rem 0.95rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition:
    color var(--transition),
    background var(--transition),
    border-color var(--transition);
}
.genre-filter__btn:hover {
  color: var(--text);
  border-color: var(--accent);
}
.genre-filter__btn--active {
  color: #1a1210;
  background: var(--accent);
  border-color: var(--accent);
}

.results-count {
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
}
.results-count strong {
  color: var(--text);
}

/* --- Сетка каталога --- */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

/* --- Пустое состояние --- */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
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
.empty__title {
  font-size: 1.4rem;
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

/* --- Адаптив: 1 → 2 → 3/4 колонки --- */
@media (min-width: 600px) {
  .controls {
    grid-template-columns: 1fr auto;
  }
  .sort__select {
    min-width: 200px;
  }
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
