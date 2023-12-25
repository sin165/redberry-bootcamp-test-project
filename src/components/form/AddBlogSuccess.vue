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

    const clearLocalStorage = () => {
      localStorage.removeItem('title')
      localStorage.removeItem('description')
      localStorage.removeItem('author')
      localStorage.removeItem('publish_date')
      localStorage.removeItem('categories')
      localStorage.removeItem('email')
      localStorage.removeItem('image')
      localStorage.removeItem('imageName')
    }

    const goHome = () => {
      clearLocalStorage()
      router.push({ name: 'Home' })
    }

    const close = () => {
      clearLocalStorage()
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
