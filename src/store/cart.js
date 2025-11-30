// store/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('mercapp_cart') || '[]'))

  function save() { localStorage.setItem('mercapp_cart', JSON.stringify(items.value)) }

  function add(product, qty = 1) {
    const idx = items.value.findIndex(i => i._id === product._id)
    if (idx === -1) items.value.push({ ...product, qty })
    else items.value[idx].qty += qty
    save()
  }
  function remove(productId) {
  const idx = items.value.findIndex(i => i._id === productId);
  if (idx !== -1) {
    items.value.splice(idx, 1); // Reactividad inmediata
    save();
  }
}
  function setQty(productId, qty) {
    const idx = items.value.findIndex(i => i._id === productId)
    if (idx !== -1) items.value[idx].qty = qty
    save()
  }
  const total = computed(() => items.value.reduce((s, i) => s + i.qty * Number(i.price), 0))
  function clear() { items.value = []; save() }

  return { items, add, remove, setQty, total, clear }
})
