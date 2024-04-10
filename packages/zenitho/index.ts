import Zenitho from './src/zenitho.vue'
import {App} from "vue";

// 为组件提供 install 安装方法，供按需引入
Zenitho.install = (Vue: App) => {
    Vue.component('Zenitho', Zenitho)
}

// 导出组件
export default Zenitho
