<template>
<div>
  <div class="ColumnWrapper">
    <div class="ColumnHeading" v-if="column">
      <div class="HeadingImage">
        <img :src="column.avatar.url" :alt="column.title">
      </div>
      <div>
        <h4>{{column.title}}</h4>
        <p>{{column.description}}</p>
      </div>
    </div>
  </div>
  <post-list :list="list"></post-list>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'

export default defineComponent({
  components: {
    PostList
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      column,
      list
    }
  }
})
</script>

<style>
.ColumnWrapper {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.ColumnHeading {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.HeadingImage img{
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  margin-right: 2rem;
}
</style>