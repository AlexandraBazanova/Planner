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

    addNote(note) {
      this.notes.push(note);
    },
  },
};
</script>  

<style scoped>
.add-note {
  display: flex;
}

.notes-list {
  display: flex;
  justify-content: center;
  margin: 0.1em;
}
.all-notes {
  padding: 0;
  margin: 0;
}

</style>