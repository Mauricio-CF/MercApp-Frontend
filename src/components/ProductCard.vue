<template>
  <div class="card">
    <img :src="product.image || placeholder" style="width:100%; height:140px; object-fit:inherit; border-radius:8px" />
    <h3>{{ product.name }}</h3>
    <p class="muted">{{ product.description }}</p>
    <p class="stock">Stock: {{ product.stock }}</p>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <strong>${{ Number(product.price).toFixed(2) }}</strong>
      <div>
        <button class="btn" @click="$emit('add', product)">Añadir</button>
        <router-link :to="`/product/${product.id}`" class="btn secondary">Ver</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: { product: { type: Object, required: true } },
  data(){ return { placeholder: 'https://placehold.co/400x300?text=Sin+imagen' } }
}
</script>
