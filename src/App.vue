<template>
  <div id='app'>
    <head>
    </head>
    <section class="main-calendar" >
      <Menu/>
      <TodoList/>
      <Calendar/>
    <section class="footer-calendar">
   
    </section>
    </section>
  </div>
</template>

<script>

  import moment from 'moment'
  import 'moment/locale/ru';
  import Menu from '@/components/Menu'
  import TodoList from '@/components/TodoList' 
  import Calendar from '@/components/Calendar' 

  export default {
    name: 'app',
    data() {
      return {
        now: '',
      }
    },
  
    computed: {
  
    },
    methods: {
      logthis: function() {
        console.log(this)
      },
     
    },
   
    components: {
      Menu, TodoList, Calendar
    },
  }

</script>

<style>
  .main-calendar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border: 2px solid rgb(233, 104, 238);
  }
  .footer-calendar {
    width: flex;
    vertical-align: bottom;
    border: 3px solid rgb(209, 196, 92);
    font-size: 11px;
    height: 1rem;
  }
</style>
``