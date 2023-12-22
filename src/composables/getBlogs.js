import { ref } from 'vue';

const getBlogs = () => {
  const blogs = ref([])
  const error = ref(null)

  const loadBlogs = async () => {
    const token = process.env.VUE_APP_TOKEN
    const url = process.env.VUE_APP_API_URL + 'blogs'
    try {
      let response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if(!response.ok) {
        throw Error('no data available')
      }
      const result = await response.json()
      blogs.value = result.data
      const now = Date.now()
      blogs.value.forEach(blog => {
        blog.timestamp = Date.parse(blog.publish_date)
      })
      blogs.value = blogs.value.filter(blog => blog.timestamp < now)
    }
    catch(err) {
      error.value = err.message
      console.log(error.value)
    }
  }

  return { blogs, error, loadBlogs }
}

export default getBlogs
