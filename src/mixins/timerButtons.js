export default {
  methods: {
    calculateTime(callback) {
      if (!this.isRunning) {
        this.setMinutesAndSecondsIfPaused();
        callback();
        this.setTime();
        this.setStartProgressTime();
      }
    },
    addMinutes() {
      if (this.minutesData < this.max) {
        this.calculateTime(() => { this.minutesData++; });
      }
    },
    substractMinutes() {
      if (this.minutesData > 0) {
        this.calculateTime(() => { this.minutesData--; });
      }
    },
    addSeconds() {
      if (this.secondsData < this.max) {
        this.calculateTime(() => { this.secondsData++; });
      }
    },
    substractSeconds() {
      if (this.secondsData > 0) {
        this.calculateTime(() => { this.secondsData--; });
      }
    }
  }
};
