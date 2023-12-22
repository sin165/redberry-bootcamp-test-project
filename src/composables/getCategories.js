import { ref } from 'vue';

const getCategories = () => {
  const categoriesData = ref([])
  const categoriesError = ref(null)

  const loadCategories = async () => {
    const url = process.env.VUE_APP_API_URL + 'categories'
    try {
      const response = await fetch(url)
      if(!response.ok) {
        throw Error('no data available')
      }
      const result = await response.json()
      categoriesData.value = result.data
    }
    catch(err) {
      categoriesError.value = err.message
      console.log(categoriesError.value)
    }
  }

  return { categoriesData, categoriesError, loadCategories }
}

export default getCategories
