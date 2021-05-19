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
          <Day :day="day" v-on:updateTodoList="updateTodoList"> </Day>
        </div>
      </div>
    </section>
    <button @click="todos.push({ title: 'testtso' })" class="button-test">
      button-test
    </button>
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
import Day from "@/components/Day";

export default {
  name: "Calendar",
  data: function () {
    return {
      viewWeekShift: 0,
      todos: [
        {
          dateOfTodo: null,
          todoValue: null,
        },
      ],
    };
  },
  components: {
    Day,
  },

  computed: {
    shiftWeekDays: {
      get: function () {
        const g = this;
        const shift = this.viewWeekShift;
        const startOfWeek = moment().startOf("week").add(shift, "week");
        let days = new Array(28).fill(null).map(function (todo, index) {
          return {
            dayMonth: moment(startOfWeek).add(index, "days"),
            todos: g.filterTodos(startOfWeek, index),
          };
        });
        return days;
      },
      // set: function (value) {
      //   this.days.filteredTodos = value;
      // },
    },

    weekday() {
      const week = this.getWeekday(7);
      return week;
    },
  },

  methods: {
    filterTodos(startOfWeek, index) {

      const compareElements = function(a, b){
        return parseInt(a, 10) === parseInt(b, 10)
      }
      
      return this.todos.filter((e) =>
        compareElements(e.dateOfTodo, moment(startOfWeek).add(index, "days").format("DDMMYYYY"))
      );
    },

    updateInput(todoValue, dateOfTodo) {
      console.log(todoValue, dateOfTodo);
    },

    updateTodoList(e) {
      this.todos.push(e);
      // console.log(typeof(e.dateOfTodo))
    },

    getWeekday(daysInWeek) {
      const startOfWeek = moment().startOf("week");
      const weekdays = [];
      for (let i = 0; i <= daysInWeek - 1; i++) {
        weekdays.push(moment(startOfWeek).add(i, "days").format("dddd"));
      }
      return weekdays;
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
  height: 15rem;
}
.button-past {
  background-color: rgb(112, 110, 115);
  font-size: calc(10px + 0.3vw);
}

.button-future {
  background-color: rgb(199, 204, 204);
  font-size: calc(10px + 0.3vw);
}
</style>