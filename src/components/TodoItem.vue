<template>
  <li>
    <span v-bind:class="{ done: todo.completed }">
      <label class="custom-checkbox">
        <input
          type="checkbox"
          :checked="todo.completed"
          v-on:change="$emit('complete-todo', todo.id)"
        />
        <span class="todo-title">
          {{ todo.title }}
        </span>
      </label>
    </span>
    <button
     class="rm"
      v-on:click="$emit('remove-todo', todo.id)">
      &times;
    </button>
  </li>
</template>

<script>
export default {
  data: function () {
    return {};
  },

  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: Number,
  },
};
</script>

<style>
li {
  display: flex;
  border-bottom: 1px dotted rgb(162, 160, 160);
  justify-content: space-between;
}
.todo-title {
  align-self: flex-start;
  margin-left: 0.5em;
}
.rm {
  color: rgb(32, 28, 28);
  background: none;
  border: none;
  align-self: flex-end;
}
.done {
  text-decoration: line-through;
}
.custom-checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox > span::before {
  display: none;
}
/* стили при наведении курсора на checkbox */
.custom-checkbox > input:not(:disabled):not(:checked) + span:hover::before {
  border-color: none;
}

/* стили для активного чекбокса (при нажатии на него) */
.custom-checkbox > input:not(:disabled):active + span::before {
  background-color: none;
  border-color: none;
}

/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox > input:focus + span::before {
  box-shadow: 0 0 0 0.05rem rgba(52, 1, 43, 0.25);
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox > input:focus:not(:checked) + span::before {
  border-color: none;
}

/* стили для чекбокса, находящегося в состоянии checked */
.custom-checkbox > input:checked + span::before {
  /* border-color: #c066d6; */
  background-color: none;
  background-image: url(https://e7.pngegg.com/pngimages/630/547/png-clipart-check-mark-symbol-symbol-miscellaneous-angle-thumbnail.png);
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox > input:disabled + span::before {
  background-color: #0ff832;
}
</style>