<template>
  <div>
    <section class="calendar">
      <div class="calendar-grid">
        <div class="weekday-card" v-for="element in weekday" :key="element">
          {{ element }}
        </div>
        <div
          class="day-card"
          v-for="(day, indexDays) in shiftWeekDays"
          :key="indexDays"
        >
          <div class="date-of-the-day">
            {{ displayDate(day.dayMonth) }}
          </div>
          <input
            class="daily-todo"
            v-on:keyup.13="addTodo($event.target.value, day.dayMonth._d)"
          />

          <div v-for="(item, index) in day.todos" :key="index">
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </section>
    <br />
    <button @click="viewWeekShift -= 1" class="button-past">
      Тёмное прошлое &#11014;
    </button>
    <button @click="viewWeekShift += 1" class="button-future">
      Светлое будущее &#11015;
    </button>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
export default {
  data() {
    return {
      viewWeekShift: 0,
      todos: {},
    };
  },
  computed: {
    shiftWeekDays: {
      get: function () {
        const shift = this.viewWeekShift;
        let days = this.getShiftWeeks(shift, 4);
        return days;
      },
      set: function (value) {
        this.days.filteredTodos = value;
      },
    },
    weekday() {
      const week = this.getWeekday(7);
      return week;
    },
  },

  methods: {
    addTodo(value, id) {
      this.todos[id] = value;
      console.log('value '+value);
    },

    filterTodos(dateOfTheDay) {
      const g = this;
      const filteredTodos = g.todos.filter(
        (e) => e.dateOfTheDay == dateOfTheDay
      );
      return filteredTodos();
    },

    getValueTodo(viewWeekShift, index) {
      const startOfWeek = moment().startOf("week").add(viewWeekShift, "week");
     // console.log(moment(startOfWeek).add(index, "days"))
      return this.todos[moment(startOfWeek).add(index, "days")]
    },
    
    getShiftWeeks(viewWeekShift, amount, item) {
      const g = this;
      const startOfWeek = moment().startOf("week").add(viewWeekShift, "week");
      
      return new Array(amount * 7).fill(null).map(function (item, index) {
        return {
          dayMonth: moment(startOfWeek).add(index, "days"),
          // todos: this.todos[moment(startOfWeek).add(index, "days")],
          todos: g.getValueTodo(index)
        };
      });
    },
    
    getWeekday(daysInWeek) {
      const startOfWeek = moment().startOf("week");
      const weekdays = [];
      for (let i = 0; i <= daysInWeek - 1; i++) {
        weekdays.push(moment(startOfWeek).add(i, "days").format("dddd"));
      }
      return weekdays;
    },
    displayDate(date, formatType) {
      return moment(date).format("D MMMM");
    },
  },
};
</script>

<style>
.weekday-card {
  border: 1px solid rgb(183, 181, 186);
  text-align: center;
  font-size: calc(10px + 0.3vw);
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-gap: 2px;
  border: 1px solid rgb(183, 181, 186);
}
.day-card {
  border: 1px solid rgb(183, 181, 186);
  padding: 5px;
  height: 10rem;
}
.button-past {
  background-color: rgb(112, 110, 115);
  font-size: calc(10px + 0.3vw);
}

.button-future {
  background-color: rgb(199, 204, 204);
  font-size: calc(10px + 0.3vw);
}
.date-of-the-day {
  text-align: center;
  font-size: calc(10px + 0.3vw);
  width: calc(100% - 1em);
}
.daily-todo {
  width: calc(100% - 1em);
  font-size: calc(9px + 0.3vw);
  text-align: left;
  border: hidden;
  border-bottom: 1px dotted rgb(162, 160, 160);
}
</style>