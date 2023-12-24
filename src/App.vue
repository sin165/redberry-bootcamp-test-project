<template>
  <router-view @loginClick="toggleModal" @logoutClick="logout" :loggedIn="loggedIn" />
  <LoginModal v-if="modalVisible" @modalClose="toggleModal" @loginSuccessful="loggedIn = true" />
</template>

<script>
import { ref } from 'vue';
import LoginModal from './components/LoginModal.vue'

export default {
  name: 'App',
  components: {
    LoginModal,
  },
  setup() {
    const loggedIn = ref(!!localStorage.getItem('loggedInEmail'))
    const modalVisible = ref(false)
    const toggleModal = () => {
      modalVisible.value = !modalVisible.value
    }
    const logout = () => {
      localStorage.removeItem('loggedInEmail')
      loggedIn.value = false
    }

    return { loggedIn, modalVisible, toggleModal, logout }
  }
}
</script>
