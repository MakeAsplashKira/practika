<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { albums, genres } from '../data/albums'
import AlbumCard from '../components/AlbumCard.vue'
import GenreTile from '../components/GenreTile.vue'
import AppIcon from '../components/icons/IconLibrary.vue'

// «Новинки / хиты» — берём несколько самых свежих альбомов.
const featured = computed(() =>
  [...albums].sort((a, b) => b.year - a.year).slice(0, 4),
)

const genreCount = (genre) => albums.filter((a) => a.genre === genre).length

const advantages = [
  {
    icon: 'truck',
    title: 'Бережная доставка',
    text: 'Пластинки едут в жёсткой упаковке, чтобы конверт и винил доехали идеально.',
  },
  {
    icon: 'shield',
    title: 'Только оригиналы',
    text: 'Проверенные прессы и переиздания. Никаких серых копий и брака.',
  },
  {
    icon: 'sparkles',
    title: 'Ручные подборки',
    text: 'Мы сами слушаем всё, что продаём, и собираем коллекции по настроению.',
  },
  {
    icon: 'heart',
    title: 'Любовь к звуку',
    text: 'Магазин для тех, кому важно не только слушать, но и держать музыку в руках.',
  },
]
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <span class="eyebrow">Магазин музыки на виниле</span>
          <h1 class="hero__title">
            Обо́рот — музыка, которую можно<br />
            <span class="hero__accent">подержать в руках</span>
          </h1>
          <p class="hero__lead muted">
            Тёплый ретро-магазин винила, CD и цифры. Собираем альбомы по настроению —
            от ночного синтвейва до уютного джаза под дождём.
          </p>
          <div class="hero__actions">
            <RouterLink to="/catalog" class="btn btn--primary">
              <AppIcon name="disc" :size="18" />
              Смотреть каталог
            </RouterLink>
            <RouterLink to="/about" class="btn btn--ghost">О магазине</RouterLink>
          </div>

          <ul class="hero__stats">
            <li><strong>{{ albums.length }}</strong><span class="muted">альбомов</span></li>
            <li><strong>{{ genres.length }}</strong><span class="muted">жанров</span></li>
            <li><strong>7&nbsp;дн.</strong><span class="muted">на возврат</span></li>
          </ul>
        </div>

        <!-- Крутящаяся виниловая пластинка -->
        <div class="hero__visual" aria-hidden="true">
          <div class="vinyl">
            <div class="vinyl__disc">
              <div class="vinyl__label"></div>
              <div class="vinyl__hole"></div>
            </div>
            <div class="vinyl__shine"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- НОВИНКИ -->
    <section class="section container">
      <div class="section__head">
        <div>
          <span class="eyebrow">Свежее в наличии</span>
          <h2 class="section__title section__title--line">Новинки и хиты</h2>
        </div>
        <RouterLink to="/catalog" class="btn btn--ghost btn--sm">Весь каталог →</RouterLink>
      </div>

      <div class="grid">
        <AlbumCard v-for="album in featured" :key="album.id" :album="album" />
      </div>
    </section>

    <!-- ЖАНРЫ -->
    <section class="section container">
      <div class="section__head">
        <div>
          <span class="eyebrow">Выбирай по настроению</span>
          <h2 class="section__title section__title--line">Жанры</h2>
        </div>
      </div>

      <div class="genres">
        <GenreTile v-for="genre in genres" :key="genre" :genre="genre" :count="genreCount(genre)" />
      </div>
    </section>

    <!-- ПОЧЕМУ МЫ -->
    <section class="section">
      <div class="container">
        <div class="section__head">
          <div>
            <span class="eyebrow">Наши принципы</span>
            <h2 class="section__title section__title--line">Почему Обо́рот</h2>
          </div>
        </div>

        <div class="advantages">
          <article v-for="item in advantages" :key="item.title" class="advantage">
            <span class="advantage__icon">
              <AppIcon :name="item.icon" :size="24" />
            </span>
            <h3 class="advantage__title">{{ item.title }}</h3>
            <p class="muted">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section container">
      <div class="cta">
        <div class="cta__text">
          <h2 class="cta__title">Готовы услышать разницу?</h2>
          <p class="muted">Загляните в каталог — там уже ждёт ваша следующая любимая пластинка.</p>
        </div>
        <RouterLink to="/catalog" class="btn btn--primary">Открыть каталог</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- HERO --- */
.hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}
.hero__inner {
  display: grid;
  gap: 2rem;
  align-items: center;
  padding-block: 3rem 3.5rem;
}
.hero__title {
  font-size: clamp(2rem, 7vw, 3.6rem);
  margin: 0.25rem 0 1rem;
}
.hero__accent {
  color: var(--accent);
}
.hero__lead {
  font-size: 1.05rem;
  max-width: 46ch;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.hero__stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}
.hero__stats li {
  display: flex;
  flex-direction: column;
}
.hero__stats strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
}
.hero__stats span {
  font-size: 0.8rem;
}

/* Винил */
.hero__visual {
  display: flex;
  justify-content: center;
}
.vinyl {
  position: relative;
  width: min(78vw, 340px);
  aspect-ratio: 1 / 1;
}
.vinyl__disc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    repeating-radial-gradient(circle at center, #100c09 0 3px, #1d1813 3px 5px);
  box-shadow: var(--shadow-lg), inset 0 0 60px rgba(0, 0, 0, 0.6);
  animation: vinyl-spin 8s linear infinite;
}
.vinyl__label {
  position: absolute;
  inset: 33%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.25), transparent 60%),
    linear-gradient(135deg, var(--accent), var(--accent-2));
}
.vinyl__hole {
  position: absolute;
  inset: 47.5%;
  border-radius: 50%;
  background: var(--bg);
}
.vinyl__shine {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 200deg,
    rgba(255, 255, 255, 0.12),
    transparent 20%,
    transparent 65%,
    rgba(255, 255, 255, 0.08)
  );
  pointer-events: none;
}
@keyframes vinyl-spin {
  to {
    transform: rotate(360deg);
  }
}

/* --- Сетки --- */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
.genres {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* --- Преимущества --- */
.advantages {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.advantage {
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition:
    transform var(--transition),
    border-color var(--transition);
}
.advantage:hover {
  transform: translateY(-3px);
  border-color: rgba(224, 134, 59, 0.35);
}
.advantage__icon {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  color: var(--accent);
  background: var(--accent-soft);
  margin-bottom: 0.9rem;
}
.advantage__title {
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}

/* --- CTA --- */
.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at 100% 0%, rgba(224, 134, 59, 0.18), transparent 55%),
    var(--surface);
  border: 1px solid var(--border);
}
.cta__title {
  font-size: clamp(1.4rem, 4vw, 2rem);
  margin-bottom: 0.35rem;
}

/* --- Адаптив --- */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .genres {
    grid-template-columns: repeat(2, 1fr);
  }
  .advantages {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1.1fr 0.9fr;
    padding-block: 4.5rem 5rem;
  }
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .genres {
    grid-template-columns: repeat(3, 1fr);
  }
  .advantages {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
