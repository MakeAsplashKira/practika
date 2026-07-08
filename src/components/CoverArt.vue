<script setup>
import { computed } from 'vue'

// Процедурная обложка вместо реальных картинок (учебный проект, без нарушения авторских прав).
// Рисуем SVG-градиент + графический мотив + подпись. Опционально — «виниловая пластинка».
const props = defineProps({
  album: { type: Object, required: true },
  vinyl: { type: Boolean, default: false },
})

const from = computed(() => props.album.cover?.from ?? '#e0863b')
const to = computed(() => props.album.cover?.to ?? '#b5482f')
const shape = computed(() => props.album.cover?.shape ?? 'sun')

// Уникальные id для градиентов (иначе несколько обложек на странице «переопределяют» друг друга).
const uid = computed(() => `cov-${props.album.id}`)
</script>

<template>
  <div class="cover" :class="{ 'cover--vinyl': vinyl }">
    <svg
      class="cover__art"
      viewBox="0 0 300 300"
      role="img"
      :aria-label="`Обложка альбома «${album.title}» — ${album.artist}`"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient :id="`${uid}-bg`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" :stop-color="from" />
          <stop offset="100%" :stop-color="to" />
        </linearGradient>
      </defs>

      <rect width="300" height="300" :fill="`url(#${uid}-bg)`" />

      <!-- Графические мотивы по жанру/настроению -->
      <g :opacity="0.9">
        <template v-if="shape === 'sun'">
          <circle cx="150" cy="170" r="70" fill="#fff" opacity="0.16" />
          <rect x="0" y="150" width="300" height="6" fill="#000" opacity="0.18" />
          <rect x="0" y="170" width="300" height="6" fill="#000" opacity="0.14" />
          <rect x="0" y="190" width="300" height="6" fill="#000" opacity="0.1" />
        </template>

        <template v-else-if="shape === 'waves'">
          <path d="M0 180 Q75 140 150 180 T300 180 V300 H0 Z" fill="#000" opacity="0.14" />
          <path d="M0 210 Q75 175 150 210 T300 210 V300 H0 Z" fill="#fff" opacity="0.1" />
          <path d="M0 240 Q75 205 150 240 T300 240 V300 H0 Z" fill="#000" opacity="0.12" />
        </template>

        <template v-else-if="shape === 'bars'">
          <rect x="40" y="90" width="26" height="140" fill="#fff" opacity="0.16" />
          <rect x="88" y="60" width="26" height="170" fill="#fff" opacity="0.12" />
          <rect x="136" y="110" width="26" height="120" fill="#000" opacity="0.16" />
          <rect x="184" y="70" width="26" height="160" fill="#fff" opacity="0.14" />
          <rect x="232" y="100" width="26" height="130" fill="#000" opacity="0.14" />
        </template>

        <template v-else-if="shape === 'circles'">
          <circle cx="110" cy="150" r="60" fill="none" stroke="#fff" stroke-width="6" opacity="0.18" />
          <circle cx="180" cy="150" r="60" fill="none" stroke="#000" stroke-width="6" opacity="0.16" />
        </template>

        <template v-else-if="shape === 'grid'">
          <g stroke="#fff" stroke-width="2" opacity="0.16">
            <line x1="0" y1="200" x2="300" y2="200" />
            <line x1="0" y1="230" x2="300" y2="230" />
            <line x1="0" y1="265" x2="300" y2="265" />
            <line x1="60" y1="180" x2="10" y2="300" />
            <line x1="150" y1="180" x2="150" y2="300" />
            <line x1="240" y1="180" x2="290" y2="300" />
          </g>
          <circle cx="150" cy="120" r="46" fill="#fff" opacity="0.14" />
        </template>
      </g>

      <!-- Подпись поверх -->
      <text
        x="24"
        y="52"
        fill="#fff"
        opacity="0.92"
        font-family="'Space Grotesk', sans-serif"
        font-size="15"
        font-weight="700"
        letter-spacing="1"
      >
        {{ album.artist.toUpperCase() }}
      </text>
    </svg>

    <!-- Виниловая пластинка, выезжающая из конверта (декоративная деталь) -->
    <div v-if="vinyl" class="cover__disc" aria-hidden="true">
      <span class="cover__disc-label"></span>
    </div>
  </div>
</template>

<style scoped>
.cover {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface-2);
}

.cover__art {
  width: 100%;
  height: 100%;
}

/* Винил: диск чуть выглядывает справа и «выезжает» при hover карточки */
.cover--vinyl {
  overflow: visible;
}
.cover__disc {
  position: absolute;
  top: 50%;
  right: 6%;
  width: 88%;
  aspect-ratio: 1 / 1;
  transform: translate(0, -50%);
  border-radius: 50%;
  background:
    repeating-radial-gradient(circle at center, #14100d 0 2px, #1c1712 2px 4px);
  box-shadow: var(--shadow-md);
  z-index: -1;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cover__disc::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 210deg, rgba(255, 255, 255, 0.14), transparent 25%, transparent 60%, rgba(255, 255, 255, 0.1));
}
.cover__disc-label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32%;
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.cover__disc-label::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12%;
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--bg);
}
</style>
