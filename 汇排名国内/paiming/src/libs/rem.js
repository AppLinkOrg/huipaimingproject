// 基准大小
const baseSize = 32
    // 设置 rem 函数
function setRem() {

    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 375
        // 设置页面根节点字体大小
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
        // // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
        // let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        // //得到html的Dom元素
        // let htmlDom = document.getElementsByTagName('html')[0];
        // //设置根元素字体大小
        // htmlDom.style.fontSize = htmlWidth / 37.5 + 'px';
}

// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
    setRem()
}