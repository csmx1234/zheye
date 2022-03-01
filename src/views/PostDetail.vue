<template>
<div class="wrap">
  <div v-if="post" id="post-detail">
    <img v-if="post.image" :src="post.image.url" alt="" class="header__image">
    <h1>{{post.title}}</h1>
    <div class="header">
      <div class="header__left">
        <img v-if="post.author.avatar" :src="post.author.avatar.url" alt="">
        <img v-else src="../assets/avatar.jpg" alt="">
        <div class="header__left__author">
          <div class="header__left__author__nickname">{{post.author.nickName}}</div>
          <div class="header__left__author__description">{{post.author.description}}</div>
        </div>
      </div>
      <div class="header__right">发表于：{{post.createdAt}}</div>
    </div>
    <p>{{post.content}}</p>
    <div v-if="showEditArea">
      <router-link :to="{name: 'write', query: {id: post._id}}" class="edit">修改</router-link>
      <button class="delete">删除</button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { UserProps } from '../store'
export default defineComponent({
  name: 'Posts',
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const postId = route.params.id
    onMounted(() => store.dispatch('fetchPost', postId))
    const post = computed(() => store.getters.getPostById(postId))
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (post.value && post.value.author && isLogin) {
        const postAuthor = post.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    return {
      post,
      showEditArea
    }
  }
})
</script>

<style scoped>
#post-detail {
  width: 60rem;
}

#post-detail .header__image {
  width: 60rem;
  object-fit: cover;
  margin-bottom: 1rem;
}

#post-detail h1 {
  border-bottom: 1px solid lightgray;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

#post-detail .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
}

#post-detail .header .header__left img {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  border-radius: 50%;
  border: 1px gray solid;
  padding: 0.1rem;
  margin-right: 1rem;
}

#post-detail .header .header__left {
  display: flex;
}

#post-detail .header .header__left__author {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#post-detail .header .header__left__author__nickname {
  font-weight: 600;
}

#post-detail .header .header__left__author__description {
  color: gray;
}

#post-detail .header .header__right {
  color: gray;
  font-style: italic;
}

#post-detail p {
  margin-bottom: 5rem;
}

#post-detail .edit {
  margin-right: 1rem;
}
</style>