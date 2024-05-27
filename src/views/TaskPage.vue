<template>
  <TaskItem v-if="authIsReady" />
</template>

<script>
import TaskItem from '../components/TaskItem.vue'
export default {
  components: {
    TaskItem
  },
  computed: {
    authIsReady() {
      return this.$store.state.authIsReady
    }
  }
}
</script>

<style scoped></style>
