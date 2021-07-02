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
          <Day :day="day"
          > 
           </Day>
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
import lodash from 'lodash'
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

  created() {
    eventBus.$on("updateTodoList", (todo) => {
      this.todos.push(todo);
    });

    eventBus.$on("removeTodo", (id) => {
      this.todos = this.todos.filter(t => t.idTodo !== id)

    });
  },

  methods: {
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
  background-color: #b2d9d0;
  border-color:#93c9bd;
  font-size: calc(10px + 0.3vw);
  border-radius: 6px;
}

.button-future {
  background-color: #b2d9d0;
  border-color:#93c9bd;
  font-size: calc(10px + 0.3vw);
  border-radius: 6px;
}
.button-future:hover {
    background-color: #93c9bd;
    color: white;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.button-past:hover {
    background-color: #93c9bd;
    color: white;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
</style>