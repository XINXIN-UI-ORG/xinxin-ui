import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import XINXIN from "../packages/main";

createApp(App)
.use(XINXIN)
.mount('#app')
