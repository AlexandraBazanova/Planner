<template>
  <li class="notes-item">
    <span>{{ note.message }}</span>
    <button class="rm-note" v-on:click="$emit('remove-note', note.id)">
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
li {
  display: flex;
  border-bottom: 1px dotted rgb(162, 160, 160);
}

.rm-note {
  color: rgb(32, 28, 28);
  background: none;
  border: none;
}
.notes-item {
  width: calc(99% + 0.3vw);
  border: 2px dashed #b2d9d0;
  border-radius: 10px;
  cursor: move;
  background-color: #dff2ef;
  padding: 0.2em;
  margin: 0.1em;
}
.notes-item:last-child {
  margin-bottom: 0;
}
.selected {
  opacity: 0.6;
}
</style>