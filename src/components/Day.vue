<template>
  <div>
    <div class="date-of-the-day">
      {{ displayDate(day.dayMonth) }}
    </div>
    <form
      class="day-form"
      @addTodo.prevent="addTodo"
      v-if="todos !== undefined"
    >
      <div v-for="(item, index) in day.todos" :key="index">
        <input
          class="daily-todo"
          v-on:keyup.13="addTodo($event.target.value, day.dayMonth._d)"
          v-bind:value="item"
          v-on:change="$emit('updateInput', $event.target.value)"
        />
      </div>
    </form>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";

export default {
  name: "Day",
  data: function () {
    return {
      todos: {},
    };
  },

  props: {
    day: Object,
  },

  created: function () {
    // console.log(this.day);
    // console.log(this.day.todos);
  },

  // directives: {
  //   'focus': {
  //     inserted: function (el) {
  //       day.dayMonth._d === moment() ? el.focus() : false;
  //     },
  //   },
  // },

  methods: {
    displayDate(date, formatType) {
      return moment(date).format("D MMMM");
    },
   
  },
};
</script>

<style scoped>
.date-of-the-day {
  text-align: center;
  font-size: calc(10px + 0.3vw);
  width: calc(100% - 1em);
}
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