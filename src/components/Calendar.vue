<template>
  <div>
    <section class="calendar">
      <div
       class="calendar-grid"
       >
       <!-- v-on:scroll="handleScroll" -->
        <div class="weekday-card" v-for="element in weekday" :key="element">
          {{ element }}
        </div>
        <div
          class="day-card"
          v-for="(day, indexDays) in shiftWeekDays"
          :key="indexDays"
        >
          <Day :day="day"> </Day>
        </div>
      </div>
    </section>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
import Day from "@/components/Day";
import { eventBus } from "../main";

export default {
  name: "Calendar",
  data: function () {
    return {
      viewWeekShift: 0,
      todos: [],
      importantDays: [],
      // scrollPosition: 0,
    };
  },
  components: {
    Day,
  },

  created() {
    eventBus.$on("changeWeekToNow", () => {
      this.viewWeekShift = 0;
    });

    eventBus.$on("changeWeekToPast", () => {
      this.viewWeekShift -= 1;
    });

    eventBus.$on("changeWeekToFuture", () => {
      this.viewWeekShift += 1;
    });

    eventBus.$on("updateTodoList", (todo) => {
      this.todos.push(todo);
      this.sortTimeValue;
    });

    eventBus.$on("editTodoValue", (todo) => {
      const indexOfEditValue = this.todos.findIndex((t) => t.idTodo === todo.todoId);
      this.todos[indexOfEditValue].todoValue = todo.todoNewValue
    });

    eventBus.$on("editTodoTime", (todo) => {
      const indexOfEditTime = this.todos.findIndex((t) => t.idTodo === todo.todoId);
      this.todos[indexOfEditTime].timeValue = todo.todoNewTime
      this.sortTimeValue;
    });

    eventBus.$on("removeTodo", (id) => {
      this.todos = this.todos.filter((t) => t.idTodo !== id);
    });
  },

  computed: {
    shiftWeekDays: {
      get: function () {
        const filterTodos = this.filterTodos;
        const shift = this.viewWeekShift;
        const startOfWeek = moment().startOf("week").add(shift, "week");
        let days = new Array(28).fill(null).map(function (todo, index) {
          return {
            dayMonth: moment(startOfWeek).add(index, "days"),
            todos: filterTodos(startOfWeek, index),
          };
        });
        return days;
      },
    },

    weekday() {
      const week = this.getWeekday(7);
      return week;
    },

    sortTimeValue() {
      const convertTime = this.convertTime;
      return this.todos.sort(
        (a, b) => convertTime(a.timeValue) - convertTime(b.timeValue)
      );
    },
  },

  methods: {
    convertTime(stringTime) {
      return stringTime !== "" ? Number(stringTime.split(":").join("")) : 0;
    },

    filterTodos(startOfWeek, index) {
      const compareElements = function (a, b) {
        return parseInt(a, 10) === parseInt(b, 10);
      };

      return this.todos.filter((e) =>
        compareElements(
          e.dateOfTodo,
          moment(startOfWeek).add(index, "days").format("DDMMYYYY")
        )
      );
    },

    getWeekday(daysInWeek) {
      const startOfWeek = moment().startOf("week");
      const weekdays = [];
      for (let i = 0; i <= daysInWeek - 1; i++) {
        weekdays.push(moment(startOfWeek).add(i, "days").format("dddd"));
      }
      return weekdays;
    },

    // handleScroll(e) {
    //    const currentScrollPosition = e.srcElement.scrollTop;
    // if (currentScrollPosition > this.scrollPosition) {
    //     console.log("Scrolling down");
    // }
    // this.scrollPosition = currentScrollPosition;
    // },
  },
};
</script>

<style >
.calendar {
  border-top: 0.001em solid rgb(222, 220, 224);
}

.weekday-card {
  text-align: center;
  font-size: calc(10px + 0.3vw);
  font-family:'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  height: 1.5em;
  margin-top: 5px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-gap: 2px;
  border-bottom: 1px solid rgb(222, 220, 224);
}
.day-card {
  border: 1px dotted rgb(222, 220, 224);
  padding: 5px;
  min-height: 7rem;
}


</style>