import {App, Plugin} from 'vue';
import Novatrix from './novatrix'
import Zenitho from './zenitho'

const components = [
    {
        name: 'Novatrix',
        component: Novatrix
    },
    {
        name: 'Zenitho',
        component: Zenitho
    }
]

const install: Plugin = (app: App) => {
    components.forEach(component => app.component(component.name, component.component))
}

declare global {
    interface Window {
        Vue?: any;
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Novatrix,
    Zenitho
}
