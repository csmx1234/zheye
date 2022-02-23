<template>
  <div id="login">
    <div class="login__menu">
      <validate-form @form-submit="commitLogin">
        <label>用户名:</label>
        <validate-input :rules="usernameRules" v-model="emailValue" placeholder="请输入邮箱地址" type="text"></validate-input>
        <label>昵称:</label>
        <validate-input :rules="nicknameRules" v-model="nicknameValue" placeholder="请输入昵称" type="text"></validate-input>
        <label>密码:</label>
        <validate-input :rules="passwordRules" v-model="passwordValue" placeholder="请输入密码" type="password"></validate-input>
        <label>再次输入密码:</label>
        <validate-input :rules="retryPasswordRules" v-model="retryPasswordValue" placeholder="请输入密码" type="password"></validate-input>
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
  name: 'SignUp',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const emailValue = ref('')
    const nicknameValue = ref('')
    const passwordValue = ref('')
    const retryPasswordValue = ref('')
    const usernameRules: RulesProp = [
      { type: 'required', message: '用户名不能为空' },
      { type: 'email', message: '用户名不是合法邮箱' }
    ]
    const nicknameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const retryPasswordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'custom', message: '再次输入密码不一样', 
      validator: () => passwordValue.value === retryPasswordValue.value }
    ]

    function commitLogin() {
      const payload = {
        email: emailValue.value,
        nickName: nicknameValue.value,
        password: passwordValue.value
      }

      store.dispatch('signup', payload).then(data => {
        router.push('/login')
      }).catch(e => {
        console.log(e)
      })
    }

    return {
      usernameRules,
      nicknameRules,
      passwordRules,
      retryPasswordRules,
      emailValue,
      nicknameValue,
      passwordValue,
      retryPasswordValue,
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