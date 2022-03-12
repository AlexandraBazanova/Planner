<template>
  <div>
    <section class="calendar" @click="closeModalColor">
      <div class="calendar-grid">
        <!-- v-on:scroll="handleScroll" -->
        <div
          class="weekday-card"
          v-for="element in weekday"
          :key="element"
          v-bind:class="{ sunday: element === 'воскресенье' }"
        >
          {{ element }}
        </div>
        <div
          class="day-card"
          v-for="(day, indexDays) in shiftWeekDays"
          :key="indexDays"
        >
          <Day
            v-on:addImportantday="addImportantday"
            :day="day"
            :colorOfImportantDay="colorOfImportantDay"
          >
          </Day>
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
import axios from "axios";

export default {
  name: "Calendar",
  data: function () {
    return {
      viewWeekShift: 0,
      todos: [],
      importantDays: [],
      colorOfImportantDay: "#a8cdd353",

      // scrollPosition: 0,
    };
  },
  components: {
    Day,
  },

  created() {
    axios
      .get("https://stoplight.io/mocks/fak/chronos/34033455/api/v1/todo")
      .then((response) => (this.todos = response.data));

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
      fetch("https://stoplight.io/mocks/fak/chronos/34033455/api/v1/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `${todo.id, todo.date, todo.time, todo.value, todo.isComplete, todo.isImportant}`
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
      axios
        .get("https://stoplight.io/mocks/fak/chronos/34033455/api/v1/todo")
        .then((response) => (this.todos = response.data));
      // this.todos.push(todo);
      // this.sortTimeValue;
      // console.log(todo.id)
    });
    eventBus.$on("editPropertiesTodo", (todo) => {
      const indexOfEditTodo = this.todos.findIndex((t) => t.id === todo.todoId);
      this.todos[indexOfEditTodo].date = todo.todoDate;
      this.todos[indexOfEditTodo].time = todo.todoNewTime;
      this.todos[indexOfEditTodo].value = todo.todoNewValue;
      this.sortTimeValue;
      this.todos[indexOfEditTodo].isComplete = todo.todoComplete;
      this.todos[indexOfEditTodo].isImportant = todo.todoImportant;
      console.log(todo);
    });
    // eventBus.$on("editTodoValue", (todo) => {
    //   const indexOfEditValue = this.todos.findIndex((t) => t.id === todo.todoId);
    //   this.todos[indexOfEditValue].value = todo.todoNewValue;
    //   console.log(todo)
    // });

    // eventBus.$on("editTodoTime", (todo) => {
    //   const indexOfEditTime = this.todos.findIndex((t) => t.id === todo.todoId);
    //   this.todos[indexOfEditTime].time = todo.todoNewTime;
    //   this.sortTimeValue;
    //   console.log(todo)
    // });

    eventBus.$on("removeTodo", (id) => {
      this.todos = this.todos.filter((t) => t.id !== id);
      fetch(
        `https://stoplight.io/mocks/fak/chronos/34033455/api/v1/todo?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  },

  computed: {
    shiftWeekDays: {
      get: function () {
        const todos = this.todos;
        const filterTodos = this.filterTodos;
        const filterImportantdays = this.filterImportantdays;
        const shift = this.viewWeekShift;
        const startOfWeek = moment().startOf("week").add(shift, "week");
        // const currentDay = (startOfWeek, index) => {
        //   moment(startOfWeek).add(index, "days");
        // };

        let days = new Array(28).fill(null).map(function (todo, index) {
          return {
            dayMonth: moment(startOfWeek).add(index, "days"),
            todos: todos
              ? todos.filter(
                  (t) =>
                    t.date ==
                    moment(startOfWeek).add(index, "days").format("YYYY-MM-DD")
                )
              : [],
            importantDays: filterImportantdays(startOfWeek, index),
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
        (a, b) => convertTime(a.time) - convertTime(b.time)
      );
    },
  },

  methods: {
    closeModalColor: function () {
      eventBus.$emit("closeModalColors");
    },

    convertTime(stringTime) {
      return stringTime;
      // return stringTime !== "" ? Number(stringTime.split(":").join("")) : 0;
    },

    filterTodos(startOfWeek, index, todos) {
      return;
      // console.log(todos[0].date);
      // console.log(todos.filter(t => t.date === currentDay))
      // console.log(moment(startOfWeek).add(index, "days").format("YYYY-MM-DD"))
      // return todos.filter(t => t.date === moment(startOfWeek).add(index, "days").format("YYYY-MM-DD"))
      // const compareElements = function (a, b) {
      //   return parseInt(a, 10) === parseInt(b, 10);
      // };
      // return this.todos.filter((e) =>
      //   compareElements(
      //     e.date,
      //     moment(startOfWeek).add(index, "days").format("YYYY-MM-DD")
      //   )
      // );
    },

    filterImportantdays(startOfWeek, index) {
      return this.importantDays.filter(
        (e) =>
          e.dateOfImportantDay.toString() ===
          moment(startOfWeek).add(index, "days")._d.toString()
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

    addImportantday(importantDay) {
      return this.importantDays.findIndex(
        (e) => e.idImportantDay === importantDay.idImportantDay
      ) === -1
        ? this.importantDays.push(importantDay)
        : this.importantDays.splice(
            this.importantDays.findIndex(
              (e) => e.idImportantDay === importantDay.idImportantDay
            ),
            1
          );
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
  /* border: 0.001em solid rgb(222, 220, 224); */
  /* margin-left: 0.1em;
  margin-right: 0.1em; */
  padding-left: 0.2em;
  padding-right: 0.2em;
}

.weekday-card {
  text-align: center;
  font-size: calc(10px + 0.3vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  /* color: rgb(72, 72, 72); */
  color: white;
  background-color: #a8cdd3d0;
  height: 1.5em;
  margin-top: 2px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-gap: 2px;
  /* border-bottom: 0.001em solid rgb(222, 220, 224); */
  padding-bottom: 2px;
}
.day-card {
  border: 1px dotted rgb(222, 220, 224);
  padding: 5px;
  min-height: 7.15rem;
  background-color: white;
}
.sunday {
  /* color: #d08467; */
  color: #4f7a80;
}
</style>