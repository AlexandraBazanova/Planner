<template>
  <li v-bind:class="{ important: todo.isImportant }">
    <span v-bind:class="{ done: todo.isComplete}">
      <label class="custom-checkbox">
        <input
          type="checkbox"
          v-on:change="completeTodo(todo)"
          v-bind:checked="todo.isCommplete"
        />
        <span class="todo-span">
          <input
            class="input-time"
            type="time"
            v-bind:class="{ done: todo.isComplete }"
            v-model="todo.timeValue"
            v-on:keyup.enter="editTimeValue"
            v-on:click="editTimeValue"
            required
          />

          <span
            class="input-todovalue"
            v-if="!editTodo"
            v-on:dblclick="editTodo = true"
            tabindex="0"
          >
            {{ todo.todoValue }}
          </span>

          <input
            type="text"
            v-else
            v-focus
            v-model="todo.todoValue"
            v-on:change="editValue"
            @blur="editTodo = false"
          />
        </span>
      </label>
    </span>

    <button
      class="important-todo"
      v-on:click="importantTodo(todo)"
      v-bind:class="{ done: todo.isComplete}"
    >
      !
    </button>

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
      eventBus.$emit("editTodoTime", { todoId, todoNewTime });
    },

    editValue() {
      const todoNewValue = this.todo.todoValue;
      const todoId = this.todo.idTodo;
      eventBus.$emit("editTodoValue", { todoId, todoNewValue });
      this.editTodo = false;
    },
    importantTodo(todo) {
      todo.isImportant = !todo.isImportant;
    },

    removeOneTodo(idTodo) {
      eventBus.$emit("removeTodo", idTodo);
    },
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>  

<style scoped>
li {
  display: flex;
  border-bottom: 1px dotted rgb(231, 226, 226);
  font-size: calc(10px + 0.2vw);
}
.todo-span {
  font-family: "Source Sans Pro", sans-serif;
  /* font-weight: 400; */
  font-display: auto;
  margin-left: 0.1em;
}

.input-todovalue:focus {
  outline-color: rgb(220, 211, 211);
}
.input-time {
  border: none;
  background-color: inherit;
  font-size: inherit;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-display: auto;
}
input[type="time"]:focus {
  outline-color: rgb(220, 211, 211);
}
::-webkit-calendar-picker-indicator {
  display: none;
}
.important {
  /* font-size: calc(13px + 0.1vw); */
  background-color: rgb(251, 250, 250);
  font-weight: 600;
  /* font-style: italic; */
  text-transform: uppercase;
}
.important-todo {
  /* color: rgb(32, 28, 28); */
  background: none;
  border: none;
  border-radius: 4px;
  /* align-self: flex-end; */
  font-size: calc(7px + 0.2vw);
  outline-color: rgb(220, 211, 211);
  margin-left: auto;
  padding: 0.1em;
  width: 1.35em;
}

  .important-todo:hover {
    background-color: rgb(251, 250, 250);
  }

.rm {
  /* color: rgb(32, 28, 28); */
  background: none;
  border: none;
  border-radius: 4px;
  font-size: calc(6px + 0.3vw);
  outline-color: rgb(220, 211, 211);
  padding: 0.1em;
  width: 1.3em;
}

.rm:hover {
  background-color: rgb(251, 250, 250);
}

.done {
  color: rgb(215, 211, 220);
  text-decoration: line-through;
}

.custom-checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
</style>