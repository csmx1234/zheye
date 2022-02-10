<template>
  <div id="main">
    <ul class="wrapper">
      <li class="column" v-for="column in columns" :key="column._id">
        <img :src="column.avatar.url" :alt="column.author">
        <p>{{column.description}}</p>
        <router-link :to="`/column/${column._id}`" >进入专栏</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'

export default defineComponent({
  name: 'ColumnList',
  props: {
    columns: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    return {
    }
  }
})
</script>

<style scoped>
#main {
  margin: 10rem 0rem 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  list-style: none;
}

.column {
  border-radius: 10px;
  padding: 1rem;
  border: 2px gray solid;
  width: 20rem;
  height: 24rem;
  text-align: center;
}

.column img {
  border-radius: 50%;
  border: 1px solid black;
  width: 8rem;
  height: 8rem;
  margin-bottom: 1rem;
}

.column p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.column a {
  font-size: 1.5rem;
  text-decoration: none;
}
</style>
