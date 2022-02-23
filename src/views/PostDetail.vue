<template>
  <h1>
    {{post.content}}
  </h1>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Posts',
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const postId = route.params.id
    onMounted(() => store.dispatch('fetchPost', postId))
    const post = computed(() => store.getters.getPostById(postId))
    console.log(post)
    return {
      post
    }
  }
})
</script>

<style>

</style>