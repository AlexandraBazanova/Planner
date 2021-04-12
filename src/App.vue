<template>
  <div id='app'>
    <head>
      <!-- <link rel="stylesheet" type="text/css" href="/static/bootstrap.min.css"> -->
    </head>
    <section class="main-calendar">
      <Menu/>
      <TodoList/>
      <Calendar/>
    <section class="footer-calendar">
    <!-- <h1>{{now.time}}</h1>
    <button @click='now = time()'>Мул</button>
    <button @click="logthis">зыс</button> -->
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
      // time: function() {
      //   const now = moment().format('dddd, LL, LTS')
      //   return {
      //     time: now,
      //   }
      // },
    },
    // created() {
    //  this.now = this.time()
    
    // },
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
    height: 100%;
    border: 2px solid rgb(233, 104, 238);
  }
  .footer-calendar {
    width: flex;
    vertical-align: bottom;
    border: 3px solid rgb(209, 196, 92);
    font-size: 11px;
  }
</style>
``