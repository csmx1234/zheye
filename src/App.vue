<template>
  <nav-bar :user="currentUser"></nav-bar>
  <h1 v-if="isLoading">正在读取</h1>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import navBar, { iUser } from './components/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    navBar
  },
  setup() {
    const store = useStore()
    const currentUser: iUser = {
      isLogin: false,
      userName: 'Siming'
    }

    const isLoading = computed(() => store.state.loading)

    return {
      currentUser,
      isLoading
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
</style>
