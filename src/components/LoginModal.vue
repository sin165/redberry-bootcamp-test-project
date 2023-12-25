<template>
  <div class="backdrop" @click.self="$emit('modalClose')">
    <form class="modal" v-if="!success">
      <h2>შესვლა</h2>
      <label for="email">ელ-ფოსტა</label>
      <input type="email" name="email" placeholder="example@redberry.ge" @focus="error = ''" v-model="email" :class="{ red: error }">
      <div class="error" v-if="error">
        <img src="../assets/info-circle.svg" alt="">
        <span>{{ error }}</span>
      </div>
      <button @click.prevent="submit">შესვლა</button>
      <div class="close" @click="$emit('modalClose')">
        <img src="../assets/x.svg" alt="close">
      </div>
    </form>
    <div class="modal" v-else>
      <img class="success" src="../assets/tick.svg" alt="">
      <h3>წარმატებული ავტორიზაცია</h3>
      <button @click="$emit('modalClose')">კარგი</button>
      <div class="close" @click="$emit('modalClose')">
        <img src="../assets/x.svg" alt="close">
      </div>
    </div>
  </div>
</template>

<script>
import login from '../composables/login.js'

export default {
  name: 'LoginModal',
  emits: [ 'modalClose', 'loginSuccessful' ],
  setup(props, context) {
    const { email, error, success, submit } = login(context)

    return { email, error, success, submit }
  },
}
</script>

<style scoped>
h2 {
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 32px;
}
label {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
input {
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  border-radius: 12px;
  margin-top: 8px;
  padding: 12px 16px;
  background-color: #F7F7FF;
  border: 1px solid #5D37F3;
  font-size: 14px;
}
input:focus {
  outline: none;
  border-width: 2px;
}
input.red {
  background-color: #FAF2F3;
  border: 1px solid #EA1919;
}
.error {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  color: #EA1919;
  font-size: 12px;
  line-height: 20px;
}
button {
width: 100%;
margin-top: 24px;
}
</style>
