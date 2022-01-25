<template>
  <input :value="valueCopy" @input="onInput" :disabled="disabled" :max="max" type="number"/>
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