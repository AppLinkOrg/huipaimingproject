// 编写一个简单的store模式
import { reactive } from 'vue'

const store = {
    debug: true, // 开启调试模式

    state: reactive({
        name: '',
        title:'',
    }),

    changeName(value) {
        this.state.name = value
    },
    changeTitlt(value) {
        this.state.title = value
    }
}

export default store
