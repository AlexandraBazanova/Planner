<template>
  <div class="mini-calendar" ref="widthNextMonth">
    <section class="current-month" >
      <div class="minicalendar-top">
        <button class="mini-button-past" @click="viewMonthShift -= 12">
          <mdicon name="chevron-double-left" width="20" height="20" />
        </button>
        <button class="mini-button-past" @click="viewMonthShift -= 1">
          <mdicon name="chevron-left" width="20" height="20" />
        </button>
        <div class="month-card" v-for="(el, index) in showMonth" :key="index">
          {{ el.format("MMMM YYYY") }}
        </div>
        <button class="mini-button-future" @click="viewMonthShift += 1">
          <mdicon name="chevron-right" width="20" height="20" />
        </button>
        <button class="mini-button-future" @click="viewMonthShift += 12">
          <mdicon name="chevron-double-right" width="20" height="20" />
        </button>
      </div>

      <div class="minicontainer-weekday">
        <div
          class="mini-weekday"
          v-for="element in weekday"
          :key="element"
          v-bind:class="{ sunday: element === 'вс' }"
        >
          {{ element }}
        </div>
      </div>

      <div class="mini-days-grid">
        <div
          class="mini-dayscard"
          v-for="(day, index) in showDays"
          :key="index"
          v-bind:class="{
            minidaytoday: isToday(day),
            sunday: isSunday(day),
            notactualymonth: !isThisMonth(day),
            holliday: isHolliday(day),
          }"
        >
          {{ day.format("D") }}
        </div>
      </div>
    </section>

    <section class="next-month" id="nextmonth" v-if="largeWindow">
      <div class="minicalendar-top">
        <button class="mini-button-future" @click="viewMonthShift -= 12">
          <mdicon name="chevron-double-left" width="20" height="20" />
        </button>
        <button class="mini-button-past" @click="viewMonthShift -= 1">
          <mdicon name="chevron-left" width="20" height="20" />
        </button>
        <div
          class="month-card"
          v-for="(el, index) in showNextMonth"
          :key="index"
        >
          {{ el.format("MMMM YYYY") }}
        </div>
        <button class="mini-button-future" @click="viewMonthShift += 1">
          <mdicon name="chevron-right" width="20" height="20" />
        </button>
        <button class="mini-button-future" @click="viewMonthShift += 12">
          <mdicon name="chevron-double-right" width="20" height="20" />
        </button>
      </div>
      <div class="minicontainer-weekday">
        <div
          class="mini-weekday"
          v-for="element in weekday"
          :key="element"
          v-bind:class="{ sunday: element === 'вс' }"
        >
          {{ element }}
        </div>
      </div>
      <div class="mini-days-grid">
        <div
          class="mini-dayscard"
          v-for="(day, index) in showNextDays"
          :key="index"
          v-bind:class="{
            notactualymonth: !isNextMonth(day),
            minidaytoday: isToday(day),
            sunday: isSunday(day),
            holliday: isHolliday(day),
          }"
        >
          {{ day.format("D") }}
        </div>
      </div>
    </section>
  </div>
</template>>  

<script>
import moment from "moment";
import "moment/locale/ru";
import { eventBus } from "../main";
import { mapState } from "vuex";

