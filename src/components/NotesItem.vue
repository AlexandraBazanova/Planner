<template>
  <div class="all-notes">
    <ul id="ul-list" class="ul-notes">
      <li class="notes-item">
        <a>
          <button
            class="rm-note"
            v-on:click="$emit('remove-note', note.id)"
            tabindex="0"
          >
            <div class="icon-pin">
              <mdicon name="pin" width="15" height="20" />
            </div>
          </button>
          <div class="notes-value">
            {{ note.message }}
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type = "text/javascript">
export default {
  name: "NotesItem",
  data: function () {
    return {};
  },

  props: {
    note: {
      type: Object,
      required: true,
    },
    index: Number,
  },

  methods: {},
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
  margin: 0.5em;
  margin-bottom: 0.5em;
  float: left;
  z-index: -100;
}

ul li a {
  text-decoration: none;
  background-color: #dff2ef;
  display: block;
  height: 6em;
  width: 11em;
  padding: 0.2em;
  /* box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7); */
  transition: 0.15s linear;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-all;
}

ul li a:hover,
ul li a:focus {
  box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.258);
  position: relative;
  transform: rotate(-1deg);
  z-index: 5;
}

.icon-pin {
  color: rgb(162, 160, 160);
  transform: rotate(19deg);
  z-index: -1;
}
.rm-note {
  background: none;
  border: none;
  float: right;
  padding: 0.1em;
  cursor: pointer;
  z-index: -1;
  padding-top: 0;
  padding-right: 0;
}
.icon-pin:hover {
  color: rgba(99, 97, 97, 0.7);
}
</style>