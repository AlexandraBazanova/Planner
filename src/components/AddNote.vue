<template>
  <div class="note-form">
    <form @submit.prevent="getNote">
      <div
        class="div-notes"
        v-on:click="startTyping = true"
        v-on:keyup.tab="startTyping = true"
      >
        <!-- <div class="lines">
          <span
            v-for="i in Array.apply(null, { length: 7 }).map(
              Number.call,
              Number
            )"
            :key="i"
            class="grid-element"
          >
          </span>
        </div> -->
        <div class="div-textarea">
          <textarea
            class="note-text"
            type="text"
            v-if="startTyping"
            v-on:change="getNote"
            v-model="message"
            wrap="soft"
            maxlength="122"
          >
          </textarea>
        </div>

        <!-- <div class="icon-notes" v-if="!startTyping">
          <mdicon name="lead-pencil" width="20" height="20" />
        </div> -->
      </div>
    </form>
  </div>
</template>

<script type = "text/javascript">
export default {
  name: "AddNote",
  data: function () {
    return {
      message: "",
      startTyping: false,
    };
  },

  props: {},

  methods: {
    getNote() {
      if (this.message.trim()) {
        const newNote = {
          id: Date.now(),
          message: this.message,
          draggable: true,
        };
        this.$emit("add-note", newNote);
        this.message = "";
        this.startTyping = false;
      }
    },
  },
};
</script>  

<style scoped>
.note-form {
  background-color: #ffff;
  border-radius: 4px;
}
.div-notes {
  position: relative;
  border: none;
  width: 10.5em;
  height: 10em;
  outline: none;
  overflow: hidden;
}

/* .lines {
  position: absolute;
  z-index: 0;
  display: grid;
  grid-template-rows: 1fr;
  width:  10.5em;
  margin-top: 0.4em;
  /* padding-left: 1px; 
  padding-top: 0.2em;
}
.grid-element {
  height: calc(10px + 0.32vw);
  border-bottom: 1px solid blue;
}  */
.div-textarea {
  /* position: absolute;
  z-index: 1;  */
  height: 100%;
  background-image: repeating-linear-gradient(#ffffff 0px, #ffffff 13px, #a8cdd3d0 14px);
  border-radius: 4px;
  /* margin: 0.3em;
  padding-left: 1px;
  padding-top: 0.2em; */
}
.note-text {
  font-size: calc(11px + 0.2vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
  outline: none;
  resize: none;
  background-color: transparent;
  border: none;
  height: 10em;
  padding: 0.2em;
  padding-top: 0.2em;
  width: 95%;
  white-space: pre-wrap;
  overflow: hidden;
  cursor: text;
}

/* .icon-notes {
  float: right;
  padding-right: 0.3rem;
  color: rgb(183, 181, 186);
  width: 2em;
} */
</style>