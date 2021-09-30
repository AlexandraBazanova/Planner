<template>
  <div
    v-if="showForgotPassword"
    class="f-modal-shadow"
    @click.self="closeModalForgotPassword"
  >
    <div class="f-modal">
      <div class="f-modal-back" @click="returnToAutorization" tabindex="0">
          <mdicon name="arrow-left-circle" width="20" height="20" />
        </div>

      <slot name="bodyForgotPassword">
        <div class="f-modal-content">
          <p class="f-registration">Забыли пароль?</p>
          <form class="f-form">
            
            <input
              class="f-email"
              type="email"
              name="femail"
              placeholder="Введите email"
              required
            />
            <p class="f-note">* Пожалуйста, проверьте почту. Мы пришлём инструкцию по восстановлению пароля.</p>

            <div class="f-submit">
              <button class="f-button" type="submit">Ок</button>
            </div>
          </form>
        </div>
      </slot>
    </div>
  </div>
</template>

<script type = "text/javascript" >
import { eventBus } from "../main";

export default {
  name: "ForgotPassword",
  data: function () {
    return {
      showForgotPassword: false,
    };
  },
  methods: {
    returnToAutorization: function () {
      this.showForgotPassword = false;
      eventBus.$emit("showModalAutorization");
    },
    closeModalForgotPassword: function () {
      this.showForgotPassword = false;
    },
  },
};
</script>

<style scoped>
.f-modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(218, 218, 218, 0.39);
  display: flex;
  padding: 0.1rem;
}

.f-modal {
  background: #fff;
  padding: 15px;
  min-width: 200px;
  max-width: 180px;
  min-height: 220px;
  position: absolute;
  top: 28.25%;
  left: 15%;
  transform: translate(-50%, -50%);
  z-index: 3;
  color: rgb(72, 72, 72);
}
.f-modal-content {
  margin-top: 1.8rem;
  margin-left: 0.7rem;
  font-family: "Source Sans Pro", sans-serif;
  font-size: calc(11px + 0.3vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
}
.f-modal-back {
  cursor: pointer;
  color: rgb(162, 160, 160);
  float: right;
  outline-color: rgb(220, 211, 211);
}
.f-registration {
  margin: 0.1em;
  text-align: center;
}

input {
  margin-top: 15px;
  outline-color: rgb(220, 211, 211);
  color: rgb(72, 72, 72);
}
.f-button {
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
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  min-width: 20px;
  min-height: 22px;
  padding: 0.5em;
}
.f-note {
  font-family: "Source Sans Pro", sans-serif;
  font-size: calc(10px + 0.2vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  margin-top: 5px;
  padding-top: 3px;
}
</style>