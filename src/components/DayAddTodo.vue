<template>
  <div>
    <div class="day-form">
      <div v-if="day.todos.length !== 0">
        <div v-for="(todo, index) in day.todos" :key="index">
          <input class="daily-todo"
           type="text"
            v-on:change="updateinput($event.target.value)"
          />
        </div>
      </div>

      <div v-else>
        <input class="daily-todo" type="text" 
        v-on:change="updateinput($event.target.value)"

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
    return {};
  },

  props: {
    day: {
      type: Object,
      required: true,
    },
  },

  computed: {},

  created() {
    
  },

  methods: {
    displayDateNumberFormat(date, formatType) {
      return moment(date).format("DDMMYYYY");
    },

    updateinput(todoValue) {
      const dateOfTodo = this.displayDateNumberFormat(this.day.dayMonth._d);
      const idTodo = moment().format("x");
      const isComplete = false;
      eventBus.$emit("updateTodoList", {dateOfTodo, todoValue, idTodo, isComplete});
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