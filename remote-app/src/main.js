import { createApp } from 'vue'
import App from './App.vue'
import PollingMixin from '@/mixing/PollingMixin.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLightbulb, faTools, faPlusCircle, faPlus, faCopy, faPaste, faLayerGroup, faThLarge, faVideo, faAngleLeft, faAngleRight, faCog, faRedoAlt, faArrowsAlt, faUnlockAlt, faLock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Add a global Polling mixin
// Vue.mixin(PollingMixin);

const app = createApp(App)

library.add(faLightbulb, faTools, faPlusCircle, faPlus, faCopy, faPaste, faLayerGroup, faThLarge, faVideo, faAngleLeft, faAngleRight, faCog, faRedoAlt, faArrowsAlt, faUnlockAlt, faLock, faCheck, faTimes)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mixin(PollingMixin)

app.mount('#app')
