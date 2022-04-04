import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import XinXinUI from "xinxin-ui";
import router from "./router";
import Naive from "naive-ui";

createApp(App)
.use(XinXinUI)
.use(router)
.use(Naive)
.mount('#app');
