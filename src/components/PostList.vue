<template>
  <div id="PostList">
    <article v-for="post in list" :key="post._id">
      <div class="postbox">
        <router-link :to="`/posts/${post._id}`">{{post.title}}</router-link>
        <div class="content">
          <div v-if="post.image">
            <img :src="post.image.url" :alt="post.title">
          </div>
          <p class="excerpt">{{post.excerpt}}</p>
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

<style scoped>
article {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 45rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: solid gray 1px;
  overflow: hidden;
}

.postbox a {
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  font-weight: 600;
}

.postbox a:hover {
  color: var(--blue);
}

.content {
  display: flex;
  margin: 1rem 0 1rem;
}

.content img {
  width: 15rem;
  height: 8rem;
  border-radius: 1rem;
  object-fit: cover;
  margin-right: 1rem;
}

.content .excerpt {
  display: flex;
  align-items: center;
}

#PostList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>