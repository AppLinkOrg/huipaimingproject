function setRem() {
    var width = document.documentElement.getBoundingClientRect().width;

    var rem = width * 100 / 375;

    var remStyle = document.createElement("style");

    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';

    if (rem < 100) {

        var div1 = document.createElement('div');

        div1.style.width = '1.4rem';

        div1.style.height = '0';

        document.body.appendChild(div1);

        var ideal = 140 * width / designWidth;

        var rmd = (div1.clientWidth / ideal);

        if (rmd > 1.05 || rmd < 0.95) {

            rem = 100 * (width / designWidth) / rmd;

        }

        document.body.removeChild(div1);

    }
}

setRem()

window.onresize = function() {
    setRem()
}