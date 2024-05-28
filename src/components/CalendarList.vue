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
        ref="calendarButton"
        type="button"
        :date="formatNextDate(day)"
      >
        <p class="calendar__day">{{ dayOfWeek(day) }}</p>
        <p class="calendar__date">{{ formatNextDate(day).slice(0, 2) }}</p>
      </button>
      <div class="calendar__tasks">
        <div class="calendar__tasks-done"></div>
        <div class="calendar__tasks-notdone"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daysToRender: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      currentDate: new Date()
    }
  },
  methods: {
    nextDate(n) {
      return this.currentDate.getTime() + 86400000 * n
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
      console.log(day)
      this.$emit('changeDate', day)
    }
  },
  mounted() {
    this.$refs.calendarButton[0].focus()
    console.log(this.currentDate)
    console.log(
      new Date(this.nextDate(1))
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-')
    )
    console.log(this.$refs.calendarButton[0])
  },
  emits: ['changeDate']
}
</script>

<style scoped>
.calendar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
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
}
.calendar__date {
  color: #000;
  margin: 0;
}
.calendar__button:focus {
  outline: none;
  background-color: #000;
  color: #fff;
}
.calendar__button:focus-within .calendar__day {
  color: #fff;
}

.calendar__button:focus-within .calendar__date {
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
</style>
