import { ref } from 'vue';

const login = (context) => {
  const email = ref('')
  const error = ref('')

  const submit = async () => {
    const token = process.env.VUE_APP_TOKEN
    const url = process.env.VUE_APP_API_URL + 'login'

    if(!email.value.endsWith('@redberry.ge')) {
      error.value = 'ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-ზე'
    } else {
      error.value = ''
      const formData = new FormData()
      formData.append('email', email.value)
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: formData,
      }

      try {
        let response = await fetch(url, options)
        if(response.status != 204) {
          throw Error('ელ-ფოსტა არ მოიძებნა')
        }
        localStorage.setItem('loggedInEmail', email.value)
        context.emit('loginSuccessful', email.value)
        context.emit('modalClose')
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }
  }

  return { email, error, submit }
}

export default login
