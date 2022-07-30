<template>
  <div class="timer">
    <div class="timer__wrapper">
      <TimerInput v-model="minutes" class="input timer__minutes" :max="max" />
      <TimerButtons @add="addMinutes" @substract="substractMinutes" />
      <TimerInput v-model="seconds" class="input timer__seconds" :max="max" />
      <TimerButtons />
    </div>
    <button class="timer__start" @click="start">Start Timer</button>
  </div>
</template>

<script>
import TimerInput from './TimerInput.vue';
import TimerButtons from './TimerButtons.vue';

export default {
  name: 'Timer',
  data() {
    return {
      hoursData: 0,
      minutesData: 10,
      secondsData: 0,
      milisecondsData: 0,
      
      isRunning: false,
      time: 0,
      timer: null,
      
      max: 59
    };
  },
  computed: {
    minutes: {
      get() {
        if (this.isRunning) {
          return parseInt(this.time / 60);
        }
        return this.minutesData;
      },
      set(value) {
        this.minutesData = value
      }
    },
    seconds: {
      get() {
        if (this.isRunning) {
          return Math.round(((this.time / 60) - this.minutes) * 60);
        }
        return parseInt(this.secondsData);
      },
      set(value) {
        this.secondsData = parseInt(value);
      }
    },
  },
  methods: {
    addMinutes() {
      if (this.minutesData < this.max)
        this.minutesData ++;
    },
    // https://stackoverflow.com/questions/11624078/repeating-settimeout DELTA TIMER
    substractMinutes() {
      if (this.minutesData > 0) {
        this.minutesData --;
      }
    },
    start() {
      this.time = (this.minutes * 60 + this.seconds);
			this.isRunning = true;

			if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
						this.time--;
					} else {
						clearInterval(this.timer);
						this.reset();
					}
				}, 1000)
			}
    },
    stop() {
			this.isRunning = false;
			clearInterval(this.timer);
			this.timer = null;
		},
		reset() {
			this.stop();
			this.time = 0;
			this.seconds = 0;
			this.minutes = 0;
		}
  },
  components: {
    TimerInput,
    TimerButtons
  }
}
</script>

<style lang="scss">
.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__wrapper {
    display: flex;
    padding: 55px 20px;
    box-shadow: rgb(217 218 222) 9.91px 9.91px 15px inset, rgb(255 255 255) -9.91px -9.91px 15px inset;
    border-radius: 25px;
  }

  &__start {
    border: 2px solid #eee;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px 0;
  }
}
</style>
