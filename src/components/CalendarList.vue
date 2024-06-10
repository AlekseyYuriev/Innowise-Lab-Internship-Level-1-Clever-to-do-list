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
import { NUMBER_OF_DAYS, ONE_DAY } from '../constants/calendarDay.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      daysToRender: NUMBER_OF_DAYS,
      initialDate: new Date()
    }
  },

  methods: {
    ...mapActions(['changeCurrentDate']),

    nextDate(n) {
      return this.initialDate.getTime() + ONE_DAY * n
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
      this.changeCurrentDate(day)
      this.$emit('chooseDate', day)
    },

    activeDate(day) {
      if (this.currentDate === this.formatNextDate(day)) {
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

  emits: {
    chooseDate: null
  },

  computed: {
    ...mapGetters(['currentDate'])
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
  scrollbar-color: var(--color-calendar-scrollbar)
    var(--color-calendar-scrollbar-background);
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
  background-color: var(--color-calendar-item-background);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.calendar__day {
  color: var(--color-calendar-day-text);
  margin: 0;
  transition: all 0.3s ease;
}
.calendar__date {
  color: var(--color-calendar-date-text);
  margin: 0;
  transition: all 0.3s ease;
}
.calendar__button-active {
  outline: none;
  background-color: var(--color-calendar-button-active);
  color: var(--color-calendar-button-text-active);
  transition: all 0.5s ease;
}
.calendar__day-active {
  color: var(--color-calendar-button-text-active);
}
.calendar__button:hover {
  outline: 1px solid var(--color-calendar-button-hover);
  color: var(--color-calendar-button-hover);
}
.calendar__button:hover .calendar__day {
  color: var(--color-calendar-button-hover);
}

.calendar__button:hover .calendar__date {
  color: var(--color-calendar-button-hover);
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
@media screen and (max-width: 565px) {
  .calendar {
    gap: 5px;
    padding: 5px;
  }
  .calendar__button {
    min-width: 28px;
    min-height: 38px;
    border-radius: 10px;
  }
  .calendar__day {
    font-size: 10px;
  }
  .calendar__date {
    font-size: 10px;
  }
  .calendar__tasks {
    height: 4px;
    padding-bottom: 2px;
  }
  .calendar__tasks-done {
    width: 4px;
    height: 4px;
  }
  .calendar__tasks-notdone {
    width: 4px;
    height: 4px;
  }
}
</style>
