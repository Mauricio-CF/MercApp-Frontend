import { createRouter, createWebHistory } from 'vue-router'


const HomeView = () => import('../views/HomeView.vue')
const ProductDetail = () => import('../views/ProductDetail.vue')
const CartView = () => import('../views/CartView.vue')
const ProductForm = () => import('../views/ProductForm.vue')


const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/product/new', name: 'product-new', component: ProductForm },
  { path: '/product/:id', name: 'product-detail', component: ProductDetail, props: true },
  { path: '/product/:id/edit', name: 'product-edit', component: ProductForm, props: true },
  { path: '/cart', name: 'cart', component: CartView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
