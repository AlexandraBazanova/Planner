<template>
  <div>
    <section class="widget-bar">
      <!-- <section class="urgent-todos">
        <p>Очень срочные дела</p>
        <select class="select-todo" v-model="filter">
          <option value="all">Все</option>
          <option value="completed">Завершённые</option>
          <option value="not-completed">Незавершённые</option>
        </select>
        <ul v-bind:todos="filteredTodos">
          <AddTodo v-if="todos.length < 5" @add-todo="addTodo"> </AddTodo>
          <TodoItem
            v-for="(todo, index) in filteredTodos"
            :key="todo.id"
            v-bind:todo="todo"
            v-bind:index="index"
            v-on:remove-todo="removeTodo"
            v-on:complete-todo="completeTodo"
          >
          </TodoItem>
        </ul>
      </section> -->

      <section class="menu">
        <!-- <p class="p-menu">Меню</p> -->
        <div class="icon-menu" tabindex="0">
          <mdicon name="menu" width="35" height="35" />
        </div>
        <Menu />

        <div class="calendar-buttons">
          <button class="button-past" @click="toPast">
            <mdicon name="arrow-up-bold" width="20" height="20" />
          </button>
          <button class="button-future" @click="toFuture">
            <mdicon name="arrow-down-bold" width="20" height="20" />
          </button>
        </div>
      </section>

      <section class="notes">
        <p v-purple>Заметки</p>
        <Notes />
      </section>

      <section class="two-months">
        <div v-if="!miniCalendar" v-on:click="miniCalendar = true">
          <mdicon
            class="icon-calendar"
            name="calendar-range"
            width="35"
            height="35"
          />
        </div>
        <div v-else>
          <p v-on:click="miniCalendar = false">Календарь</p>
          <MiniCalendar class="mini-calendar1" />
        </div>
      </section>
    </section>
  </div>
</template>

<script type = "text/javascript" >
import TodoItem from "@/components/TodoItem";
import AddTodo from "@/components/AddTodo";
import MiniCalendar from "@/components/MiniCalendar";
import Notes from "@/components/Notes";
import { eventBus } from "../main";

export default {
  name: "TodoList",
  data: function () {
    return {
      todos: [],
      filter: "all",
      miniCalendar: false,
    };
  },

  directives: {
    purple: {
      inserted: function (el) {
        el.style.color = "black";
      },
    },
  },

  components: {
    AddTodo,
    TodoItem,
    MiniCalendar,
    Notes,
  },

  methods: {
    toPast() {
      eventBus.$emit("changeWeekToPast");
    },

    toFuture() {
      eventBus.$emit("changeWeekToFuture");
    },

    addTodo(todo) {
      this.todos.push(todo);
    },

    completeTodo(id) {
      this.todos.filter((t) => t.id === id)[0].completed = !this.todos.filter(
        (t) => t.id === id
      )[0].completed;
    },

    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
  },

  computed: {
    filteredTodos() {
      if (this.filter === "all") {
        return this.todos;
      }
      if (this.filter === "completed") {
        return this.todos.filter((t) => t.completed === true);
      }
      if (this.filter === "not-completed") {
        return this.todos.filter((t) => t.completed === false);
      }
    },
  },
};
</script>

<style scoped>
/* ul {
  padding: 0.1em;
  margin: 0;
} */
p {
  font-size: calc(11px + 0.3vw);
  /* align-self: center; */
  margin: 0.1rem;
}
/* .select-todo {
  font-size: calc(9px + 0.3vw);
} */
.widget-bar {
  display: grid;
  grid-template-columns: 0.12fr 2fr 1fr;
  grid-gap: 1px;
  font-size: calc(11px + 0.3vw);
  border: none;
  margin: 0.1rem;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-display: auto;
  /* vertical-align: baseline;

  justify-content: space-around; */
}

.icon-menu {
  color: rgb(162, 160, 160);
}
.icon-calendar {
  color: rgb(162, 160, 160);
}

/* .urgent-todos {
  font-size: calc(11px + 0.3vw);
  border: 1px solid rgb(183, 181, 186);
  text-align: center;
  background-color: rgb(253, 242, 248);
} */

.menu {
  /* text-align: center; */
  /* margin: 0.1rem; */
  padding: 0.2em;
  display: flex;
  /* height: 100%; */
  flex-direction: column;
  justify-content: space-between;
  /* align-self: end; */
}
.notes {
  text-align: center;
  /* padding: 0.2em; */
}
.two-months {
  text-align: center;
  border: none;
  display: flex;
  flex-direction: column;
}

.calendar-buttons {
  display: flex;
  /* height: 100%; */
  flex-direction: column;
}

.button-past {
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(10px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0.1rem;
}

.button-future {
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(10px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0.1rem;
}
.button-future:hover {
  background-color: #93c9bd;
  color: white;
}
.button-past:hover {
  background-color: #93c9bd;
  color: white;
  /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
</style>