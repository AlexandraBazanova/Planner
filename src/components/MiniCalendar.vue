<template>
    <div>
		<section class="mini-calendar">
			<section class="current-month">
			<div class="minicalendar-top">
				<button @click="viewMonthShift-=1" class="mini-button-past">&#60;</button>
				<div class="month-card"  v-for="(el) in showMonth" :key="el">
					{{el}}
				</div>
				<button @click="viewMonthShift+=1" class="mini-button-future">&#62;</button>
			</div>
			<div class="mini-days-grid">
				<div class="mini-weekday" v-for="(element) in weekday" :key="element" >
					{{element}}
				</div>
				<div class="mini-dayscard"  v-for="(day, ind) in showDays" :key="ind">
					{{day}}
				</div>
			</div>	
			</section>
			<section class="next-month">
			<div class="minicalendar-top">
				<button @click="viewMonthShift-=1" class="mini-button-past">&#60;</button>
				<div class="month-card"  v-for="(el) in showNextMonth" :key="el">
					{{el}}
				</div>
				<button @click="viewMonthShift+=1" class="mini-button-future">&#62;</button>
			</div>
			<div class="mini-days-grid">
				<div class="mini-weekday" v-for="(element) in weekday" :key="element" >
					{{element}}
				</div>
				<div class="mini-dayscard"  v-for="(day, ind) in showNextDays" :key="ind">
					{{day}}
				</div>
			</div>
			</section>
		</section>
    </div>
</template>>  

<script>
	import moment from 'moment'
    import 'moment/locale/ru';
    export default { 
        data() {
            return {
				viewMonthShift: 0,
            }
		},
		computed: {
			showMonth() {
				const shiftMonth = this.viewMonthShift
				const month = this.getMonthShift(shiftMonth)
				return month;
			},
			showNextMonth() {
				const shiftMonth = this.viewMonthShift
				const month = this.getMonthShift(shiftMonth + 1)
				return month;
			},
			weekday() {
        		const week = this.getWeekday()
        		return week;
			 },
			showDays() {
				const shiftMonth = this.viewMonthShift
        		const days = this.getShiftDays(shiftMonth)
        		return days;
       		 },
				showNextDays() {
				const shiftMonth = this.viewMonthShift
        		const days = this.getShiftDays(shiftMonth + 1)
        		return days;
       		 },
		},

        methods:{
			getMonthShift(viewMonthShift) {
				const getMonth = function(viewMonthShift) {
        		const startOfMonth = moment().startOf('month').add(viewMonthShift, 'month');
        		const months = [];
        		for (let i = 0; i <= 0 ; i++) {
          		months.push(moment(startOfMonth).add(i, 'days').format('MMMM'));
       			}
				return months
				}
			return getMonth(viewMonthShift)
			},

             getWeekday() {
        		const startOfWeek = moment().startOf('week');
        		const weekdays = [];
        		for (let i = 0; i <= 6; i++) {
          		weekdays.push(moment(startOfWeek).add(i, 'days').format('dd'));
       			}
        		return weekdays;
			},
			getShiftDays(viewMonthShift) { 
       			const daysPush = function(viewMonthShift)  {
				const allDays = [];
				const endOfMonth   = moment().endOf('month').add(viewMonthShift , 'month');
				const weekDayOfFirstDay = moment().startOf('month').add(viewMonthShift, 'month').isoWeekday();
				let subt = 0;
				const startOfMonth = moment().startOf('month').subtract(subt, 'day').add(viewMonthShift, 'month');
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
					};
					if(startOfMonth.daysInMonth() === 28){
						for (let i =0 ; i <= 27; i++) {
						allDays.push(moment(startOfMonth).subtract(subt, 'day').add( i , 'days').format('D'));
					    }
					} else if ( weekDayOfFirstDay === 6  && startOfMonth.daysInMonth() === 31) {

						for (let i =0 ; i <= 41; i++) {
						allDays.push(moment(startOfMonth).subtract(subt, 'day').add( i , 'days').format('D'));
					    }
					} else if ( weekDayOfFirstDay === 7 ) {

						for (let i =0 ; i <= 41; i++) {
						allDays.push(moment(startOfMonth).subtract(subt, 'day').add( i , 'days').format('D'));
					    }
					} else {
                        for (let i =0 ; i <= 34; i++) {
						allDays.push(moment(startOfMonth).subtract(subt, 'day').add( i , 'days').format('D'));
					}
					}
					// console.log(startOfMonth);
					// console.log(weekDayOfFirstDay);
					// console.log(startOfMonth.daysInMonth());
					
				  return allDays
			   }
			   return daysPush(viewMonthShift) 
      		},
        }
		
    } 
</script>

<style>
	.mini-calendar{
		display: grid;
		grid-template-columns: repeat(2, minmax(20px, 2fr));
		grid-gap: 1px;
		font-size: calc(10px + 0.3vw);
		margin: 0.1rem;
		border: 1px solid rgb(12, 177, 92);
	}
	.current-month{
		display: grid;
		margin: 0.1rem;
	}
	.next-month{
		display: grid;
		margin: 0.1rem;
	}
	.minicalendar-top {
		border: 1px solid rgb(100, 13, 230);
		display: grid;
    	grid-template-columns: repeat(3, minmax(20px, 1fr));
    	grid-gap: 1px;
    	font-size: calc(11px + 0.3vw);
    	margin: 0.2rem;
	}
	.month-card {
		border: 1px solid rgb(213, 20, 209);
  		text-align:center;
	}
	.mini-days-grid{
		display: grid;
  		grid-template-columns: repeat(7, minmax(20px, 1fr));
  		grid-gap: 1px;
  		border: 1px solid rgb(183, 181, 186);
	}
	.mini-weekday {
		border: 1px solid rgb(183, 181, 186);
  		text-align:center;
	}
	.mini-dayscard{
		border: 1px solid rgb(183, 181, 186);
  		text-align:center;
	}
	.color {
		color: red;
	}

</style>
