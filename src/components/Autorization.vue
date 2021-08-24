<template>
  <div class="autorization-modal">
    <div
      v-if="showAutorization"
      class="a-modal-shadow"
      @click.self="closeModalAutorization"
    >
      <div class="a-modal">
        <div class="a-modal-back" @click="returnToMenu">
          <mdicon name="arrow-left-circle" width="20" height="20" />
        </div>

        <slot name="bodyAutorizatuion">
          <div class="a-modal-content">
            <p class="p-authorization">Авторизация</p>
            <form class="a-form">
              <input
                class="a-email"
                type="email"
                name="email"
                placeholder="Введите email"
              />
              <input
                class="a-password"
                type="password"
                name="password"
                minlength="8"
                placeholder="Введите пароль"
              />
               <div
              class="lostpassword"
              @click="showModalForgotPassword"
              tabindex="0"
            >
              <div class="icon-forgot">
                <mdicon name="lock-question" width="20" height="20" />
              </div>
               <p class="p-lostpassword">Забыли пароль?</p>
               </div>
              <input
                class="custom-checkbox"
                type="checkbox"
                name="remember"
                id="remember"
                checked
              />
              <label for="remember"> Запомнить меня </label>
              <div class="a-submit">
                <button class="a-button" type="submit">Вход</button>
              </div>
            </form>
            <div
              class="registration"
              @click="showModalRegistration"
              tabindex="0"
            >
              <div class="icon-registration">
                <mdicon name="account-plus-outline" width="20" height="20" />
              </div>
              <p class="p-registration">Регистрация пользователя</p>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <Registration ref="modalRegistration"> </Registration>
    <ForgotPassword ref="modalForgotPassword"> </ForgotPassword>
  </div>
</template>

<script type = "text/javascript" >
import ForgotPassword from "@/components/ForgotPassword";
import Registration from "@/components/Registration";
import { eventBus } from "../main";

export default {
  name: "Autorization",
  data: function () {
    return {
      showAutorization: false,
    };
  },

  components: {
    Registration,
    ForgotPassword,
  },
   created() {
    eventBus.$on("showModalAutorization", () => {
      this.showAutorization = true;
    });
  },
  methods: {
    returnToMenu: function () {
      this.showAutorization = false;
      eventBus.$emit("showModalMenu");
    },
    closeModalAutorization: function () {
      this.showAutorization = false;
    },

    showModalRegistration: function () {
      this.$refs.modalRegistration.showRegistration = true;
      this.showAutorization = false;
    },
    showModalForgotPassword: function () {
      this.$refs.modalForgotPassword.showForgotPassword = true;
      this.showAutorization = false;
    },
  },
};
</script>

<style scoped>
.a-modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
  display: flex;
  padding: 0.1rem;
}

.a-modal {
  background: #fff;
  padding: 15px;
  min-width: 210px;
  max-width: 180px;
  min-height: 220px;
  position: absolute;
  top: 29.5%;
  left: 15%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.a-modal-content {
  margin-top: 1.8rem;
  margin-left: 0.9rem;
  font-family: "Source Sans Pro", sans-serif;
  font-size: calc(11px + 0.3vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
}
.a-modal-back {
  cursor: pointer;
  color: rgb(162, 160, 160);
  float: right;
}
.p-authorization {
  margin-left: 0;
  margin-right: 20px;
  text-align: center;
}

input {
  margin-top: 15px;
  outline-color: rgb(220, 211, 211);
  color: rgb(72, 72, 72);
}
.a-button {
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
  margin-left: 65px;
  margin-right: auto;
  min-width: 20px;
  padding: 0.5em;
  min-height: 22px;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox + label {
  margin-top: 15px;
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked + label::before {
  background-color: #b2d9d0;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}

.p-registration {
  font-family: "Source Sans Pro", sans-serif;
  font-size: calc(10px + 0.2vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  margin-bottom: 1px;
  margin-left: 26px;
  margin-top: 12px;
  padding-top: 3px;
  cursor: pointer;
}
.p-lostpassword {
   font-family: "Source Sans Pro", sans-serif;
  font-size: calc(10px + 0.2vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  margin-bottom: 1px;
  margin-left: 25px;
  margin-top: 5px;
  padding-top: 3px;
  cursor: pointer;
}
.icon-registration {
  color: rgb(162, 160, 160);
  float: left;
  margin-right: 5px;
}
.icon-forgot{
  color: rgb(162, 160, 160);
  float: left;
  padding-left: 0;
  margin-top: 1px;
}
</style>