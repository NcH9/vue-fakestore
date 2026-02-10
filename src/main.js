import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT7hyYE_CPIlNQp4k1tzfQpd72gSgHxeM",
  authDomain: "vue-final-project-177ad.firebaseapp.com",
  projectId: "vue-final-project-177ad",
  storageBucket: "vue-final-project-177ad.appspot.com",
  messagingSenderId: "476593590384",
  appId: "1:476593590384:web:4ccb2adb67399540c924b5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, db }

const vuetify = createVuetify({
    components,
    directives
})
const app = createApp(App)

app.directive('clickable', {
  mounted(el){
    el.style.cursor = 'pointer';
  }
});
app.directive('addTooltipOnHover', {
  mounted(el, binding) {
      let tooltipElement;
      const showTooltip = () => {
          tooltipElement = document.createElement('div');
          tooltipElement.textContent = binding.value;
          tooltipElement.style.backgroundColor = `rgba(22, 98, 51, 0.5)`;
          tooltipElement.style.borderRadius = `30%`;
          tooltipElement.style.padding = `15px`;
          document.getElementById(el.id).appendChild(tooltipElement);
      };
      const hideTooltip = () => {
          if (tooltipElement){
              document.getElementById(el.id).removeChild(tooltipElement);
              tooltipElement = null;
          }
      }
      el.addEventListener('mouseenter', showTooltip);
      el.addEventListener('mouseleave', hideTooltip);
  },
});
app.directive('draggable', {
  mounted(el){
    el.style.position = 'absolute';
    el.style.cursor = 'grab'

    let mousePosX = 0, mousePosY = 0;

    const onMouseDown = (event) => {
        event.preventDefault();

        mousePosX = event.clientX;
        mousePosY = event.clientY; 

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    const onMouseMove = (event) => {
        event.preventDefault();

        const moveDiffX = event.clientX - mousePosX;
        const moveDiffY = event.clientY - mousePosY;

        el.style.left = `${el.offsetLeft + moveDiffX}px`
        el.style.top = `${el.offsetTop + moveDiffY}px`

        mousePosX = event.clientX;
        mousePosY = event.clientY;
    };
    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    el.addEventListener('mousedown', onMouseDown);
  }
});
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
