<template>
  <div class="timer-buttons">
    <button v-longpress="longClickEvent" @click="$emit('add')" class="timer-buttons__add"></button>
    <button v-longpress="longSubstract" @click="$emit('substract')" class="timer-buttons__substract"></button>
  </div>
</template>

<script>
export default {
  name: 'TimerButtons',
  methods: {
    longClickEvent() {
      this.$emit('add');
    },
    longSubstract() {
      this.$emit('substract');
    }
  }
}

</script>

<style lang="scss">
.timer-buttons {
  display: none;
  flex-direction: column;
  align-self: center;

  @media (min-width: 600px) {
    display: flex;
  }

  &__add,
  &__substract {
    position: relative;
    text-align: center;
    color: var(--timer-button-color);
    font-weight: 600;
    font-size: 25px;
    border: none;
    height: 50px;
    width: 50px;
    border-radius: var(--timer-button-border-radius);
    background: var(--timer-button-background);
    transition: background-color 0.2s, box-shadow 0.2s, border-radius 0.2s;
    cursor: pointer;

    &:hover {
      background: var(--timer-button-background-hover);
    }

    &:before,
    &:after {
      position: absolute;
      content: '';
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--timer-button-color);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--timer-button-border-radius);
      transition: opacity 0.2s ease, color 0.2s ease, opacity 0.2s;
      border: none;
    }

    &:before {
      opacity: 1;
      background: var(--timer-button-before-background);
      box-shadow:  var(--timer-button-before-box-shadow);
    }

    &:after {
      opacity: 0;
      background: var(--timer-button-after-background);
      box-shadow:  var(--timer-button-after-box-shadow);
    }

    &:hover {
      &:before {
        opacity: 0;
      }

      &:after {
        opacity: 1;
        color: var(--timer-button-after-color);
      }
    }
  }

  &__add {
    margin-bottom: 25px;

    &:before,
    &:after {
      content: '\25B3';
    }
  }

  &__substract {
    &:before,
    &:after {
      content: '\25BD';
    }
  }
}
</style>
