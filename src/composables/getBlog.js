import { ref } from 'vue';

const getBlog = () => {
  const blog = ref(null)
  const error = ref(null)

  const loadBlog = async id => {
    const token = process.env.VUE_APP_TOKEN
    const url = process.env.VUE_APP_API_URL + 'blogs/' + id
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if(!response.ok) {
        throw Error('ბლოგი არ მოიძებნა')
      }
      const result = await response.json()
      if(Date.parse(result.publish_date) - 14400000 > Date.now()) {
        throw Error('ბლოგი არ მოიძებნა')
      }
      blog.value = result
    }
    catch(err) {
      error.value = err.message
      console.log(error.value)
    }
  }
  return { blog, error, loadBlog }
}

export default getBlog
