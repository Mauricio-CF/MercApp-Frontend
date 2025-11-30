<template>
  <div class="container" v-if="product">
    <div class="card">
      <h2>{{ product.name }}</h2>

      <img :src="product.image || placeholder" class="big-img" />

      <p><strong>Descripción:</strong> {{ product.description }}</p>

      <p class="category">
        <strong>Categoría:</strong> {{ categoryName }}
      </p>

      <p><strong>Precio:</strong> ${{ product.price.toFixed(2) }}</p>
      <p><strong>Stock:</strong> {{ product.stock }}</p>

      <div class="buttons">
        <router-link
          :to="`/product/${product._id}/edit`"
          class="btn secondary"
        >
          Editar
        </router-link>

        <button @click="addToCart" class="btn">Agregar al carrito</button>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <p>Cargando producto...</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useProducts } from "../composables/useProducts";
import { useCartStore } from "../store/cart";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const cart = useCartStore();
    const { getById, categories, fetchAll } = useProducts();

    const product = ref(null);
    const categoryName = ref("");
    const placeholder = "https://placehold.co/400x300?text=Sin+Imagen";

    onMounted(async () => {
      await fetchAll();
      product.value = await getById(route.params.id);

      const catId =
        typeof product.value.category === "object"
          ? product.value.category._id
          : product.value.category;

      const cat = categories.value.find((c) => c._id === catId);
      categoryName.value = cat ? cat.name : "Sin categoría";
    });

    function addToCart() {
      cart.add(product.value, 1);
      alert("Producto agregado.");
    }

    return { product, categoryName, placeholder, addToCart };
  },
};
</script>
