
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import { createHead } from '@unhead/vue';
const head = createHead;

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(head);
app.use(ToastPlugin,{
    position: 'bottom'
});

app.mount('#app')
