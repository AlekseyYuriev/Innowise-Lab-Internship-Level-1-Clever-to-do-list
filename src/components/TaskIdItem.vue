<template>
  <div class="wrapper">
    <div v-if="this.task" class="wrapper__item">
      <div class="item">
        <h1 class="item__header">Task</h1>
      </div>
      <form class="item__content">
        <label class="item__lable"
          >Task title:
          <input
            v-model.trim="title"
            type="text"
            name="title"
            class="item__input item__input-title"
          />
        </label>

        <label class="item__lable"
          >Description:
          <textarea
            v-model.trim="description"
            class="item__input item__input-description"
            name="description"
            rows="5"
          ></textarea>
        </label>

        <label class="item__lable"
          >Date:
          <input
            v-model="date"
            type="date"
            name="status"
            class="item__input item__input-date"
          />
        </label>
      </form>
      <div class="item__buttons">
        <button
          :disabled="handleUpdateTask"
          @click="updateTask"
          type="button"
          class="item__update-button btn"
        >
          Update <span class="btn-icon-update"></span>
        </button>
        <button
          type="button"
          class="item__delete-button btn"
          @click="removeTask"
        >
          Delete <span class="btn-icon-delete"></span>
        </button>
        <button
          v-if="!this.task.done"
          type="button"
          class="item__done-button btn"
          @click="changeTaskStatusToDone"
        >
          Done <span class="btn-icon-done"></span>
        </button>
        <button
          v-else
          type="button"
          class="item__notdone-button btn"
          @click="changeTaskStatusToNotDone"
        >
          Not Done <span class="btn-icon-notdone"></span>
        </button>
      </div>
    </div>
    <page-loader v-else class="loader"></page-loader>
  </div>
</template>

<script>
import {
  changeTaskStatusToDone,
  changeTaskStatusToNotDone,
  getTaskById,
  removeTask,
  updateTask
} from '@/API/api'

export default {
  data() {
    return {
      id: this.$route.params['id'],
      task: null,
      title: '',
      description: '',
      date: '',
      isTaskUpdated: false
    }
  },
  methods: {
    async removeTask() {
      await removeTask(this.task, this.userId)
      this.$router.push('/')
    },
    async changeTaskStatusToDone() {
      await changeTaskStatusToDone(this.task.id, this.userId)
      this.task = await getTaskById(this.task.id, this.userId)
      this.$router.push('/')
    },
    async changeTaskStatusToNotDone() {
      await changeTaskStatusToNotDone(this.task.id, this.userId)
      this.task = await getTaskById(this.task.id, this.userId)
    },
    async updateTask() {
      const updatedTask = {
        id: this.task.id,
        title: this.title,
        description: this.description,
        date: this.date
      }
      await updateTask(updatedTask, this.userId)
      this.task = await getTaskById(this.task.id, this.userId)
    }
  },
  async mounted() {
    this.task = await getTaskById(this.id, this.userId)
    this.title = this.task.title
    this.description = this.task.description
    this.date = this.task.date.split('-').reverse().join('-')
  },
  computed: {
    handleUpdateTask() {
      if (
        this.title !== this.task.title ||
        this.description !== this.task.description ||
        this.date !== this.task.date.split('-').reverse().join('-')
      ) {
        return this.isTaskUpdated
      }
      return !this.isTaskUpdated
    },
    userId() {
      return this.$store.state.user.uid
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 50px;
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
  box-sizing: border-box;
}
.wrapper__item {
  max-width: 700px;
  width: 100%;
}
.item {
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 20px;
  max-width: 702px;
}
.item__header {
  margin: 0;
  font-size: 32px;
  color: #545454;
}
.item__content {
  max-width: 500px;
  padding: 20px 0 0;
}
.item__lable {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.item__input {
  box-sizing: border-box;
  width: 100%;
  margin: 0 0 20px;
  padding: 15px;
  border: none;
  outline: 1px solid #a8a9a9;
  border-radius: 20px;
  color: #545454;
}
.item__input-title {
  height: 35px;
}
.item__input-date {
  height: 35px;
  position: relative;
}
.item__input-date::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
}
.item__input-date::-webkit-inner-spin-button,
.item__input-date::-webkit-clear-button {
  z-index: 1;
}
.item__buttons {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
}
.btn {
  padding: 0;
  max-width: 150px;
  width: 100%;
  height: 50px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fefbf8;
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}
.btn:not(:disabled):hover {
  opacity: 0.8;
  transform: scale(101%);
}
.btn:not(:disabled):active {
  transform: scale(98%);
}
.btn:disabled {
  cursor: not-allowed;
  background-color: #cbcbcb;
}
.item__update-button {
  background-color: #fe8c2c;
}
.item__delete-button {
  background-color: #ff4e50;
}
.item__done-button {
  background-color: #44e48d;
}
.item__notdone-button {
  background-color: #ffd952;
}
.btn-icon-update {
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
  width: 20px;
  height: 20px;
  background-image: url('/update-svg-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: transparent;
  cursor: pointer;
}
.btn-icon-delete {
  margin: 0;
  padding: 0;
  border: none;
  width: 24px;
  height: 24px;
  background-image: url('/delete-svg-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: transparent;
  cursor: pointer;
}
.btn-icon-done {
  margin: 0;
  padding: 0;
  border: none;
  width: 24px;
  height: 24px;
  background-image: url('/done-svg-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: transparent;
  cursor: pointer;
}
.btn-icon-notdone {
  margin: 0;
  padding: 0;
  border: none;
  width: 15px;
  height: 15px;
  background-image: url('/cross-svg-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: transparent;
  cursor: pointer;
}
</style>
