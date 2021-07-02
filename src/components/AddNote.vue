<template>
  <form @submit.prevent="getNote">
    <textarea
      type="text"
      v-on:change="getNote"
      v-model="message"
      class="note-text"
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
  width: calc(99% + 0.3vw);
  font-size: calc(9px + 0.3vw);
}
</style>