<template>
  <nav>
    <div class="nav" :class="{ centered: centered }">
      <div class="logo">
        <img src="../assets/logo.svg" alt="redberry logo">
      </div>
      <slot></slot>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: [ 'centered' ]
}
</script>

<style>
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
