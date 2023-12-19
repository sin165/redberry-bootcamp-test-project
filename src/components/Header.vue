<template>
  <nav>
    <div class="nav">
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
}
.nav .buttons {
  display: flex;
  gap: 10px;
}
.nav button {
  width: 93px;
  height: 40px;
  background-color: #5D37F3;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  padding: 10px, 20px, 10px, 20px;
  border-radius: 8px;
  border: none;
}
</style>
