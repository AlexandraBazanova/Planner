<template>
  <div id="app">
    <section class="main-calendar">
      <TodoList />
      <Calendar />
      <section class="footer-calendar">
        <p class="footer-text">
          &copy; 2021 Александра Базанова || Демоверсия приложения «Планировщик дел "4 недели"»
        </p>
      </section>
    </section>
  </div>
</template>

<script>
import "moment/locale/ru";
import Menu from "@/components/Menu";
import TodoList from "@/components/TodoList";
import Calendar from "@/components/Calendar";

export default {
  name: "app",
  data() {
    return {
      now: "",
    };
  },

  computed: {},
  methods: {
    logthis: function () {
      console.log(this);
    },
  },

  components: {
    Menu,
    TodoList,
    Calendar,
  },
};
</script>

<style scoped>
.main-calendar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border: none;
}
.footer-calendar {
  display: flex;
  width: 100%;
  border: none;
  justify-content: flex-end;
}
.footer-text {
  font-size: calc(9px + 0.2vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  text-align: end;
  padding: 0.1em;
  padding-right: 1em;
  margin: 0.1em; 
}
</style>
``