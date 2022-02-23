<template>
  <!-- <teleport to="#message"> -->
  <div class="wrapper">
    <div id="message_box" v-if="isShowing" :class="classObject">
      <h1>{{message}}</h1>
      <button @click="closeMessage">X</button>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
import { defineComponent, ref, PropType, Prop } from 'vue'
export type MessageType = 'success' | 'error' | 'default'
export default defineComponent({
  name: "Message",
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  setup(props, context) {
    // const node = document.createElement('div')
    // node.id = 'message'
    // document.body.appendChild(node)

    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }

    const isShowing = ref(true)

    function closeMessage() {
      isShowing.value = false
    }

    return {
      classObject,
      isShowing,
      closeMessage
    }
  }
})
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

#message_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.alert-success {
  color: green;
  background-color: lightgreen;
}

.alert-danger {
  color: red;
  background-color: lightcoral;
}

.alert-primary {
  color: blue;
  background-color: lightblue;
}

#message_box h1 {
  margin-right: 3rem;
}

#message_box button {
  width: 3rem;
  height: 3rem;
} 
</style>