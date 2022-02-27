<template>
  <div class="timer-buttons">
    <button @click="emit('add')" class="timer-buttons__add"></button>
    <button @click="emit('substract')" class="timer-buttons__substract"></button>
  </div>
</template>

<script>
export default {
  name: 'TimerButtons'
}

</script>

<style lang="scss">
.timer-buttons {
  display: flex;
  flex-direction: column;
  align-self: center;

  &__add,
  &__substract {
    position: relative;
    text-align: center;
    color: #d6d8dc;
    font-weight: 600;
    font-size: 25px;
    border: 0;
    height: 50px;
    width: 50px;
    border-radius: 15px;
    transition: background-color 0.2s, box-shadow 0.2s;
    cursor: pointer;

    &:before,
    &:after {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      content: '';
      color: #d6d8dc;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: opacity 0.3s ease, color 0.3s ease;
    }

    &:before {
      opacity: 1;
      background: linear-gradient(145deg, #ffffff, #d6d8dc);
      box-shadow:  5px 5px 10px #cacccf,
                  -5px -5px 10px #ffffff;
    }

    &:after {
      opacity: 0;
      background: linear-gradient(145deg, #cacccf 10%, #d6d8dc 15%, #faf9f9 80%);
      box-shadow:  -5px -5px 10px #cacccf,
                    5px 5px 10px #ffffff;
    }

    &:hover {
      &:before {
        opacity: 0;
      }

      &:after {
        opacity: 1;
        color: #b4b6b9;
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