<template>
  <div class="day">
    <div
      class="date-of-the-day"
      v-on:click="isImportantday(day.dayMonth._d)"
      v-on:dblclick="showModalColors"
      v-bind:class="{
        daytoday: isToday,
        dayimportant: colorImportantDay,
        sunday: isSunday,
        holliday: isHolliday,
      }"
    >
      {{ displayDate(day.dayMonth) }}
    </div>
    <DayAddTodo :day="day"> </DayAddTodo>
    <DayDisplayTodo
      :day="day"
      :todo="todo"
      v-for="(todo, index) in day.todos"
      :key="index"
    >
    </DayDisplayTodo>

    <Colors ref="modalColors" :colorOfImportantDay="colorOfImportantDay"> </Colors>
  </div>
</template>

<script type = "text/javascript">
import moment from "moment";
import "moment/locale/ru";
import DayAddTodo from "@/components/DayAddTodo";
import DayDisplayTodo from "@/components/DayDisplayTodo";
import Colors from "@/components/Colors";

export default {
  name: "Day",
  data: function () {
    return {
      dateOfImportantDay: "",
      // colorOfImportantDay: "#a8cdd353",
      hollidays: [
        "08/03/2021",
        "08/03/2022",
        "08/03/2023",
        "23/02/2021",
        "23/02/2022",
        "23/02/2023",
        "09/05/2021",
        "09/05/2022",
        "09/05/2023",
        "01/01/2022",
        "01/01/2023",
        "01/05/2021",
        "01/05/2022",
        "01/05/2023",
        "24/04/2022",
        "07/01/2022",
        "07/01/2021",
        "07/01/202",
      ],
    };
  },

  components: {
    DayAddTodo,
    DayDisplayTodo,
    Colors
  },

  props: {
    day: {
      type: Object,
      required: true,
    },
    colorOfImportantDay: {
          type: String,
      }
  },

  computed: {
    isToday() {
      return this.day.dayMonth._d.toString().substr(0, 15) ===
        moment()._d.toString().substr(0, 15)
        ? true
        : false;
    },

    isSunday() {
      return this.day.dayMonth._d.toString().substr(0, 3) === "Sun";
    },
    isHolliday() {
      return this.hollidays.some(
        (e) => e === moment(this.day.dayMonth).format("DD/MM/YYYY")
      );
    },
    colorImportantDay() {
      if (this.day.importantDays[0] !== undefined) {
        return (
          this.day.dayMonth._d.toString() ===
          this.day.importantDays[0].dateOfImportantDay.toString()
        );
      }
    },
  },

  methods: {
    displayDate(date, formatType) {
      return moment(date).format("D MMMM");
    },

    isImportantday(dateOfImportantDay) {
      const dayIsImportant = true;
      const idImportantDay = moment(dateOfImportantDay).format("x");
      const colorOfImportantDay = this.colorOfImportantDay;
      this.$emit("addImportantday", {
        dateOfImportantDay,
        idImportantDay,
        dayIsImportant,
        colorOfImportantDay,
      });
    },
    showModalColors: function () {
      this.$refs.modalColors.showColors = true;
    },
  },
};
</script>

<style scoped>
.date-of-the-day {
  text-align: center;
  font-size: calc(10px + 0.3vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
  cursor: pointer;
}
.date-of-the-day:hover {
  background-color: #a8cdd3d0;
  border-radius: 4px;
  color: white;
  transition: all 0.5s ease;
}

.daytoday {
  background-color: #d5ece7;
  /* background-color: #b2d9d0; */
  /* color: white; */
  border-radius: 4px;
}

.dayimportant {
  /* background-color: #D4E7EA; */
  background-color: #a8cdd353;
  border-radius: 4px;
}
.sunday {
  color: #377F89;
}
.holliday {
  color: #4f7a80;
}
</style>