import { createRouter, createWebHashHistory } from 'vue-router'


const HomeView = () => import('../views/HomeView.vue')
const CatalogView = () => import('../views/CatalogView.vue')
const AlbumView = () => import('../views/AlbumView.vue')
const AboutView = () => import('../views/AboutView.vue')
const ContactsView = () => import('../views/ContactsView.vue')
const CartView = () => import('../views/CartView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const router = createRouter({

  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Главная' } },
    { path: '/catalog', name: 'catalog', component: CatalogView, meta: { title: 'Каталог' } },
    {
      path: '/album/:id',
      name: 'album',
      component: AlbumView,
      props: true,
      meta: { title: 'Альбом' },
    },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'О магазине' } },
    { path: '/contacts', name: 'contacts', component: ContactsView, meta: { title: 'Контакты' } },
    { path: '/cart', name: 'cart', component: CartView, meta: { title: 'Корзина' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: 'Страница не найдена' } },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

const BASE_TITLE = 'Обо́рот'
router.afterEach((to) => {
  const pageTitle = to.meta?.title
  document.title = pageTitle ? `${pageTitle} — ${BASE_TITLE}` : BASE_TITLE
})

export default router
