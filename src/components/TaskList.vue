<template>
  <div class="tasks">
    <div v-if="this.tasks.length > 0" class="tasks__content">
      <div class="tasks__header">
        <h1 class="tasks__title">Tassker</h1>
      </div>
      <div class="tasks__container">
        <h3 class="tasks__quantity">5 Tasks Today</h3>
        <div class="tasks__list">
          <task-item
            v-for="task in tasks"
            :task="task"
            :key="task.id"
            @click="$router.push(`/tasks/${task.id}`)"
          />
        </div>
      </div>
      <button @click="showDialog" class="tasks__button">
        + Add a New Task
      </button>
    </div>
    <PageLoader v-else />
    <AddTaskDialog @create="addTask" v-model:show="dialogVisible" />
  </div>
</template>

<script>
import { createTask, getAllTasks } from '@/API/api'
import AddTaskDialog from '../components/AddTaskDialog.vue'
import TaskItem from '../components/TaskItem.vue'

export default {
  components: {
    AddTaskDialog,
    TaskItem
  },
  data() {
    return {
      tasks: [],
      dialogVisible: false,
      checkboxStatus: false
    }
  },
  methods: {
    async addTask(task) {
      await createTask(task, this.userId)
      this.dialogVisible = false
      this.tasks = await getAllTasks(this.userId)
    },
    showDialog() {
      this.dialogVisible = true
    },
    changeStatus(task) {
      task.status === false ? (task.status = true) : (task.status = false)
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.uid
    }
  },
  async mounted() {
    console.log('mounted')
    console.log(this.userId)
    this.tasks = await getAllTasks(this.userId)
  },
  unmounted() {
    console.log('unmounted')
  }
}
</script>

<style scoped>
.tasks {
  max-width: 762px;
  min-height: 400px;
  width: 100%;
  background-color: #fff;
  margin: 30px auto 0;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tasks__content {
  max-width: 762px;
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
}
.tasks__header {
  max-width: 702px;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
.tasks__title {
  margin: 0;
  color: #545454;
  font-size: 32px;
}
.tasks__container {
  max-width: 702px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tasks__quantity {
  color: #545454;
  margin-top: 30px;
}
.tasks__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.tasks__button {
  margin-top: 70px;
  padding: 0;
  max-width: 300px;
  width: 100%;
  height: 50px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  background-color: #fe8c2c;
  color: #fefbf8;
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}
.tasks__button:hover {
  opacity: 0.8;
  transform: scale(101%);
}
.tasks__button:active {
  transform: scale(98%);
}
</style>
