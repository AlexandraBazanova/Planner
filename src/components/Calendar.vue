<template>
  <div>
    <button class="button-past" @click="viewWeekShift -= 1">
      Назад &#11014;
    </button>
    <button class="button-future" @click="viewWeekShift += 1">
      Вперёд &#11015;
    </button>
    <br />
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
          <Day :day="day"> </Day>
        </div>
      </div>
    </section>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
import lodash from "lodash";
import Day from "@/components/Day";
import { eventBus } from "../main";

export default {
  name: "Calendar",
  data: function () {
    return {
      viewWeekShift: 0,
      todos: [],
    };
  },
  components: {
    Day,
  },

  created() {
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
  },
};
</script>

<style >
.weekday-card {
  /* border: 1px solid rgb(222, 220, 224); */
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
  border: 1px dotted rgb(222, 220, 224);
  padding: 5px;
  height: 9rem;
}
.button-past {
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(10px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0.1rem;
}

.button-future {
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(10px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  
}
.button-future:hover {
  background-color: #93c9bd;
  color: white;
}
.button-past:hover {
  background-color: #93c9bd;
  color: white;
  /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
</style>