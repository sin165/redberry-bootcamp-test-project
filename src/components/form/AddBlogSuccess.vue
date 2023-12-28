<template>
  <div class="backdrop" >
    <div class="modal">
      <img class="success" src="@/assets/tick.svg" alt="">
      <h3>ჩანაწერი წარმატებით დაემატა</h3>
      <button @click="goHome">მთავარ გვერდზე დაბრუნება</button>
      <div class="close" @click="close">
        <img src="@/assets/x.svg" alt="close">
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'AddBlogSuccess',
  emits: [ 'close' ],
  setup(props, context) {
    const router = useRouter()

    const goHome = () => {
      router.push({ name: 'Home' })
    }

    const close = () => {
      context.emit('close')
    }

    return { goHome, close }
  }
}
</script>

<style scoped>
button {
  width: 100%;
  margin-top: 24px;
}
</style>
