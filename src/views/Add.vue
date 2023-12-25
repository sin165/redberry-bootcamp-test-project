<template>
  <Header :centered="true"></Header>
  <div class="add-blog">
    <div class="back-container">
      <router-link class="back" :to="{ name: 'Home' }">
        <div><img src="../assets/back.svg" alt="back"></div>
      </router-link>
    </div>
    <main>
      <form>
        <h1>ბლოგის დამატება</h1>
        <SelectImage :image="image" :errors="errors" @setImage="setImage" @setImageError="setImageError" />
        <div class="container">
          <div class="field">
            <label for="author">ავტორი *</label>
            <input id="author" type="text" v-model="author" placeholder="შეიყვანეთ ავტორი">
            <ul>
              <li>მინიმუმ 4 სიმბოლო</li>
              <li>მინიმუმ 2 სიტყვა</li>
              <li>მხოლოდ ქართული სიმბოლოები</li>
            </ul>
          </div>
          <div class="field">
            <label for="title">სათაური *</label>
            <input id="title" type="text" v-model="title" placeholder="შეიყვანეთ სათაური">
            <p>მინიმუმ 2 სიმბოლო</p>
          </div>
        </div>
        <div class="field description">
          <label for="description">აღწერა *</label>
          <textarea id="description" v-model="description" placeholder="შეიყვანეთ აღწერა"></textarea>
          <p>მინიმუმ 2 სიმბოლო</p>
        </div>
        <div class="container">
          <div class="field">
            <label for="date">გამოქვეყნების თარიღი *</label>
            <input id="date" type="date" v-model="publish_date">
          </div>
          <div class="field">
            <label>კატეგორია *</label>
            <SelectCategories :categories="categories" :categoriesData="categoriesData"/>
            <div hidden>
              <input type="checkbox" v-for="cat in categoriesData" :key="cat.id" 
              :value="cat.id" v-model="categories" :id="cat.id">
            </div>
          </div>
        </div>
        <div class="field">
          <label for="email">ელ-ფოსტა</label>
          <input id="email" type="email" v-model="email" placeholder="Example@redberry.ge">
        </div>
        <div class="submit">
          <button class="gray" type="submit" @click.prevent="send">გამოქვეყნება</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue'
import SelectImage from '../components/form/SelectImage.vue'
import SelectCategories from '../components/form/SelectCategories.vue'
import addBlog from '../composables/addBlog.js'
import getCategories from '../composables/getCategories.js'
import imageFromLocal from '../composables/imageFromLocal.js'

export default {
  name: 'Add',
  components: {
    Header,
    SelectImage,
    SelectCategories,
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
.add-blog .back {
  background-color: #E4E3EB;
}
.add-blog form {
  width: 600px;
  margin-bottom: 65px;
}
.add-blog h1 {
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  color: #1A1A1F;
  margin: 0 0 40px 0;
}
.add-blog .container {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}
.add-blog .field {
  margin-bottom: 24px;
  width: 288px;
}
.add-blog .field.description {
  width: 100%;
}
.add-blog label {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #1A1A1F;
  margin-bottom: 8px;
  display: block;
}
.add-blog input,
.add-blog textarea,
.add-blog .category-select {
  box-sizing: border-box;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #E4E3EB;
  background-color: #FCFCFD;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #1A1A1F;
  height: 44px;
}
.add-blog input,
.add-blog textarea {
  padding: 12px 16px;
}
.add-blog textarea {
  height: 124px;
  display: block;
  resize: vertical;
}
.add-blog ul {
 margin: 8px 0 0 0;
 padding: 0;
 list-style-position: inside;
}
.add-blog li,
.add-blog p {
  color: #85858D;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  margin: 0;
}
.add-blog p {
  margin-top: 8px;
}
.add-blog .submit {
  display: flex;
  flex-direction: row-reverse;
}
.add-blog .submit button {
  width: 288px;
}
.add-blog .submit button.gray {
  background-color: #E4E3EB;
  cursor: default;
}
</style>
