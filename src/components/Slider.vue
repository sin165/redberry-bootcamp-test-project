<template>
  <section class="slider">
    <div class="slider-top">
      <h2>მსგავსი სტატიები</h2>
      <div class="buttons">
        <div class="slider-btn previous" @click="previous" :class="{disabled: index == 0}">
          <img src="../assets/slide.svg" alt="previous">
        </div>
        <div class="slider-btn" @click="next" :class="{disabled: blogs.length - index <= 3}">
          <img src="../assets/slide.svg" alt="next">
        </div>
      </div>
    </div>
    <div class="slider-blogs">
      <div :class="{left: cls === 'left', right: cls === 'right'}">
        <div :style="{transform: `translate(-${440 * index}px, 0)`}">
          <BlogCard class="card" v-for="blog in blogs" :key="blog.id" :blog="blog" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import BlogCard from '../components/BlogCard.vue'

export default {
  name: 'Slider',
  props: [ 'blogs' ],
  components: {
    BlogCard,
  },
  setup(props) {
    const index = ref(0)
    const cls = ref('')
    const buttonsDisabled = ref(false)

    const previous = () => {
      if(!buttonsDisabled.value && index.value > 0) {
        buttonsDisabled.value = true
        index.value--
        cls.value = 'right'
        setTimeout(() => {
          cls.value = ''
          buttonsDisabled.value = false
        }, 300)
      }
    }
    const next = () => {
      if(!buttonsDisabled.value && props.blogs.length - index.value > 3) {
        buttonsDisabled.value = true
        index.value++
        cls.value = 'left'
        let tm = setTimeout(() => {
          cls.value = ''
          buttonsDisabled.value = false
        }, 300)
      }
    }

    return { index, cls, previous, next }
  }
}
</script>

<style scoped>
.slider {
  width: 1288px;
  margin-bottom: 65px;
}
.slider-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
h2 {
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  margin: 0;
}
.buttons {
  width: 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.slider-btn {
  width: 44px;
  height: 44px;
  border-radius: 24px;
  background-color: #5D37F3;
  cursor: pointer;
}
.slider-btn.previous {
  transform: rotate(180deg);
}
.slider-btn.disabled {
  background-color: #E4E3EB;
  cursor: default;
}
.slider-blogs {
  overflow: hidden;
}
.slider-blogs div {
  display: flex;
  gap: 32px;
  width: fit-content;
}
.left {
  animation: left 300ms;
}
.right {
  animation: right 300ms;
}
@keyframes left {
  0% { transform: translate(440px, 0) }
  100% { transform: translate(0, 0) }
}
@keyframes right {
  0% { transform: translate(-440px, 0) }
  100% { transform: translate(0, 0) }
}
</style>
