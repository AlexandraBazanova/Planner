<template>
  <div>
    <section class="add-note">
      <AddNote @add-note="addNote" v-if="notes.length < 12"> </AddNote>

      </section>
    <section class="notes-list">
        <NotesItem
          v-for="(note, index) in notes"
          :key="note.id"
          v-bind:note="note"
          v-bind:index="index"
          v-on:remove-note="removeNote"
        >
        </NotesItem>

    </section>
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
.add-note {
  display: flex;
  justify-content: center;
}
.notes-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-gap: 1px; */
  /* margin: 0.1rem; */
  padding: 0.1em;
}

</style>