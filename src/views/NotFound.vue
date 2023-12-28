<template>
  <Header :centered="true"></Header>
  <div class="add-blog">
    <div class="back-container">
      <router-link class="back" :to="{ name: 'Home' }">
        <div><img src="../assets/back.svg" alt="back"></div>
      </router-link>
    </div>
    <main>
      <p>404 - გვერდი არ მოიძებნა</p>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'NotFound',
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  components: {
    Header,
  }
  
}
</script>
