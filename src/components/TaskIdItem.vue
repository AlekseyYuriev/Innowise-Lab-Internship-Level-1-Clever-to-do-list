<template>
  <div class="wrapper">
    <div class="item">
      <h1 class="item__title">Task: {{ task.title }}</h1>
    </div>
    <div class="item__content">
      <div>
        <p class="item__subtitle">Description:</p>
        <p>{{ task.description }}</p>
      </div>
      <div>
        <p class="item__status">Status:</p>
        <p>{{ task.done ? 'Done' : 'Not done' }}</p>
      </div>
      <div>
        <p class="item__date">Date:</p>
        <p>{{ task.date }}</p>
      </div>
    </div>
    <div class="item__buttons">
      <button class="item__update-button btn">Update <span class="btn-icon-update"></span></button>
      <button class="item__delete-button btn" @click="removeTask">
        Delete <span class="btn-icon-delete"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { getTaskById, removeTask } from '@/API/api'

export default {
  data() {
    return {
      id: this.$route.params['id'],
      task: {}
    }
  },
  methods: {
    async removeTask() {
      await removeTask(this.task)
      this.$router.push('/')
    }
  },
  async mounted() {
    this.task = await getTaskById(this.id)
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
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}
.item {
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 20px;
  max-width: 702px;
}
.item__title {
  margin: 0;
  font-size: 32px;
}
.item__content {
  max-width: 600px;
  padding-bottom: 20px;
}
.item__buttons {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
}
.btn {
  padding: 0;
  max-width: 200px;
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
.btn:hover {
  opacity: 0.8;
  transform: scale(101%);
}
.btn:active {
  transform: scale(98%);
}
.item__update-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.item__delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #ff4e50;
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
</style>
