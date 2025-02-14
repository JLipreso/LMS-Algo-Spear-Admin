
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import 'bootstrap-icons/font/bootstrap-icons.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createHead } from '@unhead/vue';
const head = createHead;

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .use(head)
    .use(ToastPlugin,{ position: 'bottom' })
    .use(VueSweetalert2);

app.mount('#app')
