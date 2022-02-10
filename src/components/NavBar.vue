<template>
  <div id="navbar">
      <div class="navbar__box">
        <router-link to="/">知乎</router-link>
        <div v-if="!store.state.user.isLogin" class="menu">
            <router-link id="login" to="/login">登陆</router-link>
            <router-link id="register" to="/login">注册</router-link>
        </div>
        <div v-if="store.state.user.isLogin" class="menu">
            <a @click="toggleDropdown" href="#" ref="dropdownRef">欢迎, {{user.userName}}</a>
            <div class="dropdown" v-show="showingDropdown">啦啦</div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export interface iUser {
  isLogin: boolean,
  userName: string
}
export default defineComponent({
  setup(){
    const store = useStore()
    const showingDropdown = ref(false)
    const dropdownRef = ref<null|HTMLElement>(null)
    const hideDropdown = (e:MouseEvent) => {
        if ( e.target != dropdownRef.value ) {
            showingDropdown.value = false
        }
    }
    function toggleDropdown() {
        showingDropdown.value = !showingDropdown.value
    }
    onMounted(()=>{
        document.addEventListener('click', hideDropdown)
    })
    return {
      store,
      showingDropdown,
      dropdownRef,
      toggleDropdown
    }
  },
  props: {
    user: {
      type: Object as PropType<iUser>,
      required: true
    }
  }
})
</script>

<style scoped>
#navbar {
    background-color: rgb(19,91,252);
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
}

.navbar__box {
    min-width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar__box a{
    font-size: 2rem;
    color: white;
    text-decoration: none;
}

.menu {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu a {
    font-size: 1.2rem;
    color: white;
    text-decoration: none;
    border: 1px white solid;
    padding: 3px 6px 3px;
    border-radius: 2px;
    transition: ease-in-out 200ms;
}

.menu a:hover {
    color:rgb(19,91,252);
    background-color: white;
}

#login {
    margin-right: 1rem;
}

.dropdown {
    position: absolute;
    font-size: 2rem;
    border-radius: 5px;
    background-color: white;
    border: gray solid 1px;
    width: 10rem;
    height: 12rem;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem 0.5rem;
    text-align: center;
    transition: ease-in-out 200ms;
}

</style>
