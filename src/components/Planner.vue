<template>
  <div class="main-calendar">
    <section class="header-widgets">
      <section class="menu">
        <div class="icon-menu" @click="showMenu" tabindex="0">
          <mdicon name="menu" width="35" height="35" />
        </div>
        <Menu ref="modal"> </Menu>
        <div class="calendar-buttons">
          <button class="button-past" @click="toNow">
            <mdicon name="chevron-double-up" width="20" height="20" />
          </button>

          <button class="button-past" @click="toPast">
            <mdicon name="chevron-up" width="20" height="20" />
          </button>
          <button class="button-future" @click="toFuture">
            <mdicon name="chevron-down" width="20" height="20" />
          </button>
        </div>
      </section>
      <Widgets />
    </section>
    <Calendar />
    <section class="footer-calendar">
      <p class="footer-text">
        &copy; 2021 Александра Базанова || Демоверсия приложения «Планировщик
        дел "4 недели"»
      </p>
    </section>
  </div>
</template>

<script>
import "moment/locale/ru";
import Menu from "@/components/Menu";
import Widgets from "@/components/Widgets";
import Calendar from "@/components/Calendar";
import { eventBus } from "../main";

export default {
  name: "Planner",
  data() {
    return {};
  },

  components: {
    Menu,
    Widgets,
    Calendar,
  },
  created() {
    eventBus.$on("showModalMenu", () => {
      this.$refs.modal.showMenu = true;
    });
  },
  methods: {
    toNow() {
      eventBus.$emit("changeWeekToNow");
    },

    toPast() {
      eventBus.$emit("changeWeekToPast");
    },

    toFuture() {
      eventBus.$emit("changeWeekToFuture");
    },

    showMenu: function () {
      this.$refs.modal.showMenu = true;
    },
  },
};
</script>

<style scoped>
.main-calendar {
  z-index: 1; 
}
.main-calendar::after {
  content: "";
  /* background-image: url(../../public/images/john-henry-canault-8LnI71txlm4-unsplash.jpg); */
  /* background-image: url(../../public/images/gilles-lambert-mSK5nNsAsLY-unsplash.jpg); */
  /* background-size: cover;
  background-clip: border-box; */
  /* opacity: 0.8; */
  /* background-color: #fafeffe5; */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}

.footer-calendar {
  display: flex;
  width: 100%;
  border: none;
  justify-content: flex-end;
}
.footer-text {
  font-size: calc(9px + 0.2vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  text-align: end;
  color: rgb(72, 72, 72);
  padding: 0.1em;
  padding-right: 1em;
  margin: 0.1em;
}
.header-widgets {
  display: grid;
  grid-template-columns: 0.02fr 1fr;
  grid-gap: 2px;
  border: none;
}
.icon-menu {
  color: rgb(162, 160, 160);
  cursor: pointer;
  float: left;
}
.calendar-buttons {
  float: left;
  margin-bottom: 0.2em;
}
.menu {
  padding: 0;
  padding-left: 0.2em;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  outline-color: rgb(220, 211, 211);
}
.button-past {
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(9px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0.1rem;
  outline-color: rgb(220, 211, 211);
}

.button-future {
  background-color: #b2d9d0;
  border-color: white;
  border: none;
  font-size: calc(9px + 0.3vw);
  border-radius: 4px;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  margin: 0.1rem;
  outline-color: rgb(220, 211, 211);
}
.button-future:hover {
  background-color: #93c9bd;
  color: white;
}
.button-past:hover {
  background-color: #93c9bd;
  color: white;
}
</style>