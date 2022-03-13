<template>
  <div>
    <section class="widget-bar">
      <section class="notes">
        <!-- <p>Заметки</p> -->
        <Notes />
      </section>

      <section class="two-months">
        <MiniCalendar class="mini-calendar1" />
      </section>
    </section>
  </div>
</template>

<script type = "text/javascript" >
import MiniCalendar from "@/components/MiniCalendar";
import Notes from "@/components/Notes";

export default {
  name: "Widgets",
  data: function () {
    return {
      miniCalendar: false,
    };
  },

  components: {
    MiniCalendar,
    Notes,
  },
};
</script>

<style scoped>
p {
  margin: 0.1em;
  margin-top: 0.3em;
  font-size: calc(11px + 0.2vw);
}
.widget-bar {
  display: grid;
  grid-template-columns:  1.6fr 1fr;
  grid-gap: 2px;
  border: none;
  margin: 0.1rem;
  font-size: calc(11px + 0.2vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
}
.notes {
  text-align: center;
  margin-top: 1em;
}
.two-months {
  text-align: center;
  border: none;
  /* display: flex;
  flex-direction: column; */
}
.calendar-buttons {
  display: flex;
  flex-direction: column;
}
</style>