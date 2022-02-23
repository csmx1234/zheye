<template>
  <div class="wrap">
    <div>
      <uploader
        action="/upload"
        :beforeUpload="beforeUpload"
        @file-uploaded="onFileUploaded"
      >
        <h2>点击上传</h2>
        <template #loading>
          <h2>
            正在上传...
          </h2>
        </template>
        <template #uploaded="dataProps">
          <img :src="dataProps.uploadedData.data.url" alt="">
        </template>
      </uploader>
      <label>标题</label>
      <validate-input
        v-model="titleValue"
      ></validate-input>
      <label>正文</label>
      <validate-input
        :tag="'textarea'"
        rows="30"
        v-model="postValue"
      ></validate-input>
      <button @click.prevent="onSubmit">发布</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput from '../components/ValidateInput.vue'
import Uploader from '../components/Uploader.vue'
import createMessage from '../components/createMessage'
import { GlobalDataProps, ResponseType, ImageProps, PostProps } from '../store'
import { beforeUploadCheck } from '../helper'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    ValidateInput,
    Uploader
  },
  name: "write",
  setup(props, context) {
    const titleValue = ref<string>('')
    const postValue = ref<string>('')
    let imageId = ''
    const store = useStore()

    const beforeUpload = (file: File) => {
      const { passed, error } = beforeUploadCheck(file, {fileType:['image/jpeg','image/png'], size:1})
      if (!passed) {
        if (error === 'type') {
          createMessage('文件格式应当为JPEG/PNG', 'error')
        }
        if (error === 'size') {
          createMessage('文件大小应当小于1MB', 'error')
        }
      }
      return passed
    }

    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id}`, 'success')
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }

    const onSubmit = () => {
      const payload: PostProps = {title:'',column:''}
      payload['title'] = titleValue.value
      payload['content'] = postValue.value
      payload['author'] = store.state.user._id
      payload['column'] = store.state.user.column
      if (imageId) {
        payload['image'] = imageId
      }
      console.log(payload)
      store.dispatch('createPost', payload)
    }
    return {
      titleValue,
      postValue,
      beforeUpload,
      onFileUploaded,
      onSubmit
    }
  }
})
</script>

<style>
.wrap {
  display: flex;
  justify-content: center;
  margin-top: 8rem;
}

.file-upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  width: 60rem;
  height: 20rem;
  margin-bottom: 2rem;
}

.file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>