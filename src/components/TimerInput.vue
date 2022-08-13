<template>
  <input :value="valueCopy" @input="onInput" :disabled="disabled" :max="max" type="number" class="timer-input"/>
</template>

<script>
export default {
  name: 'TimerInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      valueCopy: this.modelValue
    };
  },
  methods: {
    onInput(event) {
      let value = event.target.value;
      value = value.replace(/\D/g, '');

      if (value !== '') {
        this.valueCopy = parseInt(value, 10);
        if (this.max && this.valueCopy > this.max) {
          this.valueCopy = this.max;        
        } else {
          this.valueCopy = value;
        }
      }

      this.$emit('update:modelValue', this.valueCopy);
    }
  },
  watch: {
    modelValue(newVal) {
      this.valueCopy = newVal;
    }
  }
}
</script>

<style lang="scss">
input.timer-input {
  display: flex;
  border: 0;
  line-height: 1.25rem;
  text-align: center;
  background: transparent;
  font-family: var(--font-family);
  font-size: calc(60vw / 3);
  // font-size: 30ch;
  color: var(--timer-input-color);
  text-shadow: var(--timer-input-text-shadow);
  caret-color: var(--timer-input-caret-color);
  caret-shape: var(--timer-input-caret-shape);
  outline: none;
  width: 98%; // !! makes input width flexible !! 
  padding: 2%;  // !! makes input width flexible !!
  min-width: min-content;
  border-radius: 10px;
  z-index: 100;

  &[type=number] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button  {
      display: none;
    }
  }

  &::selection {
    color: var(--timer-input-selection-color);
    background: var(--timer-input-selection-background);
    width: calc(100% + 10%);
  }
}
</style>
