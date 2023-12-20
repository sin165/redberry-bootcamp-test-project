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
      <button @click="loadBlogs">load blogs</button>
      <div v-if="blogs">
        {{ blogs }}
      </div>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Top from '../components/Top.vue'
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
    const { blogs, error, loadBlogs } = getBlogs()

    return { blogs, error, loadBlogs}
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
</style>
