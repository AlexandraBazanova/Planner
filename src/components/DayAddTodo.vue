<template>
  <div>
    <div class="day-form">
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
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
import { eventBus } from "../main";

export default {
  name: "DayAddTodo",
  data: function () {
    return {
      todoValue: ''
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
    'focus': {
      inserted: function (el, binding) {
        if(binding.value.toString().substr(0, 15) == moment()._d.toString().substr(0, 15)){
          el.focus()
        }
      },
      update: function (el, binding) {
        if(binding.value.toString().substr(0, 15) == moment()._d.toString().substr(0, 15)){
          el.focus()
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
      eventBus.$emit("updateTodoList", {
        dateOfTodo,
        todoValue,
        idTodo,
        isComplete,
      });
       this.todoValue = "";
    },
  },
};
</script>  

<style scoped>
.daily-todo {
  width: calc(100% - 1em);
  font-size: calc(9px + 0.3vw);
  text-align: left;
  border: hidden;
  border-bottom: 1px dotted rgb(162, 160, 160);
}
.day-form {
  display: grid;
  grid-template-columns: 1fr;
}
</style>