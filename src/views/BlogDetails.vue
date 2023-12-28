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
    <main v-if="!error">
      <BlogCard v-if="blog" class="full" :blog="blog"/>
      <Slider v-if="blog" :blogs="filteredBlogs" ></Slider>
    </main>
    <main v-else>
      <p class="not-found">404 - გვერდი არ მოიძებნა</p>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import BlogCard from '../components/BlogCard.vue'
import Slider from '../components/Slider.vue'
import getBlog from '../composables/getBlog.js'
import getBlogs from '../composables/getBlogs.js'
import filterBlogs from '../composables/filterBlogs.js'

export default {
  name: 'BlogDetails',
  components: {
    Header,
    BlogCard,
    Slider,
  },
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  setup() {
    const route = useRoute()
    const { blog, error, loadBlog } = getBlog()
    loadBlog(route.params.id)
    const { blogs, blogsError, loadBlogs } = getBlogs()
    loadBlogs()

    const filteredBlogs = computed(() => {
      const catIDs = blog.value ? blog.value.categories.map(cat => cat.id) : []
      return filterBlogs(blogs.value, catIDs).filter(blog => blog.id != route.params.id)
    })

    return { blog, filteredBlogs, error }
  }
}
</script>

<style>
.blog-details main {
  flex-direction: column;
  align-items: center;
}
.blog-details .not-found {
  color: #85858D;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}
</style>
