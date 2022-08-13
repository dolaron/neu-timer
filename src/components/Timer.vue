<template>
  <div class="timer" :style="progressStyle">
    <div class="timer__wrapper" :data-width="progress">
      <div class="timer__elems">
        <TimerInput v-model="minutes" :max="max" :disabled="isRunning" />
        <TimerButtons @add="addMinutes" @substract="substractMinutes" />
        <TimerInput v-model="seconds" :max="max" :disabled="isRunning"/>
        <TimerButtons @add="addSeconds" @substract="substractSeconds" />
      </div>
      <div class="timer__progress"></div>
    </div>
    <button class="timer__start" @click="start">Start Timer</button>
    <button class="timer__pause" @click="pause">Pause Timer</button>
    <button class="timer__reset" @click="reset">Reset Timer</button>
  </div>
</template>

<script>
import TimerInput from './TimerInput.vue';
import TimerButtons from './TimerButtons.vue';
import timerButtons from '../mixins/timerButtons';

export default {
  name: 'Timer',
  mixins: [
    timerButtons
  ],
  data() {
    return {
      hoursData: 0,
      minutesData: 10,
      secondsData: 0,

      time: 0,
      startTime: 0,
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

    progress() {
      debugger;
      if (this.time && this.isRunning) {
        return (this.time * 100) / this.startTime;
      } else if (this.time && !this.isRunning) {
        return (this.time * 100) / (this.max * 60 + this.secondsData)
      }
      return 0;
    },
    progressStyle() {
      return {
        '--progress-value': `${this.progress}%`,
        '--display-pseudo-elem': this.progress ? 'flex' : 'none'
      };
    }
  },
  methods: {
    setTime() {
      if (!this.isRunning) {
        this.time = (this.minutesData * 60 + this.secondsData);
      }
    },
    setMinutesAndSecondsIfPaused() {
      if (this.isPaused) {
        this.minutesData = this.minutes;
        this.secondsData = this.seconds;
      }
    },
    setStartProgressTime() {
      if (this.isPaused) {
        if (this.minutes === this.minutesData && this.seconds === this.secondsData) {
          this.startTime = this.time;
        }
        return;
      }
      this.startTime = (this.minutesData * 60 + this.secondsData);
    },

    start() {
      this.setTime();
      this.setStartProgressTime();
      this.isRunning = true;
      this.isPaused = false;

			if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
						this.time --;
            document.title = `${Math.round(Math.floor(this.time / 60))}:${Math.round((((this.time / 60) - this.minutes) * 60))}`;
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
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 65px 35px;
    box-shadow: var(--timer-box-shadow);
    border-radius: 25px;
    margin: 0 10vw;
  }

  &__elems {
    display: flex;
    flex-direction: row;
  }

  &__progress {
    position: relative;
    width: 95%;
    min-height: 25px;
    
    &:before,
    &:after {
      position: absolute;
      top: 0;
      left: 2%;
      display: var(--display-pseudo-elem);
      content: '';
      border-radius: var(--progress-border-radius);
      transition: width 0.2s ease-out; // TODO change from width to scale or something else
      height: 25px;

      @media (min-width: 600px) {
        min-height: 35px;
      }
    }

    &::before {
      bottom: 25px;
      background-color: var(--progress-background-color);
      width: calc(var(--progress-value)); // TODO fix width at the end of timer counting
      box-shadow: var(--progress-box-shadow);
      min-width: 0;
    }
  }

  &__start {
    border: 2px solid transparent;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px 0;
  }
}
</style>
