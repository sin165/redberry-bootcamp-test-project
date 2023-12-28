<template>
  <Header :centered="true"></Header>
  <div class="add-blog">
    <div class="back-container">
      <router-link class="back" :to="{ name: 'Home' }">
        <div><img src="../assets/back.svg" alt="back"></div>
      </router-link>
    </div>
    <main>
      <form v-if="loggedIn">
        <h1>ბლოგის დამატება</h1>
        <SelectImage :image="image" :errors="errors" @setImage="setImage" @setImageError="setImageError" />
        <div class="container">
          <div class="field">
            <label for="author">ავტორი *</label>
            <input id="author" type="text" v-model="author" placeholder="შეიყვანეთ ავტორი"
            :class="{ green: author && !errors.author?.symbols && !errors.author?.words && !errors.author?.language,
            red: author && (errors.author?.symbols || errors.author?.words || errors.author?.language) }" >
            <ul>
              <li :class="{ green: author && !errors.author?.symbols, red: author && errors.author?.symbols }">მინიმუმ 4 სიმბოლო</li>
              <li :class="{ green: author && !errors.author?.words, red: author && errors.author?.words }">მინიმუმ 2 სიტყვა</li>
              <li :class="{ green: author && !errors.author?.language, red: author && errors.author?.language }">მხოლოდ ქართული სიმბოლოები</li>
            </ul>
          </div>
          <div class="field">
            <label for="title">სათაური *</label>
            <input id="title" type="text" v-model="title" placeholder="შეიყვანეთ სათაური"
            :class="{green: title && !errors.title, red: title && errors.title}">
            <p :class="{ green: title && !errors.title, red: title && errors.title }">მინიმუმ 2 სიმბოლო</p>
          </div>
        </div>
        <div class="field description">
          <label for="description">აღწერა *</label>
          <textarea id="description" v-model="description" placeholder="შეიყვანეთ აღწერა"
          :class="{ green: description && !errors.description, red: description && errors.description }"></textarea>
          <p :class="{ green: description && !errors.description, red: description && errors.description }">მინიმუმ 2 სიმბოლო</p>
        </div>
        <div class="container">
          <div class="field">
            <label for="date">გამოქვეყნების თარიღი *</label>
            <input id="date" type="date" v-model="publish_date" :class="{ green: publish_date, red: !publish_date }">
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
          <input id="email" type="email" v-model="email" placeholder="Example@redberry.ge"
          :class="{ green: email && !errors.email, red: errors.email }">
          <p v-if="errors.email" class="red">
            <img src="../assets/info-circle.svg" alt="">
            <span>მეილი უნდა მთავრდებოდეს @redberry.ge-ით</span>
          </p>
        </div>
        <div class="submit">
          <button :class="{ gray: !valid }" type="submit" @click.prevent="handleSubmit">გამოქვეყნება</button>
        </div>
      </form>
      <p v-else>თქვენ არ გაქვთ ამ გვერდის ნახვის უფლება</p>
    </main>
    <AddBlogSuccess v-if="success" @close="closeSuccessModal"></AddBlogSuccess>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import Header from '../components/Header.vue'
import SelectImage from '../components/form/SelectImage.vue'
import SelectCategories from '../components/form/SelectCategories.vue'
import AddBlogSuccess from '../components/form/AddBlogSuccess.vue'
import addBlog from '../composables/addBlog.js'
import getCategories from '../composables/getCategories.js'
import inputsFromLocal from '../composables/inputsFromLocal.js'
import watchers from '../composables/watchers.js'

export default {
  name: 'Add',
  components: {
    Header,
    SelectImage,
    SelectCategories,
    AddBlogSuccess,
},
  props: [ 'loggedIn' ],
  emits: [ 'loginClick', 'logoutClick' ],
  setup() {
    onMounted(() => {
      document.body.className = 'add'
      inputsFromLocal(image, title, description, author, publish_date, categories, email)
    })
    onUnmounted(() => document.body.className = '')
    
    const { categoriesData, categoriesError, loadCategories } = getCategories()
    loadCategories()
    const { title, description, image, author, publish_date, categories, email, errors, success, send, clearForm } = addBlog()
    const setImage = img => { image.value = img }
    const setImageError = err => { errors.value.image = err }
    const closeSuccessModal = () => {
      clearForm()
      success.value = false
    }
    
    const { watchTitle, watchDescription, watchAuthor, watchPublishDate, watchCategories, watchEmail } = watchers(errors)
    watch(title, () => watchTitle(title.value))
    watch(description, () => watchDescription(description.value))
    watch(author, () => watchAuthor(author.value))
    watch(publish_date, () => watchPublishDate(publish_date.value))
    watch(categories, () => watchCategories(categories.value))
    watch(email, () => watchEmail(email.value))

    const valid = computed(() => {
      if(!image.value) return false
      if(!author.value || errors.value.author.symbols || errors.value.author.words || errors.value.author.language) return false
      if(!title.value || errors.value.title) return false
      if(!description.value || errors.value.description) return false
      if(!publish_date.value || errors.value.publish_date) return false
      if(categories.value.length === 0) return false
      if(errors.value.email) return false
      return true
    })
    const handleSubmit = () => {
      if(valid.value) {
        send()
      }
    }

    return {
      categoriesData, categoriesError,
      title, description, image, author, publish_date,
      categories, email, errors, success, handleSubmit,
      setImage, setImageError, closeSuccessModal,
      valid,
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
  outline: none;
}
.add-blog textarea {
  height: 124px;
  display: block;
  resize: vertical;
  font-family: inherit;
}
.add-blog input:focus,
.add-blog textarea:focus {
  border: 1.5px solid #5D37F3;
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
.add-blog p.red,
.add-blog li.red {
  color: #EA1919;
}
.add-blog p.green,
.add-blog li.green {
  color: #14D81C;
}
.add-blog input.red,
.add-blog textarea.red {
  border: 1px solid #EA1919;
  background-color: #FAF2F3;
}
.add-blog input.green,
.add-blog textarea.green {
  border: 1px solid #14D81C;
  background-color: #F8FFF8;
}
#email + p {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
</style>
