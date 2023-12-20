<template>
  <router-view @loginClick="toggleModal" />
  <LoginModal v-if="modalVisible" @modalClose="toggleModal" />
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
    const modalVisible = ref(false)
    const toggleModal = () => {
      modalVisible.value = !modalVisible.value
    }

    return { modalVisible, toggleModal }
  }
}
</script>

<style>
@import url('https://free.bboxtype.com/embedfonts/?family=FiraGO:400,500,700');
body {
  font-family: 'FiraGO', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #F3F2FA;
}
body.add {
  background-color: #FBFAFF;
}
button {
  height: 40px;
  background-color: #5D37F3;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
