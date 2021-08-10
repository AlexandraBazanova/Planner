<template>
  <div>
    <div class="day-form">
      <div
        class="icon-clock"
        v-if="!fillTime"
        v-on:click="fillTime = true"
        v-on:keyup.tab="fillTime = true"
        tabindex="0"
      >
        <mdicon name="clock-outline" width="20" height="20" 
        v-if="day.todos.length < 6"/>
      </div>

      <div v-else>
        <input
          class="input-time"
          type="time"
          v-if="day.todos.length < 6"
          v-model="timeValue"
          v-focus="fillTime = true"
          required
        />
      </div>

      <div class="daily-todo">
        <input
          class="input-todo"
          type="text"
          v-on:change="updateinput($event.target.value)"
          v-model="todoValue"
          v-if="day.todos.length < 6"
          v-focus="day.dayMonth._d"
          @blur="fillTime = false"
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
      fillTime: false,
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
      // update: function (el, binding) {
      //   if (
      //     binding.value.toString().substr(0, 15) ==
      //     moment()._d.toString().substr(0, 15)
      //   ) {
      //     el.focus();
      //   }
      // },
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
      const isImportant = false;
      const timeValue = this.timeValue;
      eventBus.$emit("updateTodoList", {
        dateOfTodo,
        todoValue,
        idTodo,
        isComplete,
        timeValue,
        isImportant,
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
/* .input-time {
  font-size: calc(10px + 0.3vw);
} */
.daily-todo {
  width: calc(97% + 0.3vw);
}
.input-todo {
  width: calc(90% + 0.3vw);
  font-size: calc(9px + 0.3vw);
  font-family:'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  /* text-align: left; */
  border: hidden;
  border-bottom: 1px dotted rgb(162, 160, 160);
  /* float: left; */
  margin-left: 0.5em;
  outline-color: rgb(220, 211, 211);
}
.button-chooseTime {
  background-color: rgb(162, 160, 160);
  float: left;
}

input[type="time"] {
  border: none;
  font-size: calc(9px + 0.3vw);
  font-family:'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  outline-color: rgb(220, 211, 211);
}

::-webkit-calendar-picker-indicator {
  display: none;
}

input[type="time"]::-webkit-clear-button {
  display: none;
}

.icon-clock {
  color: rgb(162, 160, 160);
  outline-color: rgb(220, 211, 211);
}
</style>