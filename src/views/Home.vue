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
        >
          {{ cat.title }}
        </button>
      </div>
      <div v-if="blogs">
        {{ blogs }}
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Top from '../components/Top.vue'
import getCategories from '../composables/getCategories'
import getBlogs from '../composables/getBlogs.js'

export default {
  name: 'Home',
  components: {
    Header,
    Top,
  },
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  setup() {
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
    }

    return { blogs, error, categoriesData, categoriesError, selectedCategories, toggleCategory }
  },
}
</script>

<style>
.home {
  display: flex;
  justify-content: center;
}
main {
  width: 1288px;
  height: 100%;
  margin: 0 76px;
}
.categories {
  display: flex;
  gap: 12px 24px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 64px;
}
button.category {
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 12px;
  line-height: 16px;
}
</style>
