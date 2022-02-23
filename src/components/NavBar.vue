<template>
  <div id="navbar">
      <div class="navbar__box">
        <router-link class="home" to="/">知乎</router-link>
        <div class="navbar__menus">
            <a @click.prevent="toWrite">写文章</a>
            <div v-if="!user.isLogin" class="menu">
                <router-link id="login" to="/login">登陆</router-link>
                <router-link id="signup" to="/signup">注册</router-link>
            </div>
            <div v-if="user.isLogin" class="menu">
                <a @click="toggleDropdown" href="#" ref="dropdownRef">欢迎, {{user.nickName}}</a>
                <div class="dropdown" v-show="showingDropdown">
                    <a href="#">我的专栏</a>
                    <a @click.prevent="logOut" href="#">登出</a>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UserProps } from '@/store'

export default defineComponent({
  setup(){
    const store = useStore()
    const router = useRouter()
    const showingDropdown = ref(false)
    const dropdownRef = ref<null|HTMLElement>(null)
    const hideDropdown = (e:MouseEvent) => {
        if ( e.target != dropdownRef.value ) {
            showingDropdown.value = false
        }
    }
    const user = computed(() => store.state.user)

    function toggleDropdown() {
        showingDropdown.value = !showingDropdown.value
    }
    onMounted(()=>{
        document.addEventListener('click', hideDropdown)
    })

    function toWrite() {
        if (store.state.user.isLogin) {
            router.push('/write')
        } else {
            router.push('/login')
        }
    }

    function logOut() {
        store.commit('logout')
    }

    return {
      user,
      showingDropdown,
      dropdownRef,
      toggleDropdown,
      toWrite,
      logOut
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

.navbar__box .home{
    font-size: 2rem;
    color: white;
    text-decoration: none;
}

.navbar__menus {
    display: flex;
    direction: row;
    align-items: center;
}

.menu {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu a, .navbar__menus a {
    font-size: 1.2rem;
    color: white;
    text-decoration: none;
    border: 1px white solid;
    padding: 3px 6px 3px;
    border-radius: 2px;
    transition: ease-in-out 200ms;
    cursor: pointer;
}

.menu a:hover, .navbar__menus a:hover {
    color:rgb(19,91,252);
    background-color: white;
}

#login, .navbar__menus a {
    margin-right: 1rem;
}

.dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    font-size: 1rem;
    border-radius: 5px;
    background-color: white;
    border: gray solid 1px;
    width: 10rem;
    /* height: auto; */
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem 0.5rem;
    text-align: center;
    transition: ease-in-out 200ms;
}

.dropdown a {
    color:rgb(19,91,252);
}

</style>