export default {
  name: "MiniCalendar",
  data: function () {
    return {
      viewMonthShift: 0,
      largeWindow: true,
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
        "07/01/2023",
      ],
    };
  },
  computed: {
    showMonth() {
      const shiftMonth = this.viewMonthShift;
      const month = this.getMonthShift(shiftMonth);
      return month;
    },
    showNextMonth() {
      const shiftMonth = this.viewMonthShift;
      const month = this.getMonthShift(shiftMonth + 1);
      return month;
    },
    weekday() {
      const week = this.getWeekday();
      return week;
    },
    showDays() {
      const shiftMonth = this.viewMonthShift;
      const days = this.getShiftDays(shiftMonth);
      return days;
    },
    showNextDays() {
      const shiftMonth = this.viewMonthShift;
      const days = this.getShiftDays(shiftMonth + 1);
      return days;
    },
    // store() {
    //   return this.$store
    // },
    // // mapState({
    //   count: state => state.count
    // })
  },

  mounted() {
    const widthNextMonth = this.$refs.widthNextMonth;
    // console.log('nextMonth width: ' + widthNextMonth.clientWidth);
    // console.log('window width ' + window.innerWidth);
    this.isLargeWindow()
  },
  created() {
    window.addEventListener("resize", this.isLargeWindow);
    

    eventBus.$on("showNextMonthContainer", () => {
      this.isLargeWindow()
    });
     
  },
  destroyed() {
    window.removeEventListener("resize", this.isLargeWindow);
  },

  methods: {
    isLargeWindow() {
      // this.largeWindow = this.$refs.widthNextMonth.clientWidth > 357
      // console.log(this.largeWindow)
      // console.log(this.$refs.widthNextMonth.clientWidth)
      return this.largeWindow = this.$refs.widthNextMonth.clientWidth > 373
    },

    isThisMonth(date) {
      return (
        date._d.toString().substr(4, 3) ===
        this.showMonth[0]._d.toString().substr(4, 3)
      );
    },

    isNextMonth(date) {
      return (
        date._d.toString().substr(4, 3) ===
        this.showNextMonth[0]._d.toString().substr(4, 3)
        
      );
    },

    isToday(date) {
      return date._d.toString().substr(0, 15) ===
        moment()._d.toString().substr(0, 15)
        ? true
        : false;
    },
    isSunday(date) {
      return date._d.toString().substr(0, 3) === "Sun";
    },
    isHolliday(date) {
      return this.hollidays.some(
        (e) => e === moment(date).format("DD/MM/YYYY")
      );
    },
    getMonthShift(viewMonthShift) {
      const getMonth = function (viewMonthShift) {
        const startOfMonth = moment()
          .startOf("month")
          .add(viewMonthShift, "month");
        const months = [];
        for (let i = 0; i <= 0; i++) {
          months.push(moment(startOfMonth).add(i, "days"));
        }
        return months;
      };
      return getMonth(viewMonthShift);
    },

    getWeekday() {
      const startOfWeek = moment().startOf("week");
      const weekdays = [];
      for (let i = 0; i <= 6; i++) {
        weekdays.push(moment(startOfWeek).add(i, "days").format("dd"));
      }
      return weekdays;
    },

    getShiftDays(viewMonthShift) {
      const daysPush = function (viewMonthShift) {
        const allDays = [];
        // const endOfMonth = moment().endOf("month").add(viewMonthShift, "month");
        const weekDayOfFirstDay = moment()
          .startOf("month")
          .add(viewMonthShift, "month")
          .isoWeekday();
        let numberOfLastMonthDays = 0;
        const startOfMonth = moment()
          .startOf("month")
          .subtract(numberOfLastMonthDays, "day")
          .add(viewMonthShift, "month");
        switch (weekDayOfFirstDay) {
          case 1:
            numberOfLastMonthDays = 0;
            break;
          case 2:
            numberOfLastMonthDays = 1;
            break;
          case 3:
            numberOfLastMonthDays = 2;
            break;
          case 4:
            numberOfLastMonthDays = 3;
            break;
          case 5:
            numberOfLastMonthDays = 4;
            break;
          case 6:
            numberOfLastMonthDays = 5;
            break;
          case 7:
            numberOfLastMonthDays = 6;
        }
        if (startOfMonth.daysInMonth() === 28) {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(numberOfLastMonthDays, "day").add(i, "days")
            );
          }
        } else if (
          weekDayOfFirstDay === 6 &&
          startOfMonth.daysInMonth() === 31
        ) {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(numberOfLastMonthDays, "day").add(i, "days")
            );
          }
        } else if (weekDayOfFirstDay === 7) {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(numberOfLastMonthDays, "day").add(i, "days")
            );
          }
        } else {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(numberOfLastMonthDays, "day").add(i, "days")
            );
          }
        }

        return allDays;
      };
      return daysPush(viewMonthShift);
    },
  },
};
</script>

<style >
.mini-calendar {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(2, auto);
  grid-gap: 1px;
  margin: 0.1em;
  border: none;
}
  
.current-month {
  display: grid;
  margin-left: 1rem;
  margin-right: 1rem;
  max-width: 18rem;
}
.next-month {
  display: grid;
  /* margin-left: 0.5rem; */
  margin-right: 1rem;
  max-width: 18rem;
}
.minicalendar-top {
  border: none;
  display: flex;
  justify-content: space-around;
  font-size: calc(11px + 0.3vw);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
}
.month-card {
  border: none;
  text-align: center;
  min-width: 82px;
  flex-grow: 5;
}
.minicontainer-weekday {
  border-bottom: none;
  display: flex;
  justify-content: space-around;
  font-family: "Source Sans Pro", sans-serif;
  font-size: calc(11px + 0.3vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  color: rgb(72, 72, 72);
}
.mini-weekday {
  border-bottom: 1px solid rgb(222, 220, 224);
  flex-grow: 1;
  text-align: center;
}

.mini-days-grid {
  font-size: calc(11px + 0.3vw);
  display: grid;
  grid-template-columns: repeat(7, minmax(20px, 1fr));
  grid-gap: 1px;
  border: none;
  height: 100%;
  line-height: 1.5em;
}
.sunday {
  color: #377F89;
}
.holliday {
  color: #4f7a80;
}
.notactualymonth {
  color: rgb(223, 219, 219) !important;
}

.minidaytoday {
  /* background-color: #b2d9d0; */
  background: #c7d4d690 !important;
  border-radius: 4px;
  color: rgb(255, 255, 255) !important;
}
.mini-button-future {
  border: none;
  padding: 0;
  color: rgb(183, 181, 186);
  outline-color: rgb(220, 211, 211);
  cursor: pointer;
  /* width: 100%; */
  flex-grow: 1;
  background-color: transparent;
}

.mini-button-past {
  border: none;
  padding: 0;
  color: rgb(183, 181, 186);
  outline-color: rgb(220, 211, 211);
  cursor: pointer;
  flex-grow: 1;
  background-color: transparent;
}
</style>
