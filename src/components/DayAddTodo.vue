<template>
  <div>
    <div class="day-form">
      <div>
        <input type="time" v-model="timeValue" required/>
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
      timeValue: null,
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
}
.daily-todo {
  width: calc(90% + 0.3vw);
  font-size: calc(9px + 0.3vw);
  text-align: left;
  border: hidden;
  border-bottom: 1px dotted rgb(162, 160, 160);
  float: left;
  margin-left: 0.5em;
}
.button-chooseTime {
  background-color: white;
  float: left;
}

input[type="time"]{
  border: none;
}

::-webkit-calendar-picker-indicator {
   display: none; 
}

input[type="time"]::-webkit-clear-button {
    display: none;
}

</style>