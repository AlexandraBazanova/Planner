<template>
  <div>
    <section class="widget-bar" >
      <section class="urgent-todos">
        <p>Очень срочные дела</p>
        <select class="select-todo" v-model="filter" >
          <option value="all">Все</option>
          <option value="completed">Завершённые</option>
          <option value="not-completed">Незавершённые</option>
        </select>
        <ul v-bind:todos='filteredTodos' >
            <AddTodo
              v-if="todos.length<5"
              @add-todo="addTodo"
            >
            </AddTodo>
            <TodoItem
            v-for="(todo, index) in filteredTodos"
            :key="todo.id"
            v-bind:todo="todo"
            v-bind:index="index"
            v-on:remove-todo="removeTodo"
            >
            </TodoItem>
        </ul>   
      </section>
      <section class="notes">
        <p v-purple>Заметки</p>
        <Notes/>
      </section>
      <section class="two-months"> 
        <p>Календарь</p>
        <MiniCalendar class="mini-calendar1"/>
      </section>
    </section>
  </div>
</template>

<script type = "text/javascript" >
import TodoItem from '@/components/TodoItem'
import AddTodo from '@/components/AddTodo'
import MiniCalendar from '@/components/MiniCalendar'
import Notes from '@/components/Notes'

export default { 
    name: 'TodoList',
    data: function () {
      return {
        todos: [],
        filter: 'all',
      }
    },
    // props: ['todos'],
    directives: {
      'purple': {
        inserted: function(el)  {
          el.style.color = 'purple'
        }
      },
    },
    components: {
        AddTodo, TodoItem, MiniCalendar, Notes,
    },
    methods: {
     
      removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id)
      },
      addTodo(todo) {
        this.todos.push(todo)
      },
    },
    computed: {
        filteredTodos() {
        if (this.filter === 'all') {
          return this.todos
        }
        if (this.filter === 'completed') {
          return this.todos.filter(t => t.completed)
        }
        if (this.filter === 'not-completed') {
          return this.todos.filter(t => !t.completed)
        }
      },

    }
};
</script>

<style>
  ul {
    padding: 0.5em;
    margin: 0;
  }
  p {
    font-size: calc(10px + 0.3vw);
    text-decoration: underline;
  }
  .select-todo{
    font-size: calc(9px + 0.3vw);
  }
  .widget-bar {
    display: grid;
    grid-template-columns: repeat(3, minmax(20px, 1fr));
    grid-gap: 1px;
    font-size: calc(11px + 0.3vw);
    border: 1px solid rgb(183, 181, 186);
    margin: 0.2rem;
  }
  .urgent-todos {
    font-size: calc(10px + 0.3vw);
    border: 1px solid rgb(183, 181, 186);
    text-align:center;
    background-color: rgb(253, 242, 248);
  }
 .notes {
    text-align:center;
    padding: 0.5rem;
  }
  .two-months {
    text-align:center;
    border: 1px solid rgb(183, 181, 186);
  } 
</style>