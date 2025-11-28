
import { ref } from 'vue'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export function useProducts() {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    loading.value = true
    try {
      const [pRes, cRes] = await Promise.all([
        axios.get(`${API}/products`),
        axios.get(`${API}/categories`)
      ])
      products.value = pRes.data
      categories.value = cRes.data
    } catch (err) {
      error.value = err.response?.data || err.message
    } finally {
      loading.value = false
    }
  }

  async function getById(id) {
    const res = await axios.get(`${API}/products/${id}`)
    return res.data
  }

  async function create(product) {
    const res = await axios.post(`${API}/products`, product)
    return res.data
  }
  async function update(id, payload) {
    const res = await axios.put(`${API}/products/${id}`, payload)
    return res.data
  }
  async function remove(id) {
    await axios.delete(`${API}/products/${id}`)
    return true
  }

  return { products, categories, loading, error, fetchAll, getById, create, update, remove }
}
