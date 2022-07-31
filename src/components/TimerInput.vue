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
  text-align: center;
  background: transparent;
  font-family: 'Poppins', sans-serif;
  // font-size: 250px;
  font-size: calc(60vw / 3);
  // font-size: 30ch;
  color: rgb(234, 238, 247);
  text-shadow: -8px -8px 12px rgba(255,255,255,0.4), 8px 8px 12px rgba(0,0,0,0.08);
  caret-color:#262626;
  outline: none;
  width: 98%; // !! makes input width flexible !! 
  padding: 1%;  // !! makes input width flexible !!
  min-width: min-content;
  border-radius: 10px;

  &[type=number] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button  {
      display: none;
    }
  }

  &::selection {
    color: gainsboro;
    background: beige;
    width: calc(100% + 10%);
  }
}
</style>
