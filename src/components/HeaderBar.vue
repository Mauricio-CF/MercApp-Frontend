<template>
  <header class="topbar">
    <h1 class="logo">MercApp</h1>

    <nav>
      <router-link :to="'/'">Inicio</router-link>

      <!-- Mostrar cantidad de productos -->
      <router-link :to="'/cart'">
        Carrito ({{ cartCount }})
      </router-link>
    </nav>
  </header>
</template>

<script>
import { useCartStore } from '../store/cart'
import { computed } from 'vue'

export default {
  setup() {
    const cart = useCartStore()

    // cuenta total de items
    const cartCount = computed(() => cart.items.length)

    return { cartCount }
  }
}
</script>

<style>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #000;
  color: white;
}

nav a {
  margin-left: 1rem;
  color: #00d1b2;
  text-decoration: none;
  color: var(--accent);
}

select {
  background: #151515;
  color: var(--text);
  border: 1px solid #333;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

select:focus {
  border-color: #00d1b2;
}
</style>
