<template>
  <div>
    <div class="day-form">
      <div v-if="day.todos.length !== 0">
        <div v-for="(todo, index) in day.todos" :key="index">
          <input
            class="daily-todo"
            v-on:keyup.13="addTodo()"
            v-on:change="
              $emit(
                'updateInput',
                $event.target.value,
                displayDateNumberFormat(day.dayMonth._d)
              )
            "
          />
          {{ todo }}
          <!-- {{ day.todos }}
        {{ index }}
        {{ displayDateNumberFormat(day.dayMonth._d) }} -->
        </div>
      </div>
      <div v-else>
        <input
          class="daily-todo"
          v-on:keyup.13="addTodo()"
          v-on:change="
            $emit(
              'updateInput',
              $event.target.value,
              displayDateNumberFormat(day.dayMonth._d)
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";

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

  methods: {
    displayDateNumberFormat(date, formatType) {
      return moment(date).format("DDMMYYYY");
    },

    addTodo(value, dateOfTodo) {
      console.log("1");
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