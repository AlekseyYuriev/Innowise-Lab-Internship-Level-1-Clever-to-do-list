<template>
  <TaskIdItem v-if="authIsReady" />
</template>

<script>
import { mapGetters } from 'vuex'
import TaskIdItem from '@/components/TaskIdItem.vue'
export default {
  components: {
    TaskIdItem
  },
  computed: {
    ...mapGetters(['authIsReady'])
  }
}
</script>

<style scoped></style>
