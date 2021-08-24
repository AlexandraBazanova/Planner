<template>
  <div id="app">
    <section class="main-planner">
      <Planner />
     
    </section>
  </div>
</template>

<script>
import "moment/locale/ru";
import Planner from "@/components/Planner";

export default {
  name: "app",
  data() {
    return {
      now: "",
    };
  },

  computed: {},
  methods: {
    logthis: function () {
      console.log(this);
    },
  },

  components: {
    Planner,
  },
};
</script>

<style scoped>
.main-planner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /* height: 100%; */
  border: none;
}

</style>
