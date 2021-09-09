<template>
  <div class="all-notes" 
  @click="getNumberOfNotes($event.target.clientWidth)"
     @change="getNumberOfNotes($event.target.clientWidth)"
  >
    <section class="add-note"  >
      <AddNote @add-note="addNote" v-if="shownnotes.length < maxNumberOfNotes"> </AddNote>
    </section>

    <div class="notes-list"
     >
        <!-- v-show="notes.length <= maxNumberOfNotes" -->
      <NotesItem
        v-for="(note, index) in shownnotes"
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
import { eventBus } from "../main";

export default {
  name: "Notes",
  data: function () {
    return {
      notes: [],
      maxNumberOfNotes: 6,
      shownnotes: [],
    };
  },

  props: {},

  components: {
    AddNote,
    NotesItem,
  },
  mounted() {
    console.log('кол-во записок ' + this.notes.length);
    this.getNumberOfNotes()
  },

  created() {
    this.getNumberOfNotes()
    window.addEventListener("resize", this.getNumberOfNotes);
  },
  destroyed() {
    window.removeEventListener("resize", this.getNumberOfNotes);
  },
  computed: {},
  methods: {
    getNumberOfNotes() {
      console.log('maxNumber Of Notes ' + this.maxNumberOfNotes);
      console.log('window width ' + window.innerWidth);
      eventBus.$emit("showNextMonthContainer");
       window.innerWidth < 600? this.maxNumberOfNotes = 2 : 
      window.innerWidth < 730? this.maxNumberOfNotes = 3 : 
      window.innerWidth < 870? this.maxNumberOfNotes = 4 : 
      window.innerWidth < 1020? this.maxNumberOfNotes = 5 : this.maxNumberOfNotes = 6;
      this.shownnotes = this.notes.slice(0);
       return this.shownnotes.splice(this.maxNumberOfNotes)
    },

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
      // const param = 1;
      // store.commit('changeCount', param)
    },
  },
};
</script>  

<style scoped>
.all-notes {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-start;
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