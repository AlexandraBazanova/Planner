<template>
  <li class="notes-item">
    <div class="notes-value">
      {{ note.message }}
      </div>
    <button
     class="rm-note" 
     v-on:click="$emit('remove-note', note.id)">
      &times;
    </button>
  </li>
</template>

<script type = "text/javascript">
export default {
  name: "NotesItem",
  data: function () {
    return {};
  },

  props: {
    note: {
      type: Object,
      required: true,
    },
    index: Number,
  },

  methods: {},
};
</script>  

<style scoped>
.notes-item {
  display: flex;
  border-bottom: 1px dotted rgb(162, 160, 160);
  border: 2px dashed #b2d9d0;
  border-radius: 10px;
  cursor: move;
  background-color: #dff2ef;
  padding: 0.2em;
  margin: 0.1em;
  overflow: hidden;
}
.notes-value {
  width: 95%;
  text-align: start;
  text-overflow: clip;
  white-space: pre-line;
  float: left;
  padding-left: 0.5rem;
}

.rm-note {
  color: rgb(32, 28, 28);
  background: none;
  border: none;
  float: right;
}

.selected {
  opacity: 0.6;
}
</style>