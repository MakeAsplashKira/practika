<script setup>
import { RouterLink } from 'vue-router'
import AppIcon from '../components/icons/IconLibrary.vue'

const values = [
  {
    icon: 'disc',
    title: 'Тёплый звук',
    text: 'Мы верим, что аналоговое звучание и ритуал «поставить пластинку» ничем не заменить.',
  },
  {
    icon: 'heart',
    title: 'С заботой о слушателе',
    text: 'Советуем честно: если альбом не для вас — так и скажем. Нам важна ваша коллекция.',
  },
  {
    icon: 'sparkles',
    title: 'Кураторство',
    text: 'Каждую позицию мы слушаем сами. В каталог попадает только то, что цепляет.',
  },
]

const team = [
  { name: 'Гуль Светлана', role: 'Основатель, куратор', initials: 'ГС' },
  { name: 'Артемов Александр', role: 'Звук и подборки', initials: 'АА' },
  { name: 'Морозов Дмитрий', role: 'Забота о клиентах', initials: 'МД' },
]
</script>

<template>
  <div class="section container about">
    <header class="about__hero">
      <span class="eyebrow">О магазине</span>
      <h1 class="about__title">Мы — про музыку, которую хочется хранить</h1>
      <p class="about__lead muted">
        «Обо́рот» вырос из маленькой домашней коллекции пластинок и любви к тому самому
        тёплому потрескиванию иглы. Сегодня это уютный магазин для тех, кто слушает
        музыку осознанно.
      </p>
    </header>

    <div class="about__grid">
      <section class="story">
        <h2 class="section__title section__title--line">Наша история</h2>
        <p>
          Всё началось с коробки винила, доставшейся от деда: джаз, старый блюз и
          несколько загадочных конвертов без подписей. Мы слушали их вечерами и поняли —
          в физическом носителе есть то, чего не даёт стриминг: вес, обложка, ритуал.
        </p>
        <p>
          Так появился «Обо́рот» — сначала как полка у друзей, потом как небольшой
          магазинчик. Мы собираем пластинки по настроению, а не по хайпу, и рассказываем
          о каждой так, будто ставим её вам лично.
        </p>
        <p class="muted about__note">
          Это учебный проект: все альбомы, цены и обложки — вымышленные. Но отношение к
          музыке — настоящее.
        </p>
      </section>

      <aside class="why-vinyl">
        <h2 class="why-vinyl__title">Почему винил?</h2>
        <ul class="why-vinyl__list">
          <li><AppIcon name="check" :size="18" /> Большая обложка — это отдельное искусство.</li>
          <li><AppIcon name="check" :size="18" /> Тёплый, «живой» аналоговый звук.</li>
          <li><AppIcon name="check" :size="18" /> Слушаешь альбом целиком, а не по трекам.</li>
          <li><AppIcon name="check" :size="18" /> Коллекция, которую приятно держать в руках.</li>
        </ul>
      </aside>
    </div>

    <!-- Ценности -->
    <section class="values">
      <h2 class="section__title section__title--line">Наши ценности</h2>
      <div class="values__grid">
        <article v-for="value in values" :key="value.title" class="value">
          <span class="value__icon"><AppIcon :name="value.icon" :size="22" /></span>
          <h3 class="value__title">{{ value.title }}</h3>
          <p class="muted">{{ value.text }}</p>
        </article>
      </div>
    </section>

    <!-- Команда -->
    <section class="team">
      <h2 class="section__title section__title--line">Команда</h2>
      <div class="team__grid">
        <article v-for="member in team" :key="member.role" class="member">
          <span class="member__avatar" aria-hidden="true">{{ member.initials }}</span>
          <h3 class="member__name">{{ member.name }}</h3>
          <p class="muted">{{ member.role }}</p>
        </article>
      </div>
    </section>

    <div class="cta">
      <div>
        <h2 class="cta__title">Загляните в каталог</h2>
        <p class="muted">Возможно, там уже стоит ваша следующая любимая пластинка.</p>
      </div>
      <RouterLink to="/catalog" class="btn btn--primary">Смотреть каталог</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.about__hero {
  max-width: 60ch;
  margin-bottom: 2.5rem;
}
.about__title {
  font-size: clamp(1.9rem, 5vw, 3rem);
  margin: 0.4rem 0 1rem;
}
.about__lead {
  font-size: 1.1rem;
}

.about__grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}
.story p {
  margin-bottom: 1rem;
  max-width: 62ch;
}
.about__note {
  font-size: 0.9rem;
  font-style: italic;
}

.why-vinyl {
  padding: 1.75rem;
  background:
    radial-gradient(circle at 100% 0%, rgba(224, 134, 59, 0.14), transparent 60%),
    var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  align-self: start;
}
.why-vinyl__title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
.why-vinyl__list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.5rem 0;
  color: var(--text);
}
.why-vinyl__list :deep(svg) {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

/* Ценности */
.values {
  margin-bottom: 3rem;
}
.values__grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}
.value {
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.value__icon {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  color: var(--accent);
  background: var(--accent-soft);
  margin-bottom: 0.8rem;
}
.value__title {
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}

/* Команда */
.team {
  margin-bottom: 3rem;
}
.team__grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}
.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
  padding: 1.75rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.member__avatar {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  color: #1a1210;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  margin-bottom: 0.5rem;
}
.member__name {
  font-size: 1.05rem;
}

/* CTA */
.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}
.cta__title {
  font-size: clamp(1.4rem, 4vw, 1.9rem);
  margin-bottom: 0.3rem;
}

@media (min-width: 768px) {
  .about__grid {
    grid-template-columns: 1.5fr 1fr;
  }
  .values__grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .team__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
