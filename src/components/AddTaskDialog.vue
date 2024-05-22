<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <form @click.prevent class="dialog__form">
        <label class="dialog__lable">
          <input
            v-model="searchText"
            type="text"
            name="task-body"
            class="dialog__input"
            placeholder="Enter a Task To Do..."
          />
        </label>
        <p>{{ searchText }}</p>
        <button class="dialog__button">+ Add a New Task</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      searchText: ''
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
  margin: 0;
  padding: 0 0 0 15px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  color: #545454;
}
.dialog__input::placeholder {
  color: #838383;
}
.dialog__button {
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
.dialog__button:hover {
  opacity: 0.8;
  transform: scale(101%);
}
.dialog__button:active {
  transform: scale(98%);
}
</style>
