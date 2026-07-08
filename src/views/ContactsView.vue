<script setup>
import { reactive, ref } from 'vue'
import AppIcon from '../components/icons/IconLibrary.vue'

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const submitted = ref(false)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field) {
  switch (field) {
    case 'name':
      errors.name = form.name.trim() ? '' : 'Пожалуйста, укажите имя.'
      break
    case 'email':
      if (!form.email.trim()) {
        errors.email = 'Пожалуйста, укажите e-mail.'
      } else if (!EMAIL_RE.test(form.email.trim())) {
        errors.email = 'Похоже, e-mail введён некорректно.'
      } else {
        errors.email = ''
      }
      break
    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Напишите, пожалуйста, сообщение.'
      } else if (form.message.trim().length < 10) {
        errors.message = 'Сообщение слишком короткое (минимум 10 символов).'
      } else {
        errors.message = ''
      }
      break
  }
}

function validateAll() {
  validateField('name')
  validateField('email')
  validateField('message')
  return !errors.name && !errors.email && !errors.message
}

function handleSubmit() {
  if (!validateAll()) return
  // Бэкенда нет — просто показываем сообщение об успехе (заглушка).
  submitted.value = true
  form.name = ''
  form.email = ''
  form.message = ''
}

function resetForm() {
  submitted.value = false
}

const contactInfo = [
  { icon: 'map-pin', label: 'Адрес', value: 'г. Санкт-Петербург, ул. Рубинштейна, 15' },
  { icon: 'clock', label: 'Часы работы', value: 'Ежедневно, 11:00 – 21:00' },
  { icon: 'phone', label: 'Телефон', value: '+7 (921) 448-72-19' },
  { icon: 'mail', label: 'E-mail', value: 'hello@oborot.ru' },
]

const socials = [
  { label: 'Telegram', href: 'https://t.me/oborot_vinyl' },
  { label: 'VK', href: 'https://vk.com/oborot_vinyl' },
  { label: 'YouTube', href: 'https://youtube.com/@oborot_vinyl' },
]
</script>

<template>
  <div class="section container contacts">
    <header class="contacts__head">
      <span class="eyebrow">Контакты</span>
      <h1 class="contacts__title">Напишите нам</h1>
      <p class="muted">
        Вопрос о наличии, доставке или совет по подборке — мы на связи. Ответим в течение дня.
      </p>
    </header>

    <div class="contacts__grid">
      <!-- Форма -->
      <section class="form-card" aria-label="Форма обратной связи">
        <transition name="route-fade" mode="out-in">
          <!-- Успех -->
          <div v-if="submitted" key="success" class="success">
            <span class="success__icon"><AppIcon name="check" :size="28" /></span>
            <h2 class="success__title">Спасибо, заявка отправлена!</h2>
            <p class="muted">Мы получили ваше сообщение и скоро свяжемся с вами.</p>
            <button type="button" class="btn btn--ghost" @click="resetForm">Написать ещё</button>
          </div>

          <!-- Форма -->
          <form v-else key="form" class="form" novalidate @submit.prevent="handleSubmit">
            <div class="field">
              <label for="name" class="field__label">Имя <span aria-hidden="true">*</span></label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="field__input"
                :class="{ 'field__input--error': errors.name }"
                :aria-invalid="!!errors.name"
                aria-describedby="name-error"
                autocomplete="name"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" id="name-error" class="field__error">{{ errors.name }}</p>
            </div>

            <div class="field">
              <label for="email" class="field__label">E-mail <span aria-hidden="true">*</span></label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="field__input"
                :class="{ 'field__input--error': errors.email }"
                :aria-invalid="!!errors.email"
                aria-describedby="email-error"
                autocomplete="email"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" id="email-error" class="field__error">{{ errors.email }}</p>
            </div>

            <div class="field">
              <label for="message" class="field__label">Сообщение <span aria-hidden="true">*</span></label>
              <textarea
                id="message"
                v-model="form.message"
                class="field__input field__textarea"
                :class="{ 'field__input--error': errors.message }"
                rows="5"
                :aria-invalid="!!errors.message"
                aria-describedby="message-error"
                @blur="validateField('message')"
              ></textarea>
              <p v-if="errors.message" id="message-error" class="field__error">{{ errors.message }}</p>
            </div>

            <button type="submit" class="btn btn--primary btn--block">Отправить</button>
            <p class="form__note muted">Поля со звёздочкой (*) обязательны.</p>
          </form>
        </transition>
      </section>

      <!-- Контактная информация -->
      <aside class="info">
        <ul class="info__list">
          <li v-for="item in contactInfo" :key="item.label" class="info__item">
            <span class="info__icon"><AppIcon :name="item.icon" :size="20" /></span>
            <span>
              <span class="info__label muted">{{ item.label }}</span>
              <span class="info__value">{{ item.value }}</span>
            </span>
          </li>
        </ul>

        <div class="socials">
          <span class="info__label muted">Мы в соцсетях</span>
          <div class="socials__links">
            <a v-for="social in socials" :key="social.label" :href="social.href" class="socials__link">
              {{ social.label }}
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.contacts__head {
  max-width: 55ch;
  margin-bottom: 2rem;
}
.contacts__title {
  font-size: clamp(1.9rem, 5vw, 2.8rem);
  margin: 0.35rem 0 0.6rem;
}

.contacts__grid {
  display: grid;
  gap: 1.5rem;
}

/* --- Форма --- */
.form-card {
  padding: 1.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.field {
  margin-bottom: 1.1rem;
}
.field__label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.4rem;
  font-size: 0.92rem;
}
.field__label span {
  color: var(--accent);
}
.field__input {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg);
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color var(--transition);
}
.field__input::placeholder {
  color: var(--muted);
}
.field__input:focus {
  outline: none;
  border-color: var(--accent);
}
.field__textarea {
  resize: vertical;
  min-height: 120px;
}
.field__input--error {
  border-color: var(--danger);
}
.field__error {
  margin-top: 0.35rem;
  color: var(--danger);
  font-size: 0.85rem;
}
.form__note {
  margin-top: 0.75rem;
  font-size: 0.82rem;
}

/* --- Успех --- */
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  padding: 1.5rem 0.5rem;
}
.success__icon {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: #10140f;
  background: var(--success);
  margin-bottom: 0.5rem;
}
.success__title {
  font-size: 1.4rem;
}

/* --- Инфо --- */
.info__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.info__item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}
.info__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  color: var(--accent);
  background: var(--accent-soft);
}
.info__label {
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.info__value {
  display: block;
  font-weight: 500;
}

.socials {
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}
.socials__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.6rem 0;
}
.socials__link {
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 500;
  transition:
    color var(--transition),
    border-color var(--transition);
}
.socials__link:hover {
  color: var(--accent);
  border-color: var(--accent);
}
@media (min-width: 900px) {
  .contacts__grid {
    grid-template-columns: 1.2fr 1fr;
    gap: 2.5rem;
    align-items: start;
  }
}
</style>
