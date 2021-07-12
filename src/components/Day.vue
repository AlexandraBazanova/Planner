<template>
  <div>
    <div class="date-of-the-day" v-bind:class="{ daytoday: isToday }">
      {{ displayDate(day.dayMonth) }}
    </div>
    <DayAddTodo :day="day"> </DayAddTodo>
    <DayDisplayTodo
      :day="day"
      :todo="todo"
      v-for="(todo, index) in day.todos"
      :key="index"
    >
    </DayDisplayTodo>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
import lodash from "lodash";
import DayAddTodo from "@/components/DayAddTodo";
import DayDisplayTodo from "@/components/DayDisplayTodo";

export default {
  name: "Day",
  data: function () {
    return {};
  },

  components: {
    DayAddTodo,
    DayDisplayTodo,
  },

  props: {
    day: {
      type: Object,
      required: true,
    },
  },

  created: function () {
    // console.log(this.day);
    // console.log(this.day.todos);
  },

  computed: {
    isToday() {
      return this.day.dayMonth._d.toString().substr(0, 15) ===
        moment()._d.toString().substr(0, 15)
        ? true
        : false;
    },

    // sortTodo() {
    //   console.log(this.timeValue);
    //   return _.orderBy(this.day.todos, [this.timeValue], ['asc', 'desc'])
    // },

  },

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
  /* width: 100%; */
}
.daytoday {
  background-color: #93c9bd;
  color: white;

}
</style>