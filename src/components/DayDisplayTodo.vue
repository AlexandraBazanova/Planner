<template>
  <li>
    <span v-bind:class="{ done: todo.isComplete }">
      <label class="custom-checkbox">
        <input
          type="checkbox"
          v-on:change="completeTodo(todo)"
          v-bind:checked="todo.isCommplete"
        />
        <span class="todo-value">
          <input
            class="input-time"
            type="time"
            :value="todo.timeValue"
            v-bind:class="{ done: todo.isComplete }"
            required
          />
          {{ todo.todoValue }}
        </span>
      </label>
    </span>
    <button
      class="rm"
      v-on:click="removeOneTodo(todo.idTodo)"
      v-bind:class="{ done: todo.isComplete }"
    >
      &times;
    </button>
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
    completeTodo(todo) {
      todo.isComplete = !todo.isComplete;
    },

    removeOneTodo(idTodo) {
      eventBus.$emit("removeTodo", idTodo);
    },
  },
};
</script>  

<style scoped>
li {
  display: flex;
  border-bottom: 1px dotted rgb(162, 160, 160);
  justify-content: space-between;
}
.todo-value {
  font-size: calc(9px + 0.3vw);
  margin-left: 0.1em;
  align-self: flex-start;
  text-overflow: clip;
}

input[type="time"] {
  border: none;
  font-size: calc(9px + 0.3vw);
  align-self: flex-start;
}

::-webkit-calendar-picker-indicator {
  display: none;
}
.rm {
  color: rgb(32, 28, 28);
  background: none;
  border: none;
  align-self: flex-end;
}

.done {
  color: rgb(215, 211, 220);
  text-decoration: line-through;
}
</style>