<template>
  <div>
    <ul class="notes-list">
      <AddNote @add-note="addNote"> </AddNote>
      <NotesItem
        v-for="(note, index) in notes"
        :key="note.id"
        v-bind:note="note"
        v-bind:index="index"
        v-on:remove-note="removeNote"
      >
      </NotesItem>
    </ul>
  </div>
</template>

<script type = "text/javascript">
import NotesItem from "@/components/NotesItem";
import AddNote from "@/components/AddNote";

export default {
  name: "Notes",
  data: function () {
    return {
      notes: [],
    };
  },

  props: {},

  components: {
    AddNote,
    NotesItem,
  },

  methods: {
    removeNote(id) {
      this.notes = this.notes.filter((t) => t.id !== id);
    },

    addNote(note) {
      this.notes.push(note);
    },
  },
};
</script>  

<style scoped>
</style>