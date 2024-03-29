import { createApp } from 'vue';
import App from './App.vue';
import './styles/main.scss';

const app = createApp(App);

app.directive('longpress', (el, binding, vNode) => {
  // Make sure expression provided is a function
  if (typeof binding.value !== 'function') {
    // Fetch name of component
    const compName = vNode.context.name;
    // pass warning to console
    let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`;
    
    if (compName) {
      warn += `Found in component '${compName}' `;
    }
    console.warn(warn);
  }

  // Define variable
  let pressTimer = null;
  let pressInterval = null;

  // Define funtion handlers
  // Create timeout ( run function after 200ms )
  let start = (e) => {
    if (e.type === 'click' && e.button !== 0) {
      return;
    }

    if (pressTimer === null) {
      pressTimer = setTimeout(function() {
        pressInterval = setInterval(function() {
          handler();
        }, 50);    
      }, 200);
    }
  }

  // Cancel Timeout
  let cancel = () => {
    // Check if timer has a value or not
    if (pressTimer !== null) {
      clearTimeout(pressTimer);
      clearInterval(pressInterval);
      pressTimer = null;
      pressInterval = null;
    }
  }
  
  // Run Function
  const handler = (e) => {
    binding.value(e);
  }

  // Add Event listeners
  el.addEventListener("mousedown", start);
  el.addEventListener("touchstart", start);
  // Cancel timeouts if this events happen
  el.addEventListener("click", cancel);
  el.addEventListener("mouseout", cancel);
  el.addEventListener("touchend", cancel);
  el.addEventListener("touchcancel", cancel);
});

app.mount('#app');
