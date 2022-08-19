import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import Aboutus from '../views/Aboutus.vue'
import Feedback from '../views/Feedback.vue'
import Paiming from '../views/Paiming.vue'
import History from '../views/History.vue'
import Explain from '../views/Explain.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/aboutus',
        name: 'Aboutus',
        component: Aboutus,
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: Feedback,
    },
    {
        path: '/paiming',
        name: 'Paiming',
        component: Paiming,
    },
    {
        path: '/history',
        name: 'History',
        component: History,
    },
    {
        path: '/explain',
        name: 'Explain',
        component: Explain,
    },


]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router