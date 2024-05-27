<template>
  <TaskIdItem v-if="authIsReady" />
</template>

<script>
import TaskIdItem from '@/components/TaskIdItem.vue'
export default {
  components: {
    TaskIdItem
  },
  computed: {
    authIsReady() {
      return this.$store.state.authIsReady
    }
  }
}
</script>

<style scoped></style>
