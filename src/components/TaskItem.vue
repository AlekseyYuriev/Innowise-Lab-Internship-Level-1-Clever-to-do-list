<template>
  <div class="task__item">
    <input
      @click="changeTaskStatus"
      type="checkbox"
      class="task__checkbox"
      :id="task.id"
      :status="task.done"
      :checked="task.done"
    />
    <label :for="task.id" class="task__label"></label>
    <div @click.stop="$router.push(`/tasks/${task.id}`)" class="task__title">
      {{ task.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    async changeTaskStatus() {
      if (this.task.done === true) {
        this.$emit('changeTaskStatus', this.task, false)
      } else {
        this.$emit('changeTaskStatus', this.task, true)
      }
    }
  },
  emits: ['changeTaskStatus']
}
</script>

<style scoped>
.task__item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: fit-content;
}
.task__checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.task__checkbox + .task__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.task__checkbox + .task__label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 2px solid #ffbf1a;
  border-radius: 50%;
  margin-right: 5px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.task__checkbox:checked + .task__label::before {
  border-color: #ff8a34;
  background-color: #ff8a34;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.task__checkbox:not(:disabled):checked + .task__label:hover::before {
  border-color: #88dce4;
}
.task__checkbox:not(:disabled):not(:checked) + .task__label:hover::before {
  border-color: #88dce4;
}
.task__checkbox:not(:disabled):active + .task__label::before {
  background-color: #ffd0ad;
  border-color: #88dce4;
}
.task__checkbox:focus + .task__label::before {
  box-shadow: 0 0 0 0.2rem rgba(136, 220, 228, 0.5);
}
.task__checkbox:focus:not(:checked) + .task__label::before {
  border-color: #80bdff;
}
.task__checkbox:disabled + .task__label::before {
  background-color: #e9ecef;
  border-color: #afe8ed;
}
.task__title {
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-task-item);
}
.task__title:not(:disabled):hover {
  color: #ffbf1a;
  opacity: 0.9;
  transform: scale(103%);
}
@media screen and (max-width: 565px) {
  .task__title {
    margin-left: 5px;
    font-size: 13px;
  }
}
</style>
