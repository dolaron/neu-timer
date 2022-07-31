<template>
  <div class="timer">
    <div class="timer__wrapper">
      <TimerInput v-model="minutes" class="input timer__minutes" :max="max" />
      <TimerButtons @add="addMinutes" @substract="substractMinutes" />
      <TimerInput v-model="seconds" class="input timer__seconds" :max="max" />
      <TimerButtons @add="addSeconds" @substract="substractSeconds" />
    </div>
    <button class="timer__start" @click="start">Start Timer</button>
    <button class="timer__pause" @click="pause">Pause Timer</button>
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
      isMinutesChanged: false,
      isSecondsChanged: false,

      time: 0,
      timer: null,
      isRunning: false,
      isPaused: false,
      
      max: 59
    };
  },
  computed: {
    minutes: {
      get() {
        if (this.isRunning || this.isPaused) {
          return parseInt(this.time / 60);
        }
        return parseInt(this.minutesData);
      },
      set(value) {
        this.minutesData = parseInt(value);
        if (this.isPaused) {
          this.isMinutesChanged = true;
        }
      }
    },
    seconds: {
      get() {
        if (this.isRunning || this.isPaused) {
          return Math.round(((this.time / 60) - this.minutes) * 60); // TODO check if should be parsed to integer
        }
        return parseInt(this.secondsData);
      },
      set(value) {
        this.secondsData = parseInt(value);
        if (this.isPaused) {
          this.isSecondsChanged = true;
        }
      }
    },
  },
  methods: {
    setMinutesAndSecondsIfPaused() {
      if (this.isPaused) {
        this.minutesData = this.minutes;
        this.secondsData = this.seconds;
      }
    },
    setTimeIfPaused() {
      if (this.isPaused) {
        this.time = (this.minutesData * 60 + this.secondsData);
      }
    },
    addMinutes() {
      this.setMinutesAndSecondsIfPaused();
      if (this.minutesData < this.max && !this.isRunning) {
        this.minutesData ++;
      }
      this.setTimeIfPaused();
    },
    substractMinutes() {
      this.setMinutesAndSecondsIfPaused();
      if (this.minutesData > 0 && !this.isRunning) {
        this.minutesData --;
      }
      this.setTimeIfPaused();
    },
    addSeconds() {
      this.setMinutesAndSecondsIfPaused();
      if (this.secondsData < this.max && !this.isRunning) {
        this.secondsData ++;
      }
      this.setTimeIfPaused();
    },
    substractSeconds() {
      this.setMinutesAndSecondsIfPaused();
      if (this.secondsData > 0 && !this.isRunning) {
        this.secondsData --;
      }
      this.setTimeIfPaused();
    },
    start() {
      this.time = (this.minutesData * 60 + this.secondsData); // TODO check if should be parsed to integer
      this.isMinutesChanged = false;
      this.isSecondsChanged = false;
			
      this.isRunning = true;

			if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
						this.time --;
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
    pause() {
      this.stop();
      this.isPaused = true;
      this.minutesData = this.minutes;
      this.secondsData = this.seconds;
    },
		reset() {
			this.stop();
			this.time = 0;
			this.minutes = 0;
      this.seconds = 0;
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
