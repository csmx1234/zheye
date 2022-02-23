<template>
  <div id="PostList">
    <article v-for="post in list" :key="post._id">
      <div>
        <router-link :to="`/posts/${post._id}`">{{post.title}}</router-link>
        <div>
          <div v-if="post.image">
            <img :src="post.image.url" :alt="post.title">
          </div>
          <p>{{post.content}}</p>
        </div>
        <span>{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../testData'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>

<style>
article {
  margin-top: 3rem;
  margin-bottom: 1rem;
  width: 1000px;
}

#PostList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>