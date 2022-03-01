<template>
  <nav-bar></nav-bar>
  <h1 v-if="isLoading">正在读取</h1>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import navBar from './components/NavBar.vue'
import message from './components/Message.vue'
import { GlobalDataProps } from './store'
import Message from './components/Message.vue'
import createMessage from './components/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    navBar,
    Message
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error )
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })

    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      isLoading,
      error
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

:root {
  --blue: rgb(19,91,252);
}
</style>
