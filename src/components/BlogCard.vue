<template>
  <div class="blog">
    <img :src="blog.image" :alt="blog.title">
    <h3>{{ blog.author }}</h3>
    <h4>
      {{ formattedDate }}
      <span v-if="blog.email"> • {{ blog.email }}</span>
    </h4>
    <h2>{{ blog.title }}</h2>
    <div class="blog-categories">
      <div class="blog-category" v-for="cat in blog.categories" :style="{ color: cat.text_color, background: cat.background_color }">
        {{ cat.title }}
      </div>
    </div>
    <p>{{ blog.description }}</p>
    <router-link :to="{ name: 'BlogDetails', params: {id: blog.id} }">
      <span>სრულად ნახვა</span>
      <img src="../assets/arrow.svg" alt="">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogCard',
  props: [ 'blog' ],
  setup(props) {
    const timestamp = Date.parse(props.blog.publish_date)
    const date = new Date(timestamp);
    const formattedDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()

    return { formattedDate }
  }
}
</script>

<style>
.blog > img {
  height: 328px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}
.blog h2 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  color: #1A1A1F;
  margin: 0 0 16px 0;
}
.blog h3 {
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: #1A1A1F;
  margin: 24px 0 8px 0;
}
.blog h4 {
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #85858D;
  margin: 0 0 16px 0;
}
.blog p {
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
  color: #404049;
}
.blog-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.blog-category {
  padding: 6px 10px;
  border-radius: 30px;
  font-size: 12px;
  line-height: 16px;
}
.blog.card {
  width: 408px;
}
.blog.card p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.blog.card a {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #5D37F3;
  text-decoration: none;
  display: flex;
  gap: 4px;
}
.blog.card a img {
  width: 20px;
  height: 20px;
}
.blog.full {
  width: 720px;
  margin-bottom: 96px;
}
.blog.full h3 {
  margin: 40px 0 8px 0;
}
.blog.full h2 {
  margin: 0 0 24px 0;
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
}
.blog.full h4 {
  margin: 0 0 24px 0;
}
.blog.full p {
  margin: 40px 0 0 0;
}
.blog.full a {
  display: none;
}
</style>
