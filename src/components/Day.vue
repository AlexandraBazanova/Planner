<template>
  <div>
    <div class="date-of-the-day"
     v-bind:class="{ daytoday: isToday}"
     v-on:click="isImportantday(day.dayMonth._d); isNotImportantday(day.dayMonth._d)"
     >
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
import DayAddTodo from "@/components/DayAddTodo";
import DayDisplayTodo from "@/components/DayDisplayTodo";

export default {
  name: "Day",
  data: function () {
    return {
      dateOfImportantDay: "",
    };
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

  computed: {
    isToday() {
      return this.day.dayMonth._d.toString().substr(0, 15) ===
        moment()._d.toString().substr(0, 15)
        ? true
        : false;
    },
  },

  methods: {
    displayDate(date, formatType) {
      return moment(date).format("D MMMM");
    },
    isImportantday(dateOfImportantDay) {
      const dayIsImportant = true;
      // console.log(dateOfImportantDay);
      // console.log(dayIsImportant);
      this.$emit('addImportantday', {dateOfImportantDay, dayIsImportant});
    },
    isNotImportantday(dateOfImportantDay) {
        console.log(this.dayIsImportant)
      
    }
  },
};
</script>

<style scoped>
.date-of-the-day {
  text-align: center;
  font-size: calc(10px + 0.3vw);
  font-family:'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
   cursor: pointer;
}
.date-of-the-day:hover {
 background-color: #93c9bd;
 border-radius: 4px;
 color: white;
 transition: all 0.5s ease;
}

.daytoday {
  background-color: #b2d9d0;
  color: white;
  border-radius: 4px;
}

.dayimportant {
  background-color: #beb2d9;
  border-radius: 4px;
}



</style>