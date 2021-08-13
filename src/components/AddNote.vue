<template>
<div class="note-form">
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
  </div>
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
.note-form {
  /* justify-content: center; */
  width: 100%;
}

form{
  justify-content: center;
  /* width: 100%; */
}

.note-text {
  width: 70%;
  font-size: calc(10px + 0.2vw);
  font-family:'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  outline: none;
  resize: none;
  overflow: hidden;
  border: 1px solid rgb(222, 220, 224);
  justify-content: center;
}
</style>