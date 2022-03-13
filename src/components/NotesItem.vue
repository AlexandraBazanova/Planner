<template>
  <div class="all-notes">
    <ul id="ul-list" class="ul-notes">
      <li class="notes-item">
        <a v-bind:class="{ editnotes: !editNote }">
          <button
            class="rm-note"
            v-on:click="$emit('remove-note', note.id)"
            tabindex="0"
            v-if="!editNote"
          >
            <div class="icon-pin">
              <mdicon name="close" width="12" height="20" />
            </div>
          </button>

          <div
            class="notes-value"
            v-if="!editNote"
            v-on:dblclick="editNote = true"
            tabindex="0"
          >
            {{ note.message }}
          </div>

          <textarea
            class="input-notevalue"
            type="text"
            v-else
            v-model="note.message"
            v-on:change="editNoteValue"
            @dblclick="editNote = false"
            @blur="editNote = false"
            wrap="soft"
            maxlength="122"
          >
          </textarea>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type = "text/javascript">
import { eventBus } from "../main";
export default {
  name: "NotesItem",
  data: function () {
    return {
      editNote: false,
    };
  },

  props: {
    note: {
      type: Object,
      required: true,
    },
    index: Number,
  },

  methods: {
    editNoteValue() {
      const noteNewValue = this.note.message;
      const noteId = this.note.id;
      this.$emit("updateNoteValue", { noteId, noteNewValue });
      this.editNote = false;
    },
  },
};
</script>  

<style scoped>
a {
  /* font-size: 100%; */
  font-weight: normal;
  height: 100%;
  border-radius: 4px;
  background-color: #fdfdfd;
   background-image:
   linear-gradient(90deg, transparent 101px, transparent 100px),
   linear-gradient(#e8e7e7 1px, transparent 0px),
   linear-gradient(90deg, #e8e7e7 1px, transparent 0px);
   background-size:100% 100%, 15px 15px, 15px 15px;
   background-position: 0 0, -1px -1px, -1px 1px;
  /* background-image: repeating-linear-gradient(#f6f4f4 0px, #ffffff 13px, #a8cdd3d0 14px); */
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
 
}

ul li {
  
  margin-left: 3px;
  float: left;
  z-index: -100;
}

a {
  display: block;
  text-align: start;
  height: 10em;
  width: 10.5em;
  transition: 0.15s linear;
  overflow: hidden;
  white-space: pre-wrap;
  /* word-break: break-all; */
  
}
.notes-value {
  padding: 3px;
  padding-left: 7px;
  outline-color: rgb(220, 211, 211);
}


.rm-note {
  background: none;
  border: none;
  float: right;
  padding: 0.1em;
  cursor: pointer;
  z-index: 2;
  padding-top: 0;
  padding-right: 6px;
  outline-color: rgb(220, 211, 211);
  color: rgb(183, 181, 186);
}
.rm-note:hover {
  color: rgb(72, 72, 72);

}

.input-notevalue {
  font-size: 14px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
  outline-color: rgb(220, 211, 211);
  border: none;
  height: 8.95em;
  width: 9.45em;
  resize: none;
  overflow: hidden;
  white-space: pre-wrap;
  outline: none;
  background-color: #ffff;
  padding: 0.5em;
  margin: 0;
  cursor: text;
}
.editnotes {
  background-color: #ffff !important;
}
/* .editnotes:hover {
  background-color: #f6f6f6;
  box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.204);
  position: relative;
} */

</style>