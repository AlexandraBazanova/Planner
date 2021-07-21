<template>
  <div>
    <div class="day-form">
      <div>
        <input class="input-time" type="time" v-model="timeValue" required />
      </div>

      <div>
        <input
          class="daily-todo"
          type="text"
          v-on:change="updateinput($event.target.value)"
          v-model="todoValue"
          v-if="day.todos.length < 7"
          v-focus="day.dayMonth._d"
        />
      </div>
    </div>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
import { eventBus } from "../main";

export default {
  name: "DayAddTodo",

  data: function () {
    return {
      todoValue: "",
      timeValue: "",
    };
  },

  props: {
    day: {
      type: Object,
      required: true,
    },
  },

  computed: {},

  created() {},

  directives: {
    focus: {
      inserted: function (el, binding) {
        if (
          binding.value.toString().substr(0, 15) ==
          moment()._d.toString().substr(0, 15)
        ) {
          el.focus();
        }
      },
      update: function (el, binding) {
        if (
          binding.value.toString().substr(0, 15) ==
          moment()._d.toString().substr(0, 15)
        ) {
          el.focus();
        }
      },
    },
  },

  methods: {
    displayDateNumberFormat(date, formatType) {
      return moment(date).format("DDMMYYYY");
    },

    updateinput(todoValue) {
      const dateOfTodo = this.displayDateNumberFormat(this.day.dayMonth._d);
      const idTodo = moment().format("x");
      const isComplete = false;
      const timeValue = this.timeValue;
      eventBus.$emit("updateTodoList", {
        dateOfTodo,
        todoValue,
        idTodo,
        isComplete,
        timeValue,
      });
      this.todoValue = "";
      this.timeValue = "";
    },
  },
};
</script>  

<style scoped>
.day-form {
  display: flex;
  padding: 0.1rem;
}
.input-time {
  font-size: calc(10px + 0.3vw);
}
.daily-todo {
  width: calc(90% + 0.3vw);
  font-size: calc(9px + 0.3vw);
  text-align: left;
  border: hidden;
  border-bottom: 1px dotted rgb(162, 160, 160);
  float: left;
  margin-left: 0.5em;
  outline-color: rgb(220, 211, 211);
}
.button-chooseTime {
  background-color: rgb(162, 160, 160);
  float: left;
}

input[type="time"] {
  border: none;
  font-family: 'Times New Roman', Times, serif;
  font-size: calc(9px + 0.3vw);
  outline-color: rgb(220, 211, 211);
}

::-webkit-calendar-picker-indicator {
  display: none;
}

input[type="time"]::-webkit-clear-button {
  display: none;
}
</style>