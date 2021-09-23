<template>
  <div
    class="all-notes"
    @click="getNumberOfNotes($event.target.clientWidth)"
    @change="getNumberOfNotes($event.target.clientWidth)"
  >
    <section class="add-note">
      <AddNote @add-note="addNote" v-if="shownnotes.length < maxNumberOfNotes">
      </AddNote>
    </section>

    <button class="button-first" @click="toPrevNote"
    v-show="notes.length > maxNumberOfNotes"
    >
      <mdicon name="chevron-left" width="40" height="40" />
    </button>
    <transition-group class="list-complete" name="list-complete" mode="out-in">
      <NotesItem
        class="notes-item"
        v-for="(note, index) in shownnotes"
        :key="note.id"
        v-bind:note="note"
        v-bind:index="index"
        v-on:remove-note="removeNote"
      >
      </NotesItem>
    </transition-group>
    <button class="button-last" @click="toNextNote"
      v-show="notes.length > maxNumberOfNotes"
    >
      <mdicon name="chevron-right" width="40" height="40" />
    </button>
  </div>
</template>

<script type = "text/javascript">
import NotesItem from "@/components/NotesItem";
import AddNote from "@/components/AddNote";
import { eventBus } from "../main";

export default {
  name: "Notes",
  components: {
    AddNote,
    NotesItem,
  },
  data: function () {
    return {
      notes: [],
      maxNumberOfNotes: 6,
      shownnotes: [],
      viewNoteShift: 0,
      lastIndex: 0,
    };
  },

  props: {},

  mounted() {
    this.getNumberOfNotes();
  },

  created() {
    this.getNumberOfNotes();
    window.addEventListener("resize", this.getNumberOfNotes);
  },
  destroyed() {
    window.removeEventListener("resize", this.getNumberOfNotes);
  },
  computed: {},
  methods: {
    getNumberOfNotes() {
      // console.log('maxNumber Of Notes ' + this.maxNumberOfNotes);
      // console.log('window width ' + window.innerWidth);
      eventBus.$emit("showNextMonthContainer");
      window.innerWidth < 604
        ? (this.maxNumberOfNotes = 2)
        : window.innerWidth < 730
        ? (this.maxNumberOfNotes = 3)
        : window.innerWidth < 890
        ? (this.maxNumberOfNotes = 4)
        : window.innerWidth < 1030
        ? (this.maxNumberOfNotes = 5)
        : (this.maxNumberOfNotes = 6);
      this.shownnotes = this.notes.slice(0);
      if (this.maxNumberOfNotes > this.notes.length ) {
        return this.shownnotes.splice(this.maxNumberOfNotes);
      } else {
        this.maxNumberOfNotes + this.viewNoteShift >= this.notes.length ? (this.lastIndex = this.maxNumberOfNotes + this.viewNoteShift - this.notes.length) : (this.lastIndex = 0);
        this.maxNumberOfNotes + this.viewNoteShift <= this.notes.length
          ? (this.shownnotes = this.notes.slice(this.viewNoteShift, this.maxNumberOfNotes + this.viewNoteShift))
          : (this.shownnotes = [
              ...this.notes.slice(this.viewNoteShift),
              ...this.notes.slice(0, this.lastIndex),
            ]);
        return this.shownnotes;
      }
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

    toPrevNote() {
      this.viewNoteShift <= 0
        ? (this.viewNoteShift = this.notes.length)
        : this.viewNoteShift--;
    },
    toNextNote() {
      this.viewNoteShift >= this.notes.length 
        ? (this.viewNoteShift = 0)
        : this.viewNoteShift++;
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


.button-first {
  position: relative;
  top: 2.25em;
  left: 1em;
  height: 50%;
  background-color: transparent;
  border-color: white;
  border: none;
  color: rgba(183, 181, 186, 0.265);
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0;
  padding: 0;
  outline-color: rgb(220, 211, 211);
  z-index: 1;
}
.button-last {
  position: relative;
  top: 2.25em;
  right: 0.6em;
  height: 50%;
  background-color: transparent;
  border-color: white;
  border: none;
  color: rgb(183, 181, 186, 0.265);
  transition: 0.4s;
  cursor: pointer;
  margin: 0;
  padding: 0;
  outline-color: rgb(220, 211, 211);
  z-index: 0;
}

.list-complete {
  display: flex;
  justify-content: center;
  float: right;
}

.notes-item {
  transition:  ease 2s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
 
}
.list-complete-leave-active {
  position: absolute;
  /* transform: translateX(-10%); */
}
</style>