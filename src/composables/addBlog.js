import { ref } from 'vue';

const addBlog = () => {
  const title = ref(localStorage.getItem('title') ?? '')
  const description = ref(localStorage.getItem('description') ?? '')
  const image = ref(null)
  const author = ref(localStorage.getItem('author') ?? '')
  const publish_date = ref(localStorage.getItem('publish_date') ?? null)
  const categories = ref(localStorage.getItem('categories') ? localStorage.getItem('categories').split(',').map(x => +x) : [])
  const email = ref(localStorage.getItem('email') ?? '')
  const errors = ref({})
  const success = ref(false)

  const send = async () => {
    const token = process.env.VUE_APP_TOKEN
    const url = process.env.VUE_APP_API_URL + 'blogs'

    let formData = new FormData()
    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('image', image.value)
    formData.append('author', author.value)
    formData.append('publish_date', publish_date.value)
    formData.append('categories', '[' + categories.value.toString() + ']')
    formData.append('email', email.value)

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData
    }

    try {
      let response = await fetch(url, options)

      if(response.status != 204) {
        throw Error('ბლოგის დამატება ვერ მოხერხდა')
      }
      success.value = true
    }
    catch(err) {
      errors.value.general = err.message
      console.log(errors.value.general)
    }
  }

  const clearForm = () => {
    title.value = ''
    description.value = ''
    image.value = null
    author.value = ''
    publish_date.value = ''
    categories.value = []
    email.value = ''
    errors.value = {}
  }

  return { title, description, image, author, publish_date, categories, email, errors, success, send, clearForm }
}

export default addBlog
