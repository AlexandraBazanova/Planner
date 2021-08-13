<template>
  <div
    v-if="showRegistration"
    class="r-modal-shadow"
    @click.self="closeModalRegistration"
  >
    <div class="r-modal">
      <div class="r-modal-close" @click="closeModalRegistration">&#10006;</div>

      <slot name="bodyRegistration">
        <div class="r-modal-content">
          <p class="p-registration">Регистрация нового пользователя</p>
          <form class="r-form">
            <input
              class="r-username"
              type="text"
              name="username"
              minlength="6"
              placeholder="Введите ваше имя"
              required
            />
            <input
              class="r-email"
              type="email"
              name="email"
              placeholder="Введите email"
              required
            />
            <input
              class="r-password"
              type="password"
              name="password"
              minlength="8"
              placeholder="Введите пароль"
              required
            />
            <input
              class="r-password"
              type="password"
              name="passwordtwo"
              minlength="8"
              placeholder="Повторите пароль"
              required
            />

            <div class="r-submit">
              <button class="r-button" type="submit">Зарегистрировать</button>
            </div>
          </form>
        </div>
      </slot>
    </div>
  </div>
</template>

<script type = "text/javascript" >
export default {
  name: "Registration",
  data: function () {
    return {
      showRegistration: false,
    };
  },
  methods: {
    closeModalRegistration: function () {
      this.showRegistration = false;
    },
  },
};
</script>

<style scoped>
.r-modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
  display: flex;
  padding: 0.1rem;
}

.r-modal {
  background: #fff;
  padding: 15px;
  min-width: 210px;
  max-width: 180px;
  min-height: 220px;
  position: absolute;
  top: 30%;
  left: 15%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.r-modal-content {
  /* display: flex; */
  margin-top: 1rem;
  font-family: "Source Sans Pro", sans-serif;
  font-size: calc(11px + 0.3vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  margin: 1rem;
}
.r-modal-close {
  cursor: pointer;
  color: rgb(162, 160, 160);
  float: right;
}
.p-registration {
  margin: 0.1em;
  text-align: center;
}

input {
  margin-top: 15px;
  outline-color: rgb(220, 211, 211);
}
.r-button {
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
</style>