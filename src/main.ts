import 'bootstrap/dist/css/bootstrap.min.css';
// import bootstrap js
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.css';

import hljs from 'highlight.js';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App)

app.use(router)

app.use(hljsVuePlugin);

app.mount('#app')
