<template>
  <div>
    <slot></slot>
    <button @click='readyLogin'>提交</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import mitt from 'mitt'

type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, context) {
    let funcArr: ValidateFunc[] = []

    const store = useStore()
    const router = useRouter()

    const callback = (func: any) => {
      if (func) {
        funcArr.push(func)
      }
    }

    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    
    function readyLogin() {
      const result = funcArr.map(func => func()).every(result => result)
      if (result) {
        context.emit('form-submit')
      }
    }

    return {
      readyLogin
    }
  }
})
</script>

<style>

</style>