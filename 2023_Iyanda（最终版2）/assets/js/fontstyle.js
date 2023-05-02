// 主要用于生成鼠标指针点击的动画
(function () {
    var mid = 0;
    window.onclick = function (event) {
        var mw = new Array("❤C++❤", "❤C#❤", "❤汇编❤", "❤Java❤", "❤HTML❤", "❤CSS❤", "❤JavaScript❤", "❤Web❤", "❤C❤","❤软件工程❤", "❤编译❤", "❤电子❤");

        var mimg = document.createElement("b"); //其中，mw是mouseclick的数组，mid是序号，mimg时效果变化
        mimg.onselectstart = new Function('event.returnValue=false'); //防止拖动

        document.body.appendChild(mimg).innerHTML = mw[mid]; //将动效元素添加到页面上
        mid = (mid + 1) % mw.length;
        mimg.style.cssText = "position: fixed;left:-100%;"; 

        var f = 16, // 字体大小
            x = event.clientX - f / 2, // 横坐标
            y = event.clientY - f, // 纵坐标
            c = randomColor(), // 随机颜色
            a = 1, // 透明度
            s = 1.2; // 放大缩小

        var timer = setInterval(function () { //通过设置定时器，设置动画渐变效果
            if (a <= 0) {
                document.body.removeChild(mimg);
                clearInterval(timer);
            } else {
                mimg.style.cssText = "font-size:16px;cursor: default;position: fixed;color:" +
                    c + ";left:" + x + "px;top:" + y + "px;opacity:" + a + ";transform:scale(" +
                    s + ");";

                y--;
                a -= 0.016;
                s += 0.002;
            }
        }, 15)

    }
    // 随机颜色
    function randomColor() {

        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math
        .random() * 255)) + ")";
    }
}());
