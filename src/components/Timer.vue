<template>
  <div class="timer">
    <div class="timer__wrapper">
      <input v-model="minutes" class="input timer__minutes" type="Number"/>
      <input v-model="seconds" class="input timer__seconds" type="Number"/>
    </div>
    <buttton class="timer__start" @click="start">Start Timer</buttton>
  </div>
</template>

<script>
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
      timer: null
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
        debugger;
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
    playSound() {
      debugger;
    },
    start() {
      debugger;
      this.time = (this.minutes * 60 + this.seconds)
			this.isRunning = true;
			if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
						this.time--
					} else {
						clearInterval(this.timer)
						this.reset()
					}
				}, 1000 )
			}
    },
    stop () {
			this.isRunning = false
			clearInterval(this.timer)
			this.timer = null
		},
		reset () {
			this.stop()
			this.time = 0
			this.seconds = 0
			this.minutes = 0
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.input {
  border: 0;
  height: 100px;
  font-size: 25px;
  text-align: center;
  background: transparent;
}

input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none; 
  margin: 0; 
}
</style>
