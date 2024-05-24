<template>
  <div class="tasks">
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
          @remove="deleteTask"
          @click="$router.push(`/tasks/${task.id}`)"
        />
      </div>
    </div>
    <button @click="showDialog" class="tasks__button">+ Add a New Task</button>
  </div>
  <AddTaskDialog @create="addTask" v-model:show="dialogVisible" />
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
      // console.log(task.date)
      // const parsedTimestamp = Date.parse(task.date) / 1000
      // console.log(parsedTimestamp)
      // this.tasks.push(task)
      // this.dialogVisible = false
      await createTask(task)
      this.dialogVisible = false
    },
    showDialog() {
      this.dialogVisible = true
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id)
    },
    changeStatus(task) {
      task.status === false ? (task.status = true) : (task.status = false)
    }
  },
  async beforeMount() {
    this.tasks = await getAllTasks()
  },
  async updated() {
    this.tasks = await getAllTasks()
  }
}
</script>

<style scoped>
.tasks {
  max-width: 762px;
  min-height: 400px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tasks__header {
  max-width: 702px;
  padding-left: 50px;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
.tasks__title {
  margin: 30px 0 0;
  color: #545454;
  font-size: 32px;
}
.tasks__container {
  max-width: 702px;
  margin: 0;
  padding: 0 50px;
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
  margin: 20px auto;
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
