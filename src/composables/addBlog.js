import { ref } from 'vue';

const addBlog = () => {
  const title = ref('')
  const description = ref('')
  const image = ref(null)
  const author = ref('')
  const publish_date = ref(null)
  const categories = ref([])
  const email = ref('')
  const errors = ref({})

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
    }
    catch(err) {
      errors.value.general = err.message
      console.log(errors.value.general)
    }
  }

  return { title, description, image, author, publish_date, categories, email, errors, send }
}

export default addBlog
