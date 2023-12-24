<template>
  <Header>
    <div class="buttons">
      <button v-if="!loggedIn" @click="$emit('loginClick')">შესვლა</button>
      <router-link v-if="loggedIn" :to="{ name: 'Add' }"><button>დაამატე ბლოგი</button></router-link>
      <button v-if="loggedIn" @click="$emit('logoutClick')">გასვლა</button>
    </div>
  </Header>
  <div class="blog-details">
    <div class="back-container">
      <router-link class="back" :to="{ name: 'Home' }">
        <div><img src="../assets/back.svg" alt="back"></div>
      </router-link>
    </div>
    <main>
      <BlogCard v-if="blog" class="full" :blog="blog"/>
    </main>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import BlogCard from '../components/BlogCard.vue';
import getBlog from '../composables/getBlog.js'

export default {
  name: 'BlogDetails',
  components: {
    Header,
    BlogCard,
  },
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  setup() {
    const route = useRoute()
    const { blog, error, loadBlog } = getBlog()
    loadBlog(route.params.id)

    return { blog, error }
  }
}
</script>

<style>
</style>
