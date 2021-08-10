<template>
  <div>
    <section class="mini-calendar">
      <section class="current-month">
        <div class="minicalendar-top">
          <button
            class="mini-button-past"
           @click="viewMonthShift -= 1" >
            <mdicon name="chevron-left" width="20" height="20" />
          </button>
          <div class="month-card"
           v-for="(el, index) in showMonth" :key="index">
            {{ el.format("MMMM YYYY") }}
          </div>
          <button
            class="mini-button-future"
           @click="viewMonthShift += 1" >
            <mdicon name="chevron-right" width="20" height="20" />
          </button>
        </div>

        <div class="minicontainer-weekday">
          <div 
          class="mini-weekday" 
          v-for="element in weekday" :key="element">
            {{ element }}
          </div>
        </div>

        <div class="mini-days-grid">
          <div
            class="mini-dayscard"
            v-for="(day, index) in showDays"
            :key="index"
            v-bind:class="{
              notactualymonth: !isThisMonth(day),
              minidaytoday: isToday(day),
            }"
          >
            {{ day.format("D") }}
          </div>
        </div>
      </section>

      <section class="next-month">
        <div class="minicalendar-top">
          <button
            class="mini-button-past"
           @click="viewMonthShift -= 1" >
            <mdicon name="chevron-left" width="20" height="20" />
          </button>
          <div
            class="month-card"
            v-for="(el, index) in showNextMonth"
            :key="index"
          >
            {{ el.format("MMMM YYYY") }}
          </div>
          <button
            class="mini-button-future"
           @click="viewMonthShift += 1" >
            <mdicon name="chevron-right" width="20" height="20" />
          </button>
        </div>
        <div class="minicontainer-weekday">
          <div
           class="mini-weekday" 
           v-for="element in weekday" :key="element">
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
            }"
          >
            {{ day.format("D") }}
          </div>
        </div>
      </section>
    </section>
  </div>
</template>>  

<script>
import moment from "moment";
import "moment/locale/ru";
export default {
  name: "MiniCalendar",
  data: function () {
    return {
      viewMonthShift: 0,
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
  },

  methods: {
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
        const endOfMonth = moment().endOf("month").add(viewMonthShift, "month");
        const weekDayOfFirstDay = moment()
          .startOf("month")
          .add(viewMonthShift, "month")
          .isoWeekday();
        let subt = 0;
        const startOfMonth = moment()
          .startOf("month")
          .subtract(subt, "day")
          .add(viewMonthShift, "month");
        switch (weekDayOfFirstDay) {
          case 1:
            subt = 0;
            break;
          case 2:
            subt = 1;
            break;
          case 3:
            subt = 2;
            break;
          case 4:
            subt = 3;
            break;
          case 5:
            subt = 4;
            break;
          case 6:
            subt = 5;
            break;
          case 7:
            subt = 6;
        }
        if (startOfMonth.daysInMonth() === 28) {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(subt, "day").add(i, "days")
            );
          }
        } else if (
          weekDayOfFirstDay === 6 &&
          startOfMonth.daysInMonth() === 31
        ) {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(subt, "day").add(i, "days")
            );
          }
        } else if (weekDayOfFirstDay === 7) {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(subt, "day").add(i, "days")
            );
          }
        } else {
          for (let i = 0; i <= 41; i++) {
            allDays.push(
              moment(startOfMonth).subtract(subt, "day").add(i, "days")
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
  grid-template-columns: repeat(2, minmax(20px, 2fr));
  grid-gap: 1px;
  margin: 0.1em;
  border: none;
}
.current-month {
  display: grid;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.next-month {
  display: grid;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.minicalendar-top {
  border: none;
  display: flex;
  justify-content: space-around;
  grid-template-columns: repeat(3, minmax(20px, 1fr));
  grid-gap: 1px;
  font-size: calc(9px + 0.3vw);
  font-family:'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  margin: 0.1rem;
}
.month-card {
  border: none;
  text-align: center;
  flex-grow: 3;
  height: 100%;
}
.minicontainer-weekday {
  border-bottom: none;
  display: flex;
  justify-content: space-around;
  font-family:'Source Sans Pro', sans-serif;
  font-size: calc(9px + 0.3vw);
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}
.mini-weekday {
  border-bottom: 1px solid rgb(222, 220, 224);
  flex-grow: 1;
  text-align: center;
}

.mini-days-grid {
  font-size: calc(8px + 0.3vw);
  display: grid;
  grid-template-columns: repeat(7, minmax(20px, 1fr));
  grid-gap: 1px;
  border: none;
  height: 100%; 
  line-height: 1.5em; 
}

.notactualymonth {
  color: rgb(223, 219, 219);
}

.minidaytoday {
  background-color: #b2d9d0;
  /* clip-path: circle(36%);
   */
   border-radius: 4px;
  color: white;
}
.mini-button-future {
  background-color: white;
  border: none;
  width: 4rem;
  color: rgb(183, 181, 186);
}

.mini-button-past {
  background-color: white;
  border: none;
  width: 4rem;
  color: rgb(183, 181, 186);
}
</style>
