<template>
  <form @submit.prevent="getNote">
    <textarea
      class="note-text"
      type="text"
      v-on:change="getNote"
      v-model="message"
      wrap="soft"
    >
    </textarea>
  </form>
</template>

<script type = "text/javascript">
export default {
  name: "AddNote",
  data: function () {
    return {
      message: "",
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
      }
    },
  },
};
</script>  

<style scoped>
form {
  display: flex;
}
.note-text {
  width: 90%;
  font-size: calc(10px + 0.3vw);
  font-family:'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-display: auto;
  outline: none;
  resize: none;
  overflow: hidden;
  border: 1px solid rgb(183, 181, 186);
}
</style>