import Novatrix from './src/novatrix.vue'
import {App} from "vue";

// 为组件提供 install 安装方法，供按需引入
Novatrix.install = (Vue: App) => {
    Vue.component('Novatrix', Novatrix)
}

// 导出组件
export default Novatrix
