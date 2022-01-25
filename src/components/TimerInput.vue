<template>
  <input :value="modelValue" @input="onInput" :disabled="disabled" :min="min" :max="max" type="number"/>
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
  methods: {
    onInput(event) {
      debugger;
      let value = event.target.value;
      value = value.replace(/\D/g, '');

      if (value !== '') {
        value = parseInt(value, 10);
        if (this.max && value > this.max) {
          value = this.max;        
        } 

        this.$emit('update:modelValue', value);
      }
    }
  },
}
</script>