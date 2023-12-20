<template>
  <Header :centered="true"></Header>
  <router-link :to="{ name: 'Home' }">back</router-link>
  <form>
    <h1>ბლოგის დამატება</h1>
    <input type="file" @change="handleFileInputChange">
    <input type="text" v-model="author" placeholder="შეიყვანეთ ავტორი">
    <input type="text" v-model="title" placeholder="შეიყვანეთ სათაური">
    <textarea v-model="description" cols="30" rows="10" placeholder="შეიყვანეთ აღწერა"></textarea>
    <input type="date" v-model="publish_date">
    <div v-for="cat in categoriesData" :key="cat.id">
      <input type="checkbox" :value="cat.id" v-model="categories">
      <label>{{ cat.title }}</label>
    </div>
    <input type="email" v-model="email" placeholder="Example@redberry.ge">
    <button @click.prevent="send">გამოქვეყნება</button>
  </form>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue'
import addBlog from '../composables/addBlog.js'
import getCategories from '../composables/getCategories.js'

export default {
  name: 'Add',
  components: {
    Header,
  },
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  setup() {
    onMounted(() => document.body.className = 'add')
    onUnmounted(() => document.body.className = '')

    const handleFileInputChange = e => {
      image.value = e.target.files[0]
    }

    const { categoriesData, categoriesError, loadCategories } = getCategories()
    loadCategories()

    const { title, description, image, author, publish_date, categories, email, error, send } = addBlog()

    return {
      categoriesData, categoriesError,
      title, description, image, author, publish_date,
      categories, email, error, send,
      handleFileInputChange
    }
  }
}
</script>

<style>
</style>
