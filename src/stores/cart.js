import { defineStore } from 'pinia'

const STORAGE_KEY = 'oborot-cart'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Корзина хранит минимум данных: id альбома и количество.
// Полные данные подтягиваются из каталога при отрисовке.
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadFromStorage(), // [{ id, title, artist, price, cover, qty }]
  }),

  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    isEmpty: (state) => state.items.length === 0,
    hasAlbum: (state) => (id) => state.items.some((item) => item.id === id),
  },

  actions: {
    add(album) {
      const existing = this.items.find((item) => item.id === album.id)
      if (existing) {
        existing.qty += 1
      } else {
        this.items.push({
          id: album.id,
          title: album.title,
          artist: album.artist,
          price: album.price,
          cover: album.cover,
          qty: 1,
        })
      }
      this.persist()
    },

    remove(id) {
      this.items = this.items.filter((item) => item.id !== id)
      this.persist()
    },

    increment(id) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        item.qty += 1
        this.persist()
      }
    },

    decrement(id) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      item.qty -= 1
      if (item.qty <= 0) {
        this.remove(id)
      } else {
        this.persist()
      }
    },

    clear() {
      this.items = []
      this.persist()
    },

    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      } catch {
        // localStorage может быть недоступен (приватный режим) — молча игнорируем.
      }
    },
  },
})
