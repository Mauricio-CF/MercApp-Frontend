<template>
  <div class="container">
    <h2>Carrito</h2>
    <div class="card">
      <div v-if="items.length===0">Carrito vacío</div>
      <div v-else>
        <div v-for="i in items" :key="i.id" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <strong>{{ i.name }}</strong><br/>
            <small>\${{ i.price }} x {{ i.qty }}</small>
          </div>
          <div>
            <input type="number" v-model.number="i.qty" @change="updateQty(i.id, i.qty)" style="width:70px" />
            <button class="btn secondary" @click="remove(i.id)">Quitar</button>
          </div>
        </div>
        <div style="text-align:right;">
          <strong>Total: \${{ total.toFixed(2) }}</strong><br/>
          <button class="btn" @click="checkout">Pagar (simulado)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../store/cart'
import { useRouter } from 'vue-router'
// Importar storeToRefs de Pinia
import { storeToRefs } from 'pinia' 

export default {
  setup() {
    const cart = useCartStore()
    const router = useRouter()

    // Usar storeToRefs para mantener la reactividad de items y total
    const { items, total } = storeToRefs(cart)

    function updateQty(id, qty) { 
     
      cart.setQty(id, Math.max(1, qty)) 
    }
    
    function remove(id) { cart.remove(id) }
    
    function checkout() { 
      alert('Pago simulado. Gracias!')
      cart.clear()
      router.push('/')
    }
    
    // Retornar las referencias reactivas y las funciones
    return { 
      items, 
      total, 
      updateQty, 
      remove, 
      checkout 
    }
  }
}
</script>
