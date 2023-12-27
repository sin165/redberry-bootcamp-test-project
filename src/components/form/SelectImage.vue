<template>
  <div class="choose-picture">
    <label>ატვირთეთ ფოტო</label>
    <input type="file" @change="handleFileInputChange" ref="fileInput">
    <div v-if="!image" class="drag-area" :class="{ red: errors.image }"
    @dragover.prevent="onDragover" @dragleave.prevent="onDragleave" @drop.prevent="onDrop">
      <img src="@/assets/folder-add.svg" alt="">
      <p>
        ჩააგდეთ ფაილი აქ
        <span v-if="!isDragging"> ან <span class="choose" @click="fileInput.click()">აირჩიეთ ფაილი</span></span>
      </p>
    </div>
    <p class="error" v-if="errors.image"><img src="@/assets/info-circle.svg" alt=""><span>{{ errors.image }}</span></p>
    <div v-if="image" class="chosen-image">
      <div>
        <img src="@/assets/gallery.svg" alt="">
        <span v-if="image">{{ image.name }}</span>
      </div>
      <img src="@/assets/x.svg" alt="delete" class="delete" @click="clearImage">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SelectImage',
  props: [ 'image', 'errors' ],
  emits: [ 'setImage', 'setImageError' ],
  setup(props, context) {
    const fileInput = ref(null)
    const isDragging = ref(false)

    const saveToLocal = image => {
      const fr = new FileReader()
      fr.addEventListener('load', () => {
        const url = fr.result
        localStorage.setItem('image', url)
        localStorage.setItem('imageName', image.name)
      })
      fr.readAsDataURL(image)
    }

    const handleFileInputChange = e => {
      if(!e.target.files[0].type.startsWith('image/')) {
        context.emit('setImageError', 'არჩეული ფაილი უნდა იყოს სურათი')
        return
      }
      context.emit('setImage', e.target.files[0])
      saveToLocal(e.target.files[0])
      context.emit('setImageError', null)
    }

    const onDragover = e => {
      isDragging.value = true
      e.dataTransfer.dropEffect = 'copy'
    }
    const onDragleave = e => {
      isDragging.value = false
    }
    const onDrop = e => {
      isDragging.value = false
      const files = e.dataTransfer.files
      if(files.length > 1) {
        context.emit('setImageError', 'აირჩიეთ მხოლოდ ერთი ფაილი')
        return
      }
      if(!files[0].type.startsWith('image/')) {
        context.emit('setImageError', 'არჩეული ფაილი უნდა იყოს სურათი')
        return
      }
      context.emit('setImage', files[0])
      saveToLocal(files[0])
      context.emit('setImageError', null)
    }
    const clearImage = () => {
      context.emit('setImage', null)
      localStorage.removeItem('image')
      localStorage.removeItem('imageName')
      fileInput.value.value = null
    }

    return { handleFileInputChange, fileInput, isDragging, onDragover, onDragleave, onDrop, clearImage }
  }
}
</script>

<style scoped>
label {
  color: #1A1A1F;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  margin: 0 0 8px 0;
  display: block;
}
.choose-picture {
  margin-bottom: 24px;
}
.drag-area {
  height: 180px;
  border-radius: 12px;
  background-color: #F4F3FF;
  border: 1px dashed #85858D;
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
  margin: 0;
}
.drag-area p .choose {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
.error {
  color: #EA1919;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
input {
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
}
.red {
  border: 1px solid #EA1919;
  background-color: #FAF2F3;
}
</style>
