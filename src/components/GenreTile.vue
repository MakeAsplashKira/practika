<script setup>
import { RouterLink } from 'vue-router'

// Плитка жанра ведёт в каталог с предустановленным фильтром (через query-параметр).
defineProps({
  genre: { type: String, required: true },
  count: { type: Number, default: 0 },
})
</script>

<template>
  <RouterLink :to="{ path: '/catalog', query: { genre } }" class="tile">
    <span class="tile__disc" aria-hidden="true"></span>
    <span class="tile__body">
      <span class="tile__name">{{ genre }}</span>
      <span class="tile__count muted">{{ count }} альбом(ов)</span>
    </span>
    <span class="tile__arrow" aria-hidden="true">→</span>
  </RouterLink>
</template>

<style scoped>
.tile {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition:
    transform var(--transition),
    border-color var(--transition),
    background var(--transition);
}
.tile:hover {
  transform: translateY(-3px);
  border-color: rgba(224, 134, 59, 0.4);
  background: var(--surface-2);
}

.tile__disc {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  background: repeating-radial-gradient(circle at center, #14100d 0 2px, #241e18 2px 3px);
  position: relative;
  transition: transform 400ms ease;
}
.tile__disc::after {
  content: '';
  position: absolute;
  inset: 38%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.tile:hover .tile__disc {
  transform: rotate(90deg);
}

.tile__body {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.tile__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
}
.tile__count {
  font-size: 0.8rem;
}

.tile__arrow {
  margin-left: auto;
  color: var(--accent);
  font-size: 1.2rem;
  transition: transform var(--transition);
}
.tile:hover .tile__arrow {
  transform: translateX(4px);
}
</style>
