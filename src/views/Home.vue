<template>
  <div>
    <column-list :columns="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup() {
    const store = useStore()
    onMounted(()=>{
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    
    return {
      list
    }
  }
})
</script>

<style>

</style>