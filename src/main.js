import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import HomeView from "@/views/HomeView.vue";

const app = createApp(App)


app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
