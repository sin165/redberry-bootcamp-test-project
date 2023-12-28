<template>
  <div class="category-select" :class="{ expanded: expanded, green: selectedCatData.length }">
    <div v-if="categories.length" class="selected-categories">
      <p v-for="cat in selectedCatData" :for="cat.id"
      :style="{ color: cat.text_color, background: cat.background_color }">
        <span>{{ cat.title }}</span>
        <label :for="cat.id">
          <img src="@/assets/delete.svg" alt="delete">
        </label>
      </p>
    </div>
    <div class="text" v-else>აირჩიეთ კატეგორია</div>
    <div class="expand" @click="expanded = !expanded">
      <img src="@/assets/arrow-down.svg" alt="">
    </div>
    <div v-if="expanded" class="selection-window">
      <label v-for="cat in notSelectedCatData" :for="cat.id"
      :style="{ color: cat.text_color, background: cat.background_color }">
        {{ cat.title }}
      </label>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'SelectCategories',
  props: [ 'categories', 'categoriesData' ],
  setup(props) {
    const expanded = ref(false)
    const selectedCatData = computed(() => {
      return props.categoriesData.filter(cat => props.categories.includes(cat.id))
    })
    const notSelectedCatData = computed(() => {
      return props.categoriesData.filter(cat => !props.categories.includes(cat.id))
    })

    return { expanded, selectedCatData, notSelectedCatData }
  }
}
</script>

<style scoped>
.category-select .selected-categories {
  width: 346px;
  height: 100%;
}
.category-select {
  height: 44px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.category-select.expanded {
  border: 1.5px solid #5D37F3;
  background-color: #F7F7FF;
}
.category-select.green {
  border: 1px solid #14D81C;
  background-color: #F8FFF8;
}
.category-select .text {
  box-sizing: border-box;
  width: 246px;
  padding: 12px 16px;
  color: #85858D;
  cursor: default;
}
.category-select .expand {
  width: 40px;
  height: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 5.5px;
}
.selection-window label,
.selected-categories p {
  border-radius: 30px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  box-sizing: border-box;
  margin: 0;
  white-space: nowrap;
}
.selected-categories {
  padding: 0 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: scroll;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.selected-categories::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}
.selected-categories p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  padding: 8px 12px;
}
.selected-categories p label {
  height: fit-content;
  width: 16px;
  height: 16px;
  margin: 0 0 0 8px;
  cursor: pointer;
}
.selection-window {
  position: absolute;
  width: 388px;
  box-sizing: border-box;
  top: 46px;
  left: 0;
  background-color: #FFFFFF;
  border: 1px solid #E4E3EB;
  padding: 16px 27px 16px 16px;
  border-radius: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.selection-window label {
  cursor: pointer;
  padding: 8px 16px;
}
</style>
