<template>
  <ul id="my-list" class="ul-notes">
    <li class="notes-item">
      <div class="notes-value">
        {{ note.message }}
      </div>
      <button class="rm-note" v-on:click="$emit('remove-note', note.id)">
        &times;
      </button>
    </li>
  </ul>
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
.ul-notes {
  padding: 0.1em;
  margin: 0.15em;
  margin-left: 5px;
  margin-right: 1px;
}

.notes-item {
  display: flex;
  border: none;
  border-radius: 4px;
  cursor: move;
  background-color: #dff2ef;
  overflow: hidden;
  width: 99%;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: normal;
  font-style: normal;
  font-display: auto;
}

.notes-item:hover {
  background-color: #d0ebe7;
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