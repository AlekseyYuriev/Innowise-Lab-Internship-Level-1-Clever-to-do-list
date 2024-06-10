<template>
  <div class="wrapper">
    <div v-if="task" class="wrapper__item">
      <div class="item">
        <h1 @click="goBack" class="item__header">&#8592; Today's Task</h1>
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
        <div class="item__buttons-task">
          <button
            :disabled="handleUpdateTask || validateInput"
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
            v-if="!task.done"
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
    </div>
    <page-loader v-else class="loader"></page-loader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  removeTask,
  changeTaskStatusToDone,
  getTaskById,
  changeTaskStatusToNotDone,
  updateTask
} from '../services/tasks.js'

export default {
  data() {
    return {
      id: this.$route.params['id'],
      task: null,
      title: '',
      description: '',
      date: '',
      isTaskUpdated: false,
      validInput: true
    }
  },

  methods: {
    async removeTask() {
      await removeTask(this.task, this.user.uid)
      this.$router.push('/')
    },

    async changeTaskStatusToDone() {
      await changeTaskStatusToDone(this.task.id, this.user.uid)
      this.task = await getTaskById(this.task.id, this.user.uid)
      this.$router.push('/')
    },

    async changeTaskStatusToNotDone() {
      await changeTaskStatusToNotDone(this.task.id, this.user.uid)
      this.task = await getTaskById(this.task.id, this.user.uid)
    },

    async updateTask() {
      const updatedTask = {
        id: this.task.id,
        title: this.title,
        description: this.description,
        date: this.date
      }
      await updateTask(updatedTask, this.user.uid)
      this.task = await getTaskById(this.task.id, this.user.uid)
    },

    goBack() {
      this.$router.go(-1)
    }
  },

  async mounted() {
    try {
      this.task = await getTaskById(this.id, this.user.uid)
      this.title = this.task.title
      this.description = this.task.description
      this.date = this.task.date.split('-').reverse().join('-')
    } catch (error) {
      this.$router.push('/')
    }
  },

  computed: {
    ...mapGetters(['user']),

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

    validateInput() {
      return this.title === '' ? this.validInput : !this.validInput
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
  background-color: var(--color-container-background);
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
  border-bottom: 1px solid var(--color-border-bottom);
  padding-bottom: 20px;
  max-width: 500px;
}
.item__header {
  margin: 0;
  width: fit-content;
  padding: 3px 10px 3px 3px;
  font-size: 32px;
  color: var(--color-text-main);
  cursor: pointer;
  transition: all 0.5s ease;
}
.item__header:hover {
  margin: 0;
  color: var(--color-calendar-button-hover);
  opacity: 0.7;
}
.item__content {
  max-width: 500px;
  padding: 20px 0 0;
}
.item__lable {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--color-text-main);
  gap: 15px;
}
.item__input {
  box-sizing: border-box;
  width: 100%;
  margin: 0 0 20px;
  padding: 15px;
  border: none;
  outline: 1px solid var(--color-input-outline);
  border-radius: 20px;
  color: var(--color-text-main);
  background-color: var(--color-input-background);
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
  justify-content: flex-start;
  gap: 20px;
  max-width: 500px;
}
.item__buttons-task {
  width: 500px;
  display: flex;
  justify-content: space-between;
}
.btn {
  padding: 0;
  max-width: 150px;
  width: 100%;
  height: 50px;
  border: none;
  outline: 1px solid var(--color-button-outline);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--color-button-text);
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
@media screen and (max-width: 565px) {
  .wrapper {
    padding: 20px;
    max-width: 300px;
    margin: 15px auto 0;
  }
  .wrapper__item {
    max-width: 280px;
  }
  .item {
    padding-bottom: 10px;
    max-width: 280px;
  }
  .item__header {
    font-size: 20px;
  }
  .item__content {
    max-width: 280px;
    padding: 10px 0 0;
  }
  .item__lable {
    font-size: 14px;
  }
  .item__input {
    margin: 0 0 10px;
    padding: 10px;
    font-size: 12px;
  }
  .item__input-title {
    height: 30px;
  }
  .item__input-date {
    height: 30px;
  }
  .item__buttons {
    gap: 5px;
    max-width: 280px;
  }
  .item__buttons-task {
    width: 260px;
    margin-top: 10px;
  }
  .btn {
    max-width: 80px;
    height: 40px;
    gap: 5px;
    font-size: 12px;
  }
  .btn-icon-update {
    width: 15px;
    height: 15px;
  }
  .btn-icon-delete {
    width: 18px;
    height: 18px;
  }
  .btn-icon-done {
    width: 16px;
    height: 16px;
  }
  .btn-icon-notdone {
    width: 10px;
    height: 10px;
  }
}
</style>
