<template>
  <div class="form-card">
    <div class="header">
      <h1>MercApp</h1>
      <div>
        <input v-model="q" placeholder="Buscar..." class="search" />
      </div>
      <div>
        <select v-model="selectedCategory">
          <option value="">Todas</option>
          <option v-for="c in categories" :key="String(c.id)" :value="c.id">{{ c.name }}</option>
        </select>

      </div>
    </div>

    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Catálogo</h2>
        <router-link to="/product/new" class="btn secondary">Nuevo producto</router-link>
      </div>

      <div v-if="loading">Cargando...</div>
      <div v-else>
        <div v-if="filtered.length===0">No hay productos.</div>
        <div class="grid">
          <ProductCard v-for="p in filtered" :key="p.id" :product="p" @add="addToCart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../store/cart'
import { ref, computed, onMounted } from 'vue'

export default {
  components: { ProductCard },
  setup() {
    const { products, categories, loading, fetchAll } = useProducts()
    const cart = useCartStore()
    const q = ref('')
    const selectedCategory = ref('')

    onMounted(fetchAll)

    const filtered = computed(() => {
      return products.value.filter(p => {
        const matchesQ = q.value === '' || p.name.toLowerCase().includes(q.value.toLowerCase()) || (p.description || '').toLowerCase().includes(q.value.toLowerCase())
        const matchesCat = !selectedCategory.value || p.categoryId === selectedCategory.value
        return matchesQ && matchesCat
      })
    })

    function addToCart(prod) {
      cart.add(prod, 1)
      // notificación simple
      alert(`${prod.name} agregado al carrito`)
    }

    return { products, categories, loading, q, selectedCategory, filtered, addToCart, cartCount: computed(() => cart.items.length) }
  }
}
</script>
