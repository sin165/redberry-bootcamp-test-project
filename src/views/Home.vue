<template>
  <Header>
    <div class="buttons">
      <button v-if="!loggedIn" @click="$emit('loginClick')">შესვლა</button>
      <router-link v-if="loggedIn" :to="{ name: 'Add' }"><button>დაამატე ბლოგი</button></router-link>
      <button v-if="loggedIn" @click="$emit('logoutClick')">გასვლა</button>
    </div>
  </Header>
  <div class="home">
    <main>
      <Top />
      <div class="categories">
        <button v-for="cat in categoriesData" :key="cat.id"
        :style="{ color: cat.text_color, background: cat.background_color }"
        class="category" @click="toggleCategory(cat.id)"
        :class="{ selected: selectedCategories.includes(cat.id) }">
          {{ cat.title }}
        </button>
      </div>
      <div class="blogs">
        <BlogCard class="card" v-for="blog in filteredBlogs" :key="blog.id" :blog="blog"></BlogCard>
      </div>
    </main>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import Header from '../components/Header.vue'
import Top from '../components/Top.vue'
import BlogCard from '../components/BlogCard.vue'
import getCategories from '../composables/getCategories'
import getBlogs from '../composables/getBlogs.js'
import filterBlogs from '../composables/filterBlogs.js'

export default {
  name: 'Home',
  components: {
    Header,
    Top,
    BlogCard,
  },
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  setup() {
    onMounted(() => {
      if(localStorage.getItem('selectedCategories')) {
        selectedCategories.value = localStorage.getItem('selectedCategories').split(',').map(x => +x)
      }
    })

    const { categoriesData, categoriesError, loadCategories } = getCategories()
    const { blogs, error, loadBlogs } = getBlogs()
    loadCategories()
    loadBlogs()

    const selectedCategories = ref([])
    const toggleCategory = id => {
      if(selectedCategories.value.includes(id)) {
        selectedCategories.value = selectedCategories.value.filter(el => el !== id)
      } else {
        selectedCategories.value.push(id)
      }
      localStorage.setItem('selectedCategories', selectedCategories.value)
    }

    const filteredBlogs = computed(() => filterBlogs(blogs.value, selectedCategories.value))

    return { filteredBlogs, error, categoriesData, categoriesError, selectedCategories, toggleCategory }
  },
}
</script>

<style>
.home {
  display: flex;
  justify-content: center;
}
.categories {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 64px;
  overflow-x: scroll;
  white-space: nowrap;
}
button.category {
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 12px;
  line-height: 16px;
  box-sizing: border-box;
  border: 1px solid #00000000;
}
button.category.selected {
  border: 1px solid #000000;
}
.blogs {
  display: flex;
  flex-wrap: wrap;
  gap: 56px 32px;
  margin-bottom: 66px;
}
</style>
