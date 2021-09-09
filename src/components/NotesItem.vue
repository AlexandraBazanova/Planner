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
              <mdicon name="pin" width="15" height="20" />
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
  font-size: 100%;
  font-weight: normal;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin-left: 0.5em;
  margin-bottom: 0.1em;
  float: left;
  z-index: -100;
}

a {
  background-color: #d5ece7;
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
  padding: 0.5em;
  padding-left: 0.7em;
  outline-color: rgb(220, 211, 211);
}

.icon-pin {
  color: rgb(183, 181, 186);
  transform: rotate(19deg);
  z-index: -1;
  cursor: pointer;
}
.rm-note {
  background: none;
  border: none;
  float: right;
  padding: 0.1em;
  cursor: pointer;
  z-index: 1;
  padding-top: 0;
  padding-right: 0;
  outline-color: rgb(220, 211, 211);
}
.rm-note:hover {
  position: relative;
  top: -2px;
}
.icon-pin:hover {
  color: rgb(162, 160, 160);
}
.input-notevalue {
  font-size: calc(10px + 0.2vw);
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
  background-color: #a8cdd353;
  padding: 0.5em;
  margin: 0;
  cursor: text;
}
.editnotes {
  background-color: #d5ece7 !important;
}
.editnotes:hover {
  background-color: #f6f6f6;
  box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.204);
  position: relative;
}
</style>