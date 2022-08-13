<template>
  <button class="toggle-theme" @click="toggleTheme">
    {{userTheme === 'light-theme' ? 'Dark Theme' : 'Light Theme'}}
  </button>
  <ThemeToggle />
  <Timer />
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    ThemeToggle,
    Timer
  },
  data() {
    return {
      userTheme: 'light-theme'
    }
  },
  methods: {
    setTheme(theme) {
      localStorage.setItem('neu-timer-theme', theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    getTheme() {
      return localStorage.getItem('neu-timer-theme');
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem('neu-timer-theme');
      if (activeTheme === 'light-theme') {
        this.setTheme('dark-theme');
      } else {
        this.setTheme('light-theme');
      }
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (hasDarkPreference) {
        return 'dark-theme';
      } else {
        return 'light-theme';
      }
    }
  },
  mounted() {
    let initUserTheme = this.getMediaPreference();
    let localStorageTheme = localStorage.getItem('neu-timer-theme')
    if (localStorageTheme) {
      initUserTheme = localStorageTheme;
    }
    this.setTheme(initUserTheme);
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  transition: background-color 0.2s;
  background-color: var(--background-color-primary);
}

#app {
  position: relative;
  display: flex;
  height: 100%;
}

.toggle-theme {
  position: absolute;
  display: flex;
  flex: 0;
  top: 0;
  margin: 0 auto;
}
</style>
