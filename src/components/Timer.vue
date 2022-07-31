<template>
  <div class="timer">
    <div class="timer__wrapper">
      <TimerInput v-model="minutes" class="input timer__minutes" :max="max" :disabled="isRunning" />
      <TimerButtons @add="addMinutes" @substract="substractMinutes" />
      <TimerInput v-model="seconds" class="input timer__seconds" :max="max" :disabled="isRunning"/>
      <TimerButtons @add="addSeconds" @substract="substractSeconds" />
    </div>
    <button class="timer__start" @click="start">Start Timer</button>
    <button class="timer__pause" @click="pause">Pause Timer</button>
    <button class="timer__reset" @click="reset">Reset Timer</button>
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
    setTime() {
      if (!this.isRunning) {
        this.time = (this.minutesData * 60 + this.secondsData);
      }
    },
    addMinutes() {
      if (this.minutesData < this.max && !this.isRunning) {
        this.setMinutesAndSecondsIfPaused();
        this.minutesData ++;
        this.setTime();
      }
    },
    substractMinutes() {
      if (this.minutesData > 0 && !this.isRunning) {
        this.setMinutesAndSecondsIfPaused();
        this.minutesData --;
        this.setTime();
      }
    },
    addSeconds() {
      if (this.secondsData < this.max && !this.isRunning) {
        this.setMinutesAndSecondsIfPaused();
        this.secondsData ++;
        this.setTime();
      }
    },
    substractSeconds() {
      if (this.secondsData > 0 && !this.isRunning) {
        this.setMinutesAndSecondsIfPaused();
        this.secondsData --;
        this.setTime();
      }
    },
    start() {
      this.setTime();
      this.isRunning = true;
      this.isPaused = false;

			if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
						this.time --;
					} else {
						clearInterval(this.timer);
						this.reset();
					}
				}, 1000);
			}
    },
    stop() {
			this.isRunning = false;
			clearInterval(this.timer);
			this.timer = null;
		},
    pause() {
      if (!this.isPaused) {
        this.stop();
        this.isPaused = true;
        this.setMinutesAndSecondsIfPaused();
      }
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
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__wrapper {
    display: flex;
    padding: 55px 20px;
    box-shadow: rgb(217 218 222) 9.91px 9.91px 15px inset, rgb(255 255 255) -9.91px -9.91px 15px inset;
    border-radius: 25px;
    margin: 0 10vw;
  }

  &__start {
    border: 2px solid #eee;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px 0;
  }
}
</style>
