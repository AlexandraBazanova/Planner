<template>
  <div>
    <div class="date-of-the-day">
      {{ displayDate(day.dayMonth) }}
    </div>
    <DayAddTodo :day="day" 
        
    > </DayAddTodo>
    <DayDisplayTodo
    :day="day"
    v-for="(todo) in day.todos"
            :key="todo.id"
    
    v-on:remove-todo="removeTodo"
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
    //  updateInput(todoValue, dateOfTodo, id) {
    //    this.$emit('updateTodoList', {todoValue, dateOfTodo, id})
    // },
    removeTodo(id) {
      console.log('Day')
      console.log(this.day.todos)
         this.day.todos = this.day.todos.filter(t => t.id !== t.id)
      console.log(this.day.todos)
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
</style>