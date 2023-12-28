<template>
  <router-view @loginClick="toggleModal" @logoutClick="logout" :loggedIn="loggedIn" :key="$route.fullPath" />
  <LoginModal v-if="modalVisible" @modalClose="toggleModal" @loginSuccessful="loggedIn = true" />
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import LoginModal from './components/LoginModal.vue'

export default {
  name: 'App',
  components: {
    LoginModal,
  },
  setup() {
    const loggedIn = ref(!!localStorage.getItem('loggedInEmail'))
    const modalVisible = ref(false)
    const router = useRouter()
    const toggleModal = () => {
      modalVisible.value = !modalVisible.value
      if(loggedIn.value) {
        router.push({ name: 'Home' })
      }
    }
    const logout = () => {
      localStorage.clear()
      loggedIn.value = false
    }

    return { loggedIn, modalVisible, toggleModal, logout }
  }
}
</script>
