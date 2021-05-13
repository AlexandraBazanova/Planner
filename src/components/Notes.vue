<template>
  <div>
      <div class="input-notes">
          <input type="text" class="notes-todo">
          <input type="text" class="notes-todo">
          
        </div>
  </div>
</template>

<script type = "text/javascript">

export default {
  name: "Notes",
  data: function () {
    return {
      
    };
  },

  props: {
    
  },
  };
</script>  

<style scoped>

.notes-todo {
    display: grid;
    grid-template-columns: 1fr;
    border: hidden;
    border-bottom: 1px dotted rgb(162, 160, 160);
    width: calc(100% - 1em);
} 
</style>