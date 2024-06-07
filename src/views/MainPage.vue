<template>
  <TaskList v-if="authIsReady" />
</template>

<script>
import { mapGetters } from 'vuex'
import TaskList from '@/components/TaskList.vue'
export default {
  components: {
    TaskList
  },
  computed: {
    ...mapGetters(['authIsReady'])
  }
}
</script>

<style scoped></style>
