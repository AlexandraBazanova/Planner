<template>
  <div class="clr-modal">
    <div
      v-if="showColors"
      class="color-modal-shadow"
      @click.self="closeModalColors"
    >
      <div class="color-modal">
        <slot name="bodyColors">
          <div class="color-modal-content">
              <div class="div1">
            <button id="color1" type="button" class="color1" value="#68ae9e"
            v-on:click="chooseColor"
            ></button>
              </div>
              <div class="div1">
            <button id="color2" type="button" class="color2" value="#ebe64ae2;"
            v-on:click="chooseColor"></button>
            </div>
            <div class="div1">
            <button id="color3" type="button" class="color3" value="#d24002b6"
            v-on:click="chooseColor"></button>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { eventBus } from "../main";

export default {
  name: "Colors",
  data: function () {
    return {
      showColors: false,
    };
  },
  props: {
      colorOfImportantDay: {
          type: String,
      }
  },
  created() {
    eventBus.$on("showModalColors", () => {
      this.showColors = true;
    });

     eventBus.$on("closeModalColors", () => {
      this.showColors = false;
    });

  },
  methods: {
    closeModalColors: function () {
      this.showColors = false;
    },
    chooseColor: function (evt) {
       return this.colorOfImportantDay = evt.target.value;
    },
  },
};
</script>

<style scoped>
/* .color-modal-shadow {
  position: relative;
  top: -100px;
  left: 20px;
  height: 100%;
  width: 100%;
  background: rgba(218, 218, 218, 0.39);
  display: flex;
  padding: 0.1rem;
} */

.color-modal {
  /* background: rgba(218, 218, 218, 0.221);
  border: 1px solid rgba(218, 218, 218, 0.399); */
  padding: 10px;
  width: 80px;
  height: 20px;
  position: relative;
  top: -6.6em;
  left: 2.4em;
  /* transform: translate(-50%, -50%); */
  z-index: 3;
}
.color-modal-content {
  margin-right: 0.7em;
  display: flex;
  /* color: rgb(72, 72, 72); */
}

.color1 {
  display: block;
  background-color: #AFC1D8;
  border: none;
  box-shadow: 1px 1px 1px rgb(162, 160, 160);
  transition-duration: 0.4s;
  cursor: pointer;
  outline-color: rgb(220, 211, 211);
  min-width: 20px;
  padding: 0.5em;
  margin-right: 0.7em;
  min-height: 22px;
  float: right;
}
.color2 {
  display: block;
  background-color: #AEDBC8;
  border: none;
  box-shadow: 1px 1px 1px rgb(162, 160, 160);
  transition-duration: 0.4s;
  cursor: pointer;
  outline-color: rgb(220, 211, 211);
  min-width: 20px;
  padding: 0.5em;
  margin-right: 0.7em;
  min-height: 22px;
}
.color3 {
  display: block;
  background-color: #FFE3CA;
  border: none;
  box-shadow: 1px 1px 1px rgb(162, 160, 160);
  transition-duration: 0.4s;
  cursor: pointer;
  outline-color: rgb(220, 211, 211);
  min-width: 20px;
  padding: 0.5em;
  margin-right: 0.7em;
  min-height: 22px;
}
button:hover {
  box-shadow: none;
}
</style>