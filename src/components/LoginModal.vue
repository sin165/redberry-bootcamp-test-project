<template>
  <div class="backdrop">
    <form class="modal">
      <h2>შესვლა</h2>
      <label for="email">ელ-ფოსტა</label>
      <input type="email" name="email" placeholder="example@redberry.ge" @focus="error = ''" v-model="email" :class="{ red: error }">
      <div class="error" v-if="error">
        <img src="../assets/info-circle.svg" alt="">
        <span>{{ error }}</span>
      </div>
      <button @click.prevent="submit">შესვლა</button>
      <div class="close" @click="$emit('modalClose')">&#10005;</div>
    </form>
  </div>
</template>

<script>
import login from '../composables/login.js'

export default {
  name: 'LoginModal',
  emits: [ 'modalClose', 'loginSuccessful' ],
  setup(props, context) {
    const { email, error, submit } = login(context)

    return { email, error, submit }
  },
}
</script>

<style>
.backdrop {
  top: 0;
  position: fixed;
  background-color: #1a1a1f3d;
  width: 100%;
  height: 100%;
}
.modal {
  box-sizing: border-box;
  width: 480px;
  border-radius: 12px;
  background-color: #FFFFFF;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 24px;
  color: #1A1A1F;
}
.modal h2 {
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 32px;
}
.modal label {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.modal input {
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
.modal input:focus {
  outline: none;
  border-width: 2px;
}
.modal input.red {
  background-color: #FAF2F3;
  border: 1px solid #EA1919;
}
.modal .error {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  color: #EA1919;
  font-size: 12px;
  line-height: 20px;
}
.modal button {
width: 100%;
margin-top: 24px;
}
.modal .close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  font-size: 24px;
  cursor: pointer;
}
</style>
