import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import XinXinUI from "xinxin-ui";
import router from "./router";
import Naive from "naive-ui";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App)
.use(XinXinUI)
.use(router)
.use(Naive)
.use(ElementPlus)
.mount('#app');
