<template>
  <label for="checkbox" class="switch-label">
    <span>🌙</span>
    <span>☀️</span>
    <div
      class="switch-toggle"
      :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
    ></div>
  </label>
</template>

<script>
export default {
  name: 'ThemeToggle'
}
</script>

<style lang="scss">

</style>
