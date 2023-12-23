<template>
  <Header :centered="true"></Header>
  <div class="add-blog">
    <main>
      <router-link class="back" :to="{ name: 'Home' }">
        <img src="../assets/back.svg" alt="back">
      </router-link>
      <form>
        <h1>ბლოგის დამატება</h1>
        <SelectImage :image="image" :errors="errors" @setImage="setImage" @setImageError="setImageError" />
        <input type="text" v-model="author" placeholder="შეიყვანეთ ავტორი">
        <input type="text" v-model="title" placeholder="შეიყვანეთ სათაური">
        <textarea v-model="description" cols="30" rows="10" placeholder="შეიყვანეთ აღწერა"></textarea>
        <input type="date" v-model="publish_date">
        <div v-for="cat in categoriesData" :key="cat.id">
          <input type="checkbox" :value="cat.id" v-model="categories">
          <label>{{ cat.title }}</label>
        </div>
        <input type="email" v-model="email" placeholder="Example@redberry.ge">
        <button @click.prevent="send">გამოქვეყნება</button>
      </form>
    </main>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue'
import SelectImage from '../components/form/SelectImage.vue'
import addBlog from '../composables/addBlog.js'
import getCategories from '../composables/getCategories.js'
import imageFromLocal from '../composables/imageFromLocal.js'

export default {
  name: 'Add',
  components: {
    Header,
    SelectImage,
  },
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  setup() {
    onMounted(() => {
      document.body.className = 'add'
      if(localStorage.getItem('image')) {
        image.value = imageFromLocal()
      }
    })
    onUnmounted(() => document.body.className = '')

    const { categoriesData, categoriesError, loadCategories } = getCategories()
    loadCategories()

    const { title, description, image, author, publish_date, categories, email, errors, send } = addBlog()

    const setImage = img => {
      image.value = img
    }
    const setImageError = err => {
      errors.value.image = err
    }

    return {
      categoriesData, categoriesError,
      title, description, image, author, publish_date,
      categories, email, errors, send,
      setImage, setImageError,
    }
  }
}
</script>

<style>
.add-blog {
  display: flex;
  justify-content: center;
}
.add-blog main {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.add-blog .back {
  position: absolute;
  top: 0;
  left: 0;
}
.add-blog form {
  width: 600px;
}
.add-blog h1 {
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  color: #1A1A1F;
  margin: 0 0 40px 0;
}
/* .add-blog h1 + p {
  color: #1A1A1F;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  margin: 0 0 8px 0;
}
.drag-area {
  height: 180px;
  border-radius: 12px;
  background-color: #F4F3FF;
  border: 1px dashed #85858D;
  margin-bottom: 24px;
}
.drag-area img {
  display: block;
  margin: 48px auto 24px auto;
}
.drag-area p {
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #1A1A1F;
}
.drag-area p .choose {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
.drag-area p.error {
  color: #EA1919;
}
.file-input {
  display: none;
}
.chosen-image {
  border-radius: 12px;
  background-color: #F2F2FA;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 24px;
}
.chosen-image div {
  display: flex;
  align-items: center;
  gap: 12px;
}
.chosen-image img {
  display: block;
}
.chosen-image .delete {
  cursor: pointer;
} */
</style>
