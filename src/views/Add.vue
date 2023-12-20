<template>
  <Header :centered="true"></Header>
  <router-link :to="{ name: 'Home' }">back</router-link>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue'

export default {
  name: 'Add',
  components: {
    Header,
  },
  emits: ['loginClick'],
  setup() {
    onMounted(() => document.body.className = 'add')
    onUnmounted(() => document.body.className = '')
  }
}
</script>

<style>
</style>
