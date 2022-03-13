<template>
  <li v-bind:class="{ important: todo.isImportant }">
    <span v-bind:class="{ done: todo.isComplete }">
      <label class="custom-checkbox">
        <input
          type="checkbox"
          v-model="todo.isComplete"
          v-on:change="completeTodo(todo)"
        />
          <!-- v-bind:checked="todo.isCommplete" -->
        <span class="todo-span">
          <input
            class="input-time"
            type="time"
            v-bind:class="{ done: todo.isComplete }"
            v-model="todo.time"
            v-on:keyup.enter="editTime(todo)"
            v-on:click="editTime(todo)"
            required
          />
          <!-- v-model todo.time - попытка присвоения в пропс - ну нельзя так!! -->
          <span
            class="span-todovalue"
            v-bind:class="{ done: todo.isComplete }"
            v-if="!editTodo"
            v-on:dblclick="editTodo = true"
            tabindex="0"
          >
            {{ todo.value }}
          </span>

          <input
            class="input-todovalue"
            type="text"
            v-else
            v-focus
            v-model="todo.value"
            v-on:change="editValue(todo)"
            @blur="editTodo = false"
          />
        </span>
      </label>
    </span>

    <button
      class="important-todo"
      v-on:click="importantTodo(todo)"
      v-bind:class="{ done: todo.isComplete }"
    >
      !
    </button>

    <button
      class="rm"
      v-on:click="removeOneTodo(todo.id)"
      v-bind:class="{ done: todo.isComplete }"
    >
      X
      <!-- &cross; -->
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
    editTime(todo) {
      const todoDate = this.todo.date;
      const todoId = this.todo.id;
      const todoNewTime = this.todo.time;
      const todoNewValue = this.todo.value;
      const todoImportant = this.todo.isImportant;
      const todoComplete = this.todo.isComplete;
      eventBus.$emit("editPropertiesTodo", {
        todoId,
        todoDate,
        todoNewTime,
        todoNewValue,
        todoComplete,
        todoImportant,
      });
    },

    editValue(todo) {
      const todoDate = this.todo.date;
      const todoId = this.todo.id;
      const todoNewTime = this.todo.time;
      const todoNewValue = this.todo.value;
      const todoImportant = this.todo.isImportant;
      const todoComplete = this.todo.isComplete;
      eventBus.$emit("editPropertiesTodo", {
        todoId,
        todoDate,
        todoNewTime,
        todoNewValue,
        todoComplete,
        todoImportant,
      });
      this.editTodo = false;
    },
    importantTodo(todo) {
      const todoDate = this.todo.date;
      const todoId = this.todo.id;
      const todoNewTime = this.todo.time;
      const todoNewValue = this.todo.value;
      const todoImportant = !this.todo.isImportant;
      const todoComplete = this.todo.isComplete;
      eventBus.$emit("editPropertiesTodo", {
        todoId,
        todoDate,
        todoNewTime,
        todoNewValue,
        todoComplete,
        todoImportant,
      });
    },
    completeTodo(todo) {
      const todoDate = this.todo.date;
      const todoId = this.todo.id;
      const todoNewTime = this.todo.time;
      const todoNewValue = this.todo.value;
      const todoImportant = this.todo.isImportant;
      const todoComplete = !this.todo.isComplete;
      eventBus.$emit("editPropertiesTodo", {
        todoId,
        todoDate,
        todoNewTime,
        todoNewValue,
        todoComplete,
        todoImportant,
      });
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
  border-bottom: 1px dotted rgb(222, 220, 224);
  font-size: calc(11px + 0.2vw);
  justify-content: space-between;
  color: rgb(72, 72, 72);
}
.todo-span {
  font-family: "Source Sans Pro", sans-serif;
  font-display: auto;
  margin-left: 0.1em;
}

.input-todovalue:focus {
  outline-color: rgb(220, 211, 211);
  border: hidden;
}
.span-todovalue {
  justify-content: space-between;
  outline-color: rgb(220, 211, 211);
}
.input-time {
  border: none;
  background-color: inherit;
  font-size: inherit;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-display: auto;
  color: rgb(72, 72, 72);
  float: left;
}
input[type="time"]:focus {
  outline-color: rgb(220, 211, 211);
}
::-webkit-calendar-picker-indicator {
  display: none;
}
.important {
  font-weight: 900;
  /* color: #377f89; */
  color: #6e260a;
  text-transform: uppercase;
}
.important-todo {
  background: none;
  border: none;
  border-radius: 4px;
  font-size: calc(11px + 0.2vw);
  outline-color: rgb(220, 211, 211);
  margin-left: auto;
  padding: 0;
  width: 1em;
  /* align-self: center; */
  min-height: 1.7em;
}

.important-todo:hover {
  font-weight: 900;
  transition: all 0.5s ease;
}

.rm {
  /* color: rgb(32, 28, 28); */
  background: none;
  border: none;
  border-radius: 4px;
  font-size: calc(7px + 0.2vw);
  font-weight: 200;
  outline-color: rgb(220, 211, 211);
  padding: 0;
  align-self: center;
  min-height: 1.7em;
  width: 0.8em;
}

.rm:hover {
  /* background-color: #e7f3f5; */
  /* font-size: calc(7px + 0.05vw); */
  text-transform: uppercase;
  font-weight: 900;
  transition: all 0.5s ease;
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