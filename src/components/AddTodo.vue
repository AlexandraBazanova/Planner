<template>
  <form @submit.prevent="onSubmit">
    <input
      class="urgent-todo"
      type="text"
      v-on:change="onSubmit"
      v-model="title"
    />
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      title: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.title.trim()) {
        const newTodo = {
          id: Date.now(),
          title: this.title,
          completed: false,
        };
        this.$emit("add-todo", newTodo);
        this.title = "";
      }
    },
  },
};
</script>

<style>
form {
  display: flex;
}
.urgent-todo {
  width: calc(97% + 0.3vw);
  font-size: calc(9px + 0.3vw);
}
</style>