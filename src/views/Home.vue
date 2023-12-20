<template>
  <Header>
    <div class="buttons">
      <button @click="$emit('loginClick')">შესვლა</button>
      <!-- <router-link :to="{ name: 'Add' }"><button>დაამატე ბლოგი</button></router-link> -->
    </div>
  </Header>
  <div class="home">
    <main>
      <Top />
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Top from '../components/Top.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Top,
  },
  emits: [ 'loginClick' ],
  setup() {
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
