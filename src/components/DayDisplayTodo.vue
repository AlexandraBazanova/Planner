<template>
  <li>
    <span v-bind:class="{done: todo.isComplete}">
      <label class="custom-checkbox"
      >
        <input type="checkbox" 
        v-on:change = completeTodo(todo)
        v-bind:checked="todo.isCommplete"
        />
        <span >
          {{ todo.todoValue }}
        </span>
      </label>
      <button class="rm"
      
       v-on:click="removeOneTodo(todo.idTodo)">
        &times;
      </button>
    </span>
  </li>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
import { eventBus } from "../main";

export default {
  name: "DayDisplayTodo",
  data: function () {
    return {};
  },

  props: {
    todo: {
      type: Object,
      required: true,
    },
    
  },

  methods: {
    // displayDateNumberFormat(date, formatType) {
    //   return moment(date).format("DDMMYYYY");
    // },

    completeTodo(todo) {
      todo.isComplete = !todo.isComplete;
    },

    removeOneTodo(idTodo) {
      eventBus.$emit("removeTodo", idTodo)
      },
  },
};
</script>  

<style scoped>
li {
  display: flex;
  border-bottom: 1px dotted rgb(162, 160, 160);
}

.rm {
  color: rgb(32, 28, 28);
  background: none;
  border: none;
}
.done {
  color: rgb(215, 211, 220);
  text-decoration: line-through;
}
</style>