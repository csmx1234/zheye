import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '5146D917A8D86D73'}
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
