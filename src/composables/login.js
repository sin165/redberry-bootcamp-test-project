import { ref } from 'vue';

const login = (context) => {
  const email = ref('')
  const error = ref('')
  const success = ref(false)

  const submit = async () => {
    const token = process.env.VUE_APP_TOKEN
    const url = process.env.VUE_APP_API_URL + 'login'

    if(!/^[a-zA-Z0-9._%+-]+@redberry\.ge$/.test(email.value)) {
      error.value = 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით'
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
        success.value = true
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }
  }

  return { email, error, success, submit }
}

export default login
