<template>
  <Header>
    <div class="buttons">
      <button v-if="!loggedIn" @click="$emit('loginClick')">შესვლა</button>
      <router-link v-if="loggedIn" :to="{ name: 'Add' }"><button>დაამატე ბლოგი</button></router-link>
      <button v-if="loggedIn" @click="$emit('logoutClick')">გასვლა</button>
    </div>
  </Header>
  <div class="blog-details">
    <main>
      <router-link class="back" :to="{ name: 'Home' }">
        <img src="../assets/back.svg" alt="back">
      </router-link>
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
.blog-details {
  display: flex;
  justify-content: center;
}
.blog-details main {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.blog-details .back {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
