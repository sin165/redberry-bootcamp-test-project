import { ref } from 'vue';

const getBlogs = () => {
  const blogs = ref([])
  const error = ref(null)

  const loadBlogs = async () => {
    const token = process.env.VUE_APP_TOKEN
    const url = process.env.VUE_APP_API_URL + 'blogs'
    try {
      let data = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if(!data.ok) {
        throw Error('no data available')
      }
      blogs.value = await data.json()
    }
    catch(err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { blogs, error, loadBlogs }
}

export default getBlogs
