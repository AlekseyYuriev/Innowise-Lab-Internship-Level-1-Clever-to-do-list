<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <form @submit.prevent="addTask" class="dialog__form">
        <label class="dialog__lable">
          <input
            v-model.trim="task.title"
            type="text"
            name="task-title"
            class="dialog__input"
            placeholder="Enter Task Title"
          />
        </label>
        <label class="dialog__lable">
          <input
            v-model.trim="task.description"
            type="text"
            name="task-description"
            class="dialog__input"
            placeholder="Enter Task Description"
          />
        </label>
        <label class="dialog__lable">
          <input
            v-model="task.date"
            :style="{ color: activeColor ? '#545454' : '' }"
            type="date"
            name="task-date"
            min="2024-01-01"
            max="2025-12-31"
            class="dialog__input input__date"
          />
        </label>
        <button :disabled="validateInput" type="submit" class="dialog__button">
          + Add a New Task
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        done: false
      },
      validInput: true,
      activeColor: false,
      currentDate: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    validateInput() {
      return this.task.title === '' || this.task.description === ''
        ? this.validInput
        : !this.validInput
    }
  },
  methods: {
    addTask() {
      console.log(this.task.date)
      this.$emit('create', this.task)
      this.task = {
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        done: false
      }
      this.activeColor = false
    },
    hideDialog() {
      this.$emit('update:show', false)
      this.task = {
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        done: false
      }
      this.activeColor = false
    }
  },
  watch: {
    task: {
      handler(newValue) {
        if (newValue.date !== this.currentDate) {
          this.activeColor = true
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
.dialog__form {
  width: 100%;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.dialog__lable {
  width: 100%;
}
.dialog__input {
  box-sizing: border-box;
  display: flex;
  height: 50px;
  width: 100%;
  margin: 0 0 20px;
  padding: 0 0 0 15px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  color: #545454;
}
.dialog__input::placeholder {
  color: #838383;
}
.input__date {
  color: #838383;
}
.input__date {
  position: relative;
}
.input__date::-webkit-calendar-picker-indicator {
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
.input__date::-webkit-inner-spin-button,
.input__date::-webkit-clear-button {
  z-index: 1;
}
.dialog__button {
  margin: 0 auto 20px;
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
.dialog__button:not(:disabled):hover {
  opacity: 0.8;
  transform: scale(101%);
}
.dialog__button:not(:disabled):active {
  transform: scale(98%);
}
.dialog__button:disabled {
  cursor: not-allowed;
  background-color: #cbcbcb;
}
</style>
