import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios' 
import VueAxios from 'vue-axios' 
import "url-search-params-polyfill";

const app = createApp(App);
//createApp(App).mount('#app')
app.use(VueAxios, axios).mount('#app');