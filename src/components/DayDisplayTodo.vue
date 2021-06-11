<template>
   <li>
    <span >
        <label  class="custom-checkbox">
        <input type='checkbox'   >
        <div v-if="day.todos.todo"
        >
        <input
          class="daily-todo"
          type="text"
          :value = todoValue
        >
        {{day.todos.todo.todoValue}}
        {{day.todos.todo.id}}
        </div>
        </label>
    </span>
    <button class='rm' v-on:click="$emit('remove-todo', day.todos.todo.id)"
    >&times;</button>
    </li>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";

export default {
  name: "DayDisplayTodo",
  data: function () {
    return {
      
    };
  },

  props:{
    day: {
      type: Object,
      required: true,
    },
        
        
  },

  methods: {
    displayDateNumberFormat(date, formatType) {
      return moment(date).format("DDMMYYYY");
    },
  },
  };
</script>  

<style scoped>
  li {
        display: flex;
        border-bottom: 1px dotted rgb(162, 160, 160);
    }
   
    .rm {
        color: rgb(32, 28, 28);
        background: none;
        border: none;
    }
    .done {
        text-decoration: line-through;
    }
</style>