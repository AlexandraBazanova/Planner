<template>
  <div>
    <section class="widget-bar">
      <section class="menu">
        <div class="icon-menu" @click="showModal" tabindex="0">
          <mdicon name="menu" width="35" height="35" />
        </div>

        <Menu ref="modal">
        </Menu>

        <div class="calendar-buttons">
          <button class="button-past" @click="toNow">
            <mdicon name="chevron-double-up" width="20" height="20" />
          </button>

          <button class="button-past" @click="toPast">
            <mdicon name="chevron-up" width="20" height="20" />
          </button>
          <button class="button-future" @click="toFuture">
            <mdicon name="chevron-down" width="20" height="20" />
          </button>
        </div>
      </section>

      <section class="notes">
        <p v-purple>Заметки</p>
        <Notes />
      </section>

      <section class="two-months">
        <MiniCalendar class="mini-calendar1" />
      </section>
    </section>
  </div>
</template>

<script type = "text/javascript" >
import Menu from "@/components/Menu";
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
    MiniCalendar,
    Notes,
    Menu,
  },

  methods: {
    toNow() {
      eventBus.$emit("changeWeekToNow");
    },

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

    showModal: function () {
      this.$refs.modal.show = true;
    },

    // sendDataFunction: function () {
    //   // обработчик отправки данных
    // },
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
  font-size: calc(9px + 0.3vw);
  margin: 0.1rem;
}
.widget-bar {
  display: grid;
  grid-template-columns: 0.12fr 2fr 1fr;
  grid-gap: 1px;
  font-size: calc(9px + 0.3vw);
  border: none;
  margin: 0.1rem;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}

.icon-menu {
  color: rgb(162, 160, 160);
  cursor: pointer;
}
.icon-calendar {
  color: rgb(162, 160, 160);
  cursor: pointer;
}

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
  font-size: calc(9px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0.1rem;
  outline-color: rgb(220, 211, 211);
}

.button-future {
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(9px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0.1rem;
  outline-color: rgb(220, 211, 211);
}
.button-future:hover {
  background-color: #93c9bd;
  color: white;
}
.button-past:hover {
  background-color: #93c9bd;
  color: white;
}
</style>