<template>
  <div class="all-notes">
    <section class="add-note">
      <AddNote @add-note="addNote" v-if="notes.length < 6"> </AddNote>
    </section>

    <div class="notes-list">
      <NotesItem
        v-for="(note, index) in notes"
        :key="note.id"
        v-bind:note="note"
        v-bind:index="index"
        v-on:remove-note="removeNote"
      >
      </NotesItem>
    </div>
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
  computed: {},
  methods: {
    removeNote(id) {
      this.notes = this.notes.filter((t) => t.id !== id);
    },
    updateNoteValue(note) {
      const indexOfEditNoteValue = this.notes.findIndex(
        (t) => t.id === note.noteId
      );
      this.notes[indexOfEditNoteValue].message = note.noteNewValue;
    },
    addNote(note) {
      this.notes.push(note);
    },
  },
};
</script>  

<style scoped>
.all-notes {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: start;
}
.add-note {
  display: flex;
  float: left;
  padding-left: 0.5em;
  /* margin:0;
  padding-top: 0.3em;
  padding-left: 0.3em; */
}

.notes-list {
  display: flex;
  justify-content: center;
  margin-left: 0.5em;
  float: right;
}
</style>