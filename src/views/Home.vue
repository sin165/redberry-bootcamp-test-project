<template>
  <Header>
    <div class="buttons">
      <button>შესვლა</button>
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
  setup() {
  },
}
</script>

<style>
body {
  background-color: #F3F2FA;
}
.nav {
  justify-content: space-between;
}
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
