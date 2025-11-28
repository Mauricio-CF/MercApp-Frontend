<template>
  <div class="container">
    <div class="card" >
      <h2 style="text-align: center;">{{ isEdit ? 'Editar producto' : 'Nuevo producto' }}</h2>

      <form @submit.prevent="save">
        <label>Nombre</label>
        <input v-model="form.name" required />

        <label>Descripción</label>
        <textarea v-model="form.description"></textarea>

        <label>Precio</label>
        <input type="number" v-model="form.price" min="0" step="0.01" required />

        <label>Stock</label>
        <input type="number" v-model="form.stock" min="0" required />

        <label>Categoría</label>
        <select v-model="form.categoryId" required>
          <option v-for="c in categories" :value="c.id" :key="c.id">
            {{ c.name }}
          </option>
        </select>

        <label>Imagen (URL)</label>
        <input v-model="form.image" placeholder="https://..." />

        <button class="btn" type="submit">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProducts } from "../composables/useProducts";

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { categories, fetchAll, create, update, getById } = useProducts()

    const isEdit = route.params.id !== undefined

    const form = ref({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      image: "",
    })

    onMounted(async () => {
      await fetchAll() 
      if (isEdit) {
        const data = await getById(route.params.id)
        form.value = data
      }
    })

    async function save() {
      if (isEdit) await update(route.params.id, form.value)
      else await create(form.value)

      alert("Guardado correctamente.")
      router.push("/")
    }

    return { form, categories, isEdit, save }
  }
}
</script>
