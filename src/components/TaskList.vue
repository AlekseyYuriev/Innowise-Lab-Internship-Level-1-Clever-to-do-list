<template>
  <div class="tasks">
    <div class="tasks__header">
      <h1 class="tasks__title">Tassker</h1>
    </div>
    <div class="tasks__container">
      <h3 class="tasks__quantity">5 Tasks Today</h3>
      <div class="tasks__list">
        <div class="tasks__item" v-for="task in tasks" :key="task.id">
          <input type="checkbox" class="task__checkbox" :id="task.id" />
          <label :for="task.id" class="task__body">{{ task.body }}</label>
        </div>
      </div>
    </div>
    <button @click="showDialog" class="tasks__button">+ Add a New Task</button>
  </div>
  <AddTaskDialog @create="addTask" v-model:show="dialogVisible" />
</template>

<script>
import AddTaskDialog from '../components/AddTaskDialog.vue'
export default {
  components: {
    AddTaskDialog: AddTaskDialog
  },
  data() {
    return {
      tasks: [
        { id: 1, body: 'Create Vue project' },
        { id: 2, body: 'Repeat deep copying of Objects' },
        { id: 3, body: 'Learn algorithms' },
        { id: 4, body: 'Create Vue project' },
        { id: 5, body: 'Repeat deep copying of Objects' },
        { id: 6, body: 'Learn algorithms' }
      ],
      dialogVisible: false
    }
  },
  methods: {
    addTask(task) {
      this.tasks.push(task)
      this.dialogVisible = false
    },
    showDialog() {
      this.dialogVisible = true
    }
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
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tasks__quantity {
  color: #545454;
  margin-top: 50px;
}
.tasks__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.tasks__item {
  display: flex;
  justify-content: space-between;
}
.task__checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.task__checkbox + .task__body {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.task__checkbox + .task__body::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 2px solid #ffbf1a;
  border-radius: 50%;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.task__checkbox:checked + .task__body::before {
  border-color: #fffcfb;
  background-color: #ff8a34;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.task__checkbox:checked + .task__body {
  text-decoration: line-through;
}
.task__checkbox:not(:disabled):not(:checked) + .task__body:hover::before {
  border-color: #88dce4;
}
.task__checkbox:not(:disabled):active + .task__body::before {
  background-color: #ffd0ad;
  border-color: #88dce4;
}
.task__checkbox:focus + .task__body::before {
  box-shadow: 0 0 0 0.2rem rgba(136, 220, 228, 0.5);
}
.task__checkbox:focus:not(:checked) + .task__body::before {
  border-color: #80bdff;
}
.task__checkbox:disabled + .task__body::before {
  background-color: #e9ecef;
  border-color: #afe8ed;
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
