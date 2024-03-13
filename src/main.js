import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { createPinia } from 'pinia';
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD9Vk6VSkk3_ruLwzt98wJKb7EM8X3KQaU',
        libraries: 'places'
    }
})
app.mount('#app')

