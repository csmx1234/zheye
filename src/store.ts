import { createStore, Commit } from "vuex"
import axios from 'axios'

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  token: string;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  commit("setLoading", true)
  const { data } = await axios.get(url)
  commit(mutationName, data)
  commit("setLoading", false)
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  commit("setLoading", true)
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  commit("setLoading", false)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: {status: false},
    loading: false,
    user: {
      isLogin: false,
    },
    columns: [],
    posts: [],
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    // login(state) {
    //   state.user.isLogin = true
    // },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPost(state, rawData) {
      state.posts[rawData.data._id] = rawData.data
      console.log(rawData.data)
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    signup(state, rawData) {
      alert("注册成功")
    },
    logout(state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    createPost(state, rawData) {
      alert("发布成功")
    }
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchCurrentUser({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    signup({ commit }, payload) {
      return postAndCommit('/users', 'signup', commit, payload)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    createPost({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload)
    },
    fetchPost({state, commit}, id) {
      const currentPost = state.posts[id]
      if (!currentPost || !currentPost.content) {
        console.log("getting new stuff")
        return getAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c: ColumnProps) => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter((post: PostProps) => post.column === cid)
    },
    getPostById: (state) => (id: string) => {
      return state.posts.find((post: PostProps) => post._id === id)
    }
  }
})

export default store