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
  width: 100%;
  font-size: calc(10px + 0.3vw);
}
</style>