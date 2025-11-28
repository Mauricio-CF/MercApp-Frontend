
import { ref } from 'vue'
import axios from 'axios'
const api = import.meta.env.VITE_API_URL;


export function useApi(baseUrl) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)


  async function get(path = '', opts = {}) {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`${baseUrl}${path}`, opts)
      data.value = res.data
      loading.value = false
      return res.data
    } catch (err) {

      try {
        const res = await axios.get(`${baseUrl}${path}`, opts)
        data.value = res.data
        loading.value = false
        return res.data
      } catch (err2) {
        error.value = err2.response?.data || err2.message
        loading.value = false
        throw err2
      }
    }
  }

  return { data, loading, error, get }
}
