<template>
  <div
    v-if="showSettings"
    class="s-modal-shadow"
    @click.self="closeModalSettings"
  >
    <div class="s-modal">
      <div class="s-modal-back" @click="returnToMenu">
          <mdicon name="arrow-left-circle" width="20" height="20" />
        </div>

      <slot name="bodySettings">
        <div class="s-modal-content">

        <div class="icon-settings">
          <mdicon name="cog-outline" class="icon" width="20" height="20" />
        </div>
          <p class="p-settings">Настройки</p>

          <ul>
            <li class="theme">
              <p>Тема оформления</p>
              <div class="light-radio">
              <input
                type="radio"
                id="light"
                name="theme"
                value="light"
                checked
              />
              <label for="light">светлая</label>
              </div>
              <div class="dark-radio">
              <input type="radio" id="dark" name="theme" value="dark" />
              <label for="dark">тёмная</label>
              </div>
            </li>
            <li class="events">
              <p>Показывать события:</p>

              <div class="weekend">
                <label class="switch">
                  <input type="checkbox" id="weekend" />
                  <span class="slider round"></span>
                </label>
                <label class="weekends" for="weekend"> выходные дни </label>
              </div>
              <div class="weekend">
                <label class="switch">
                  <input type="checkbox" id="hollidays" />
                  <span class="slider round"></span>
                </label>
                <label class="hollidays" for="hollidays"> праздники </label>
              </div>
            </li>
          </ul>
          <div class="s-submit">
            <button class="s-button" type="submit">Сохранить</button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script type = "text/javascript" >
import { eventBus } from "../main";

export default {
  name: "Settings",
  data: function () {
    return {
      showSettings: false,
    };
  },
  methods: {
    returnToMenu: function () {
      this.showSettings = false;
      eventBus.$emit("showModalMenu");
    },

    closeModalSettings: function () {
      this.showSettings = false;
    },
  },
};
</script>

<style scoped>
.s-modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
  display: flex;
  padding: 0.1rem;
}

.s-modal {
  background: #fff;
  padding: 15px;
  min-width: 200px;
  max-width: 180px;
  min-height: 220px;
  position: absolute;
  top: 30.5%;
  left: 15%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.s-modal-content {
  margin-top: 1.8rem;
  font-family: "Source Sans Pro", sans-serif;
  font-size: calc(11px + 0.3vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
}
.s-modal-back  {
  cursor: pointer;
  color: rgb(162, 160, 160);
  float: right;
}
.p-settings {
  margin: 0;
  margin-left: 65px;
  text-align: start;
}
.icon-settings {
  color: rgb(162, 160, 160);
  float: left;
  margin-left: 40px;
}

li::marker {
  color: rgb(162, 160, 160);
}

ul {
    padding-left: 2.5em;
}
.s-button {
  display: block;
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(9px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  outline-color: rgb(220, 211, 211);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  min-width: 20px;
  min-height: 22px;
  padding: 0.5em;
}

[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  line-height: 22px;
  display: inline-block;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 10px;
  height: 10px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 8px;
  height: 8px;
  background: #b2d9d0;
  position: absolute;
  top: 7px;
  left: 2px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 25px;
  height: 14px;
}

/* Hide default HTML checkbox */
.switch input {
  display: none;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 2px;
  left: 0;
  right: 0;
  bottom: -2px;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #b2d9d0;
}

input:focus + .slider {
  box-shadow: 0 0 1px #b2d9d0;
}

input:checked + .slider:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(9px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 10px;
}

.slider.round:before {
  border-radius: 50%;
}

.weekend {
  margin-top: 3px;
}
</style>