<template>
  <div class="tasks">
    <div class="tasks__header">
      <h1 class="tasks__title">Tassker</h1>
    </div>
    <div class="tasks__options">
      <button @click="listToShow = 'all'" class="tasks__option">All Tasks</button>
      <button @click="listToShow = 'todo'" class="tasks__option">Tasks Todo</button>
      <button @click="listToShow = 'done'" class="tasks__option">Done Tasks</button>
    </div>
    <div class="tasks__container">
      <h3 class="tasks__quantity">5 Tasks Today</h3>
      <div class="tasks__list" v-if="listToShow === 'all'">
        <div class="tasks__item" v-for="task in tasks" :key="task.id">
          <input
            type="checkbox"
            class="task__checkbox"
            :id="task.id"
            @click="changeStatus(task)"
            :status="task.status"
            :checked="task.status"
          />
          <label :for="task.id" class="task__body">{{ task.body }}</label>
          <button @click="deleteTask(task)" class="task__delete-button"></button>
        </div>
      </div>
      <div class="tasks__list" v-else-if="listToShow === 'todo'">
        <div class="tasks__item" v-for="task in tasksTodo" :key="task.id">
          <input
            type="checkbox"
            class="task__checkbox"
            :id="task.id"
            @click="changeStatus(task)"
            :status="task.status"
            :checked="task.status"
          />
          <label :for="task.id" class="task__body">{{ task.body }}</label>
          <button @click="deleteTask(task)" class="task__delete-button"></button>
        </div>
      </div>
      <div class="tasks__list" v-else>
        <div class="tasks__item" v-for="task in doneTasks" :key="task.id">
          <input
            type="checkbox"
            class="task__checkbox"
            :id="task.id"
            @click="changeStatus(task)"
            :status="task.status"
            :checked="task.status"
          />
          <label :for="task.id" class="task__body">{{ task.body }}</label>
          <button @click="deleteTask(task)" class="task__delete-button"></button>
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
        { id: 1, body: 'Create Vue project', status: false },
        { id: 2, body: 'Repeat deep copying of Objects', status: false },
        { id: 3, body: 'Learn algorithms', status: false },
        { id: 4, body: 'Create Vue project', status: false },
        { id: 5, body: 'Repeat deep copying of Objects', status: false },
        { id: 6, body: 'Learn algorithms', status: false }
      ],
      dialogVisible: false,
      listToShow: 'all',
      checkboxStatus: false
    }
  },
  computed: {
    doneTasks() {
      return this.tasks.filter((task) => task.status === true)
    },
    tasksTodo() {
      return this.tasks.filter((task) => task.status === false)
    }
  },
  methods: {
    addTask(task) {
      this.tasks.push(task)
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
.tasks__options {
  margin-top: 30px;
  display: flex;
  gap: 20px;
  padding: 0 50px;
}
.tasks__option {
  margin: 0;
  padding: 0;
  width: 150px;
  height: 30px;
  border: none;
  background-color: transparent;
  color: #fe8c2c;
  outline: 1px solid #fe8c2c;
  border-radius: 20px;
  cursor: pointer;
}
.tasks__option:hover {
  opacity: 0.8;
  transform: scale(101%);
}
.tasks__option:active {
  transform: scale(98%);
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
.task__delete-button {
  margin: 0;
  padding: 0;
  border: none;
  width: 19px;
  height: 19px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCI+CjxwYXRoIGQ9Ik0gMjEgMCBDIDE5LjM1NDU0NSAwIDE4IDEuMzU0NTQ1NSAxOCAzIEwgMTggNSBMIDEwLjE1NjI1IDUgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDkuODM3ODkwNiA1IEwgOCA1IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCA4IDcgTCA5LjA4NTkzNzUgNyBMIDEyLjcwNTA3OCA0Ny41IEwgMTIuNzA3MDMxIDQ3LjUwOTc2NiBDIDEyLjg1NzI2MiA0OC44NjIyMzIgMTMuOTgxODcyIDUwIDE1LjQwMDM5MSA1MCBMIDM0LjU5OTYwOSA1MCBDIDM2LjAxODEyOCA1MCAzNy4xNDI2OTEgNDguODYyMjY2IDM3LjI5Mjk2OSA0Ny41MDk3NjYgTCAzNy4yOTQ5MjIgNDcuNSBMIDQwLjkxNDA2MiA3IEwgNDIgNyBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgNDIgNSBMIDQwLjE3MzgyOCA1IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzOS44NDE3OTcgNSBMIDMyIDUgTCAzMiAzIEMgMzIgMS4zNTQ1NDU1IDMwLjY0NTQ1NSAwIDI5IDAgTCAyMSAwIHogTSAyMSAyIEwgMjkgMiBDIDI5LjU1NDU0NSAyIDMwIDIuNDQ1NDU0NSAzMCAzIEwgMzAgNSBMIDIwIDUgTCAyMCAzIEMgMjAgMi40NDU0NTQ1IDIwLjQ0NTQ1NSAyIDIxIDIgeiBNIDExLjA5Mzc1IDcgTCAxOC44MzIwMzEgNyBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMTkuMTU4MjAzIDcgTCAzMC44MzIwMzEgNyBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMzEuMTU4MjAzIDcgTCAzOC45MDYyNSA3IEwgMzUuMzA2NjQxIDQ3LjI4OTA2MiBDIDM1LjI1NjkxOCA0Ny43MzY1NjMgMzQuOTgxMDkxIDQ4IDM0LjU5OTYwOSA0OCBMIDE1LjQwMDM5MSA0OCBDIDE1LjAxODkwOSA0OCAxNC43NDMwODIgNDcuNzM2NTYzIDE0LjY5MzM1OSA0Ny4yODkwNjIgTCAxMS4wOTM3NSA3IHogTSAxOC45ODQzNzUgOS45ODYzMjgxIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAxOCAxMSBMIDE4IDQ0IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAyMCA0NCBMIDIwIDExIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAxOC45ODQzNzUgOS45ODYzMjgxIHogTSAyNC45ODQzNzUgOS45ODYzMjgxIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAyNCAxMSBMIDI0IDQ0IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAyNiA0NCBMIDI2IDExIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAyNC45ODQzNzUgOS45ODYzMjgxIHogTSAzMC45ODQzNzUgOS45ODYzMjgxIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzMCAxMSBMIDMwIDQ0IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAzMiA0NCBMIDMyIDExIEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAzMC45ODQzNzUgOS45ODYzMjgxIHoiPjwvcGF0aD4KPC9zdmc+');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: transparent;
  cursor: pointer;
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
