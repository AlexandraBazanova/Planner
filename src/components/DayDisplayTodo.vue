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
            v-bind:class="{ done: todo.isComplete }"
            v-model="todo.timeValue"
            v-on:click="editTimeValue"
            required
          />

          <span
           class="input-todovalue"
           v-if="!editTodo"
           v-on:dblclick="editTodo = true"
           >
          {{ todo.todoValue }}
          </span>

          <input
           type="text"
            v-else
            v-focus
            v-model="todo.todoValue"
            v-on:change="editValue"
          >


        </span>
      </label>
    </span>
    <button
      class="rm"
      v-on:click="removeOneTodo(todo.idTodo)"
      v-bind:class="{ done: todo.isComplete }"
    >
      &cross;
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
    return {
      // todoValue: "",
      // timeValue: "",
      editTodo: false,
    };
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

    editTimeValue() {
      const todoNewTime = this.todo.timeValue;
      const todoId = this.todo.idTodo;
      eventBus.$emit("editTodoTime", {todoId, todoNewTime});
    },

    editValue() {
      const todoNewValue = this.todo.todoValue;
      const todoId = this.todo.idTodo;
      eventBus.$emit("editTodoValue", {todoId, todoNewValue});
      this.editTodo = false;
    },

    removeOneTodo(idTodo) {
      eventBus.$emit("removeTodo", idTodo);
    },
  },

directives: {
    focus: {
      inserted: function (el) {
          el.focus();
        }
    } 
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
  font-family: 'Times New Roman', Times, serif;
  align-self: flex-start;
  outline-color: rgb(220, 211, 211);
}

::-webkit-calendar-picker-indicator {
  display: none;
}
.rm {
  color: rgb(32, 28, 28);
  background: none;
  border: none;
  align-self: flex-end;
  font-size: calc(5px + 0.3vw);
}

.done {
  color: rgb(215, 211, 220);
  text-decoration: line-through;
}
</style>