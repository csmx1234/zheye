<template>
  <div id="login">
    <div class="login__menu">
      <validate-form @form-submit="commitLogin">
        <label>用户名:</label>
        <validate-input :rules="usernameRules" v-model="emailValue" placeholder="请输入邮箱地址" type="text"></validate-input>
        <label>密码:</label>
        <validate-input :rules="passwordRules" v-model="passwordValue" placeholder="请输入密码" type="password"></validate-input>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const usernameRules: RulesProp = [
      { type: 'required', message: '用户名不能为空' },
      { type: 'email', message: '用户名不是合法邮箱' }
    ]

    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const emailValue = ref('')
    const passwordValue = ref('')

    function commitLogin() {
      const payload = {
        email: emailValue.value,
        password: passwordValue.value
      }

      store.dispatch('login', payload).then(data => {
        store.state.user.isLogin = true
        router.push('/')
      })
    }

    return {
      usernameRules,
      passwordRules,
      emailValue,
      passwordValue,
      commitLogin
    }
  }
})
</script>

<style scoped>
#login {
  display: flex;
  justify-content: center;
  padding-top: 10rem;
}

.login__menu {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
}
</style>