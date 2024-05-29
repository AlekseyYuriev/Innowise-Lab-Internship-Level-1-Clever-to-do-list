<template>
  <div class="calendar">
    <div
      v-for="(day, index) in daysToRender"
      :key="index"
      class="calendar__item"
    >
      <button
        @click="chooseDate(formatNextDate(day))"
        class="calendar__button"
        :class="{ 'calendar__button-active': activeDate(day) }"
        ref="calendarButton"
        type="button"
      >
        <p
          class="calendar__day"
          :class="{ 'calendar__day-active ': activeDate(day) }"
        >
          {{ dayOfWeek(day) }}
        </p>
        <p
          class="calendar__date"
          :class="{ 'calendar__day-active ': activeDate(day) }"
        >
          {{ formatNextDate(day).slice(0, 2) }}
        </p>
      </button>
      <div class="calendar__tasks">
        <div
          v-if="doneTasksAtThisDate(formatNextDate(day))"
          class="calendar__tasks-done"
        ></div>
        <div
          v-if="tasksToDoAtThisDate(formatNextDate(day))"
          class="calendar__tasks-notdone"
        ></div>
      </div>
    </div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      daysToRender: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29
      ],
      initialDate: new Date()
    }
  },
  methods: {
    nextDate(n) {
      return this.initialDate.getTime() + 86400000 * n
    },
    formatNextDate(n) {
      const day = new Date(this.nextDate(n))
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-')
      return day
    },
    dayOfWeek(n) {
      const options = { weekday: 'long' }
      const dayOfWeek = new Date(this.nextDate(n)).toLocaleString(
        'en-US',
        options
      )
      return dayOfWeek.slice(0, 3)
    },
    chooseDate(day) {
      this.$store.dispatch('changeCurrentDate', day)
      this.$emit('chooseDate', day)
    },
    activeDate(day) {
      if (this.dateInFocus === this.formatNextDate(day)) {
        return true
      }
      return false
    },
    tasksToDoAtThisDate(day) {
      const tasksAtThisDate = this.tasks.filter((task) => task.date === day)
      if (tasksAtThisDate.filter((task) => task.done === false).length > 0) {
        return true
      }
      return false
    },
    doneTasksAtThisDate(day) {
      const tasksAtThisDate = this.tasks.filter((task) => task.date === day)
      if (tasksAtThisDate.filter((task) => task.done === true).length > 0) {
        return true
      }
      return false
    }
  },
  mounted() {
    const options = {
      root: document.querySelector('.calendar'),
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        const lastDay = this.daysToRender[this.daysToRender.length - 1]
        const newDays = []
        for (let i = 1; i <= 15; i++) {
          newDays.push(lastDay + i)
        }
        this.daysToRender = this.daysToRender.concat(newDays)
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },
  emits: ['chooseDate'],
  computed: {
    dateInFocus() {
      return this.$store.state.currentDate
    }
  }
}
</script>

<style scoped>
.calendar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  overflow-x: scroll;
  padding: 10px;
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 #fff;
}
.calendar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.calendar__button {
  min-width: 52px;
  min-height: 70px;
  box-sizing: border-box;
  padding: 5px 0;
  border: none;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.calendar__day {
  color: #838383;
  margin: 0;
  transition: all 0.3s ease;
}
.calendar__date {
  color: #000;
  margin: 0;
  transition: all 0.3s ease;
}
.calendar__button-active {
  outline: none;
  background-color: #000;
  color: #fff;
  transition: all 0.5s ease;
}
.calendar__day-active {
  color: #fff;
}
.calendar__button:hover {
  outline: 1px solid #fe8c2c;
  color: #fe8c2c;
}
.calendar__button:hover .calendar__day {
  color: #fe8c2c;
}

.calendar__button:hover .calendar__date {
  color: #fe8c2c;
}
.calendar__tasks {
  height: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
}
.calendar__tasks-done {
  width: 5px;
  height: 5px;
  background-color: #feae6b;
  border-radius: 50%;
}
.calendar__tasks-notdone {
  width: 5px;
  height: 5px;
  background-color: #b1621e;
  border-radius: 50%;
}
.observer {
  width: 0px;
  height: 0px;
}
</style>
