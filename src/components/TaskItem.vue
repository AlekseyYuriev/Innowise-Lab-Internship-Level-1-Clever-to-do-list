<template>
  <div class="tasks__item">
    <input
      type="checkbox"
      class="task__checkbox"
      :id="task.id"
      :status="task.done"
      :checked="task.done"
    />
    <label :for="task.id" class="task__title">{{ task.title }}</label>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.tasks__item {
  display: flex;
  justify-content: space-between;
}
.task__checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.task__checkbox + .task__title {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.task__checkbox + .task__title::before {
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
.task__checkbox:checked + .task__title::before {
  border-color: #fffcfb;
  background-color: #ff8a34;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.task__checkbox:checked + .task__title {
  text-decoration: line-through;
}
.task__checkbox:not(:disabled):not(:checked) + .task__title:hover::before {
  border-color: #88dce4;
}
.task__checkbox:not(:disabled):active + .task__title::before {
  background-color: #ffd0ad;
  border-color: #88dce4;
}
.task__checkbox:focus + .task__title::before {
  box-shadow: 0 0 0 0.2rem rgba(136, 220, 228, 0.5);
}
.task__checkbox:focus:not(:checked) + .task__title::before {
  border-color: #80bdff;
}
.task__checkbox:disabled + .task__title::before {
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
</style>
