<template>
  <div class="menu-modal">
    <div v-if="showMenu" class="modal-shadow" @click.self="closeModalMenu">
      <div class="modal">
        <div class="modal-close" @click="closeModalMenu" tabindex="0">&#10006;</div>

        <slot name="body">
          <div class="modal-content">
            <div
              class="menu-authorization"
              @click="showModalAutorization"
              tabindex="0"
            >
              <mdicon
                name="account-circle"
                class="icon"
                width="20"
                height="20"
              />
              <p class="p-menu-authorization" v-if="!authorization">
                Авторизация
              </p>
              <p class="menu-username" v-else>Имя пользователя</p>
            </div>

            <div class="menu-settings"
            @click="showModalSettings"
              tabindex="0"
            >
              <mdicon name="cog-outline" class="icon" width="20" height="20" />
              <p class="p-menu-settings">Настройки</p>
            </div>
            
            <div class="menu-exit" tabindex="0">
              <mdicon
                name="location-exit"
                class="icon"
                width="20"
                height="20"
              />
              <p class="p-menu-exit">Выйти</p>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <Autorization ref="modalAutorization"> </Autorization>
    <Settings ref="modalSettings"> </Settings>
  </div>
</template>

<script type = "text/javascript" >
import Autorization from "@/components/Autorization";
import Settings from "@/components/Settings";
export default {
  name: "Menu",
  data: function () {
    return {
      showMenu: false,
      authorization: false,
    };
  },
  components: {
    Autorization,
    Settings,
  },

  methods: {
    closeModalMenu: function () {
      this.showMenu = false;
    },

    showModalAutorization: function () {
      this.$refs.modalAutorization.showAutorization = true;
      this.showMenu = false;
    },

    showModalSettings: function () {
      this.$refs.modalSettings.showSettings = true;
      this.showMenu = false;
    },
  },
};
</script>

<style scoped>
.modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(218, 218, 218, 0.39);
  display: flex;
  padding: 0.1rem;
}

.modal {
  background: #fff;
  padding: 15px;
  min-width: 200px;
  max-width: 480px;
  min-height: 150px;
  position: absolute;
  top: 20%;
  left: 15%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.modal-content {
  margin-top: 1.8rem;
  margin-left: 2.5rem;
}
.modal-close {
  cursor: pointer;
  color: rgb(162, 160, 160);
  float: right;
  outline-color: rgb(220, 211, 211);
}
.icon {
  color: rgb(162, 160, 160);
  outline-color: rgb(220, 211, 211);
  float: left;
}
p {
  font-size: calc(11px + 0.3vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
}
.p-menu-authorization {
  padding-left: 1.8rem;
  cursor: pointer;
}
.menu-authorization {
  outline-color: rgb(220, 211, 211);
}
.p-menu-settings {
  padding-left: 1.8rem;
  cursor: pointer;
  outline-color: rgb(220, 211, 211);
}
.menu-settings {
  outline-color: rgb(220, 211, 211);
}
.p-menu-exit {
  padding-left: 1.8rem;
  cursor: pointer;
  outline-color: rgb(220, 211, 211);
}
.menu-exit {
  outline-color: rgb(220, 211, 211);
}
</style>
