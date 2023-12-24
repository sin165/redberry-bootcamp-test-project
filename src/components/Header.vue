<template>
  <header>
    <nav>
      <div class="nav" :class="{ centered: centered }">
        <router-link class="logo" :to="{ name: 'Home' }">
          <img src="../assets/logo.svg" alt="redberry logo">
        </router-link>
        <slot></slot>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: [ 'centered' ]
}
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
}
nav {
  height: 80px;
  width: 100%;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E4E3EB;
  display: flex;
  justify-content: center;
}
.nav {
  width: 1288px;
  height: 100%;
  margin: 0 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav.centered {
  justify-content: center;
}
.nav .buttons {
  display: flex;
  gap: 10px;
}
.nav a {
  text-decoration: none;
  display: block;
  color: #FFFFFF;
}
</style>
