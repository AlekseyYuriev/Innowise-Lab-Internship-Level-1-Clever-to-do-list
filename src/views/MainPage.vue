<template>
  <TaskList v-if="authIsReady" />
</template>

<script>
import TaskList from '@/components/TaskList.vue'
export default {
  components: {
    TaskList
  },
  computed: {
    authIsReady() {
      return this.$store.state.authIsReady
    }
  }
}
</script>

<style scoped></style>
