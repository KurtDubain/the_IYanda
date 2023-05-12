// 轮播图的设计
// 轮播图初始化
var imgArr = []; 
var curIndex = 0; 
var timer = null; // 定时器
var clickAllow = true; // 锁，是否允许用户点击
var btnList = []; // 下方圆点切换

// 判断需要滑动距离
function slide(slideContainer , targetIndex = curIndex + 1){
    var width = 0; 
    if(targetIndex > curIndex){
        for(let i=curIndex;i<targetIndex;++i) width+=imgArr[i].width; // 正向切换则计算本图片到后续图片宽度
    }else{
        if(targetIndex === -1) width = imgArr[imgArr.length-1].width; // 特殊处理第一张图片
        else for(let i=targetIndex;i<curIndex;++i) width+=imgArr[i].width; // 逆向切换处理宽度
    }
    clickAllow = false; // 不允许用户点击
    var step = width/60; // 动态设置步长
    step = targetIndex > curIndex ? step : -step; // 正向逆向切换 
    var curConLeft = slideContainer.offsetLeft; // 获取ul的left属性，进行限时的设置
    var distanceMoved = 0; // 已经移动的距离
    var slideInterval = setInterval(function (){ // 实现切换动画
        if(Math.abs(width - distanceMoved) > Math.abs(step)){ // 边界判定，判断已移动距离以及应移动距离的差与步长关系
             curConLeft -= step; // 大于步长则不断移动
            slideContainer.style.left = `${curConLeft - step}px`; // 移动
            distanceMoved += Math.abs(step); // 已移动距离加步长
        }else{ 
            clearInterval(slideInterval); // 若最后移动距离不足步长，则清除动画定时器
            var directMove = step > 0 ? (curConLeft - width + distanceMoved) : (curConLeft + width - distanceMoved); // 正向移动与逆向移动的计算方式不同
            slideContainer.style.left = `${directMove}px`; // 直接完成此次动画
            distanceMoved = 0; // 重设移动距离为0
            curIndex = targetIndex; // 设置当前index
            if(curIndex === imgArr.length){ // index加1，判断是否为最后一张来作边缘处理
                curIndex = 0; // 最后一张则重置index
                slideContainer.style.left = `-${imgArr[0].width}px`;  // 重置ul
            }else if (curIndex === -1) {
                curIndex = imgArr.length-1; // 第一张重置index
                slideContainer.style.left = `-${slideContainer.offsetWidth - imgArr[imgArr.length-1].width - imgArr[0].width}px`;  // 重置ul
            }
            switchBtnActive(); // 右下角按钮的切换
            clickAllow = true; // 允许点击
        }
    }, 10);
}

// 对下列按钮对应设置颜色切换
function switchBtnActive(){ 
    btnList.forEach((v) => {
        v.className = "unitBtn"; // 设置其他按钮为灰色
    })
    btnList[curIndex] .className = "unitBtn active"; // 设置当前按钮为蓝色
}

// 定时器设置，增添事件
function createBtnGroup(carousel,slideContainer,config){
    document.getElementById("leftArrow").addEventListener('click',(e) => { 
        clearInterval(timer); // 清除定时器，避免手动切换时干扰
        if(clickAllow) slide(slideContainer,curIndex-1); // 允许点击则切换上一张
        timer = setInterval(() => {slide(slideContainer)},config.interval); // 重设定时器
    }) 
    document.getElementById("rightArrow").addEventListener('click',(e) => {
        clearInterval(timer); // 清除定时器，避免手动切换时干扰
        if(clickAllow) slide(slideContainer,curIndex+1); // 允许点击则切换下一张
        timer = setInterval(() => {slide(slideContainer)},config.interval); // 重设定时器
    }) 
    var sliderBtn = document.getElementById("sliderBtn"); // 获取按钮容器的引用
    imgArr.forEach((v,i) => {
        let btn = document.createElement("div"); // 制作按钮
        btn.className = i === 0 ?  "unitBtn active" : "unitBtn"; // 初设蓝色与灰色按钮样式
        btn.addEventListener('click',(e) => {
            clearInterval(timer); // 清除定时器，避免手动切换时干扰
            if(clickAllow) slide(slideContainer,i); // // 允许点击则切换
            timer = setInterval(() => {slide(slideContainer)},config.interval); // 重设定时器
        }) 
        btnList.push(btn); // 添加按钮到按钮组
        sliderBtn.appendChild(btn); // 追加按钮到按钮容器
    })
}

// 边缘处理
function edgeDispose(slideContainer){
    var li = document.createElement("li"); // 创建<li>
    var img = document.createElement("img"); // 创建新的<img>
    img.src = imgArr[0].src; // 设置图片src
    li.appendChild(img); // 追加<img>到<li>
    slideContainer.appendChild(li); // 将第一张图片追加到轮播图的最后，作边缘处理
    var li2 = document.createElement("li"); // 创建<li>
    var img2 = document.createElement("img"); // 创建新的<img>
    img2.src = imgArr[imgArr.length-1].src; // 设置图片src
    li2.appendChild(img2); // 追加<img>到<li>
    slideContainer.insertBefore(li2,slideContainer.firstChild); // 将最后一张图片追加到轮播图的最前，作边缘处理
    slideContainer.style.left = `-${imgArr[0].width}px`; // 重设ul位置
}

// 定时器在特殊情况时的处理
function eventDispose(carousel,slideContainer,config){
    document.addEventListener('visibilitychange',function(){ // 浏览器切换页面会导致动画出现问题，监听页面切换
        if(document.visibilityState=='hidden') clearInterval(timer); 
        else timer = setInterval(() => {slide(slideContainer)},config.interval); // 重设定时器
    });
    carousel.addEventListener('mouseover',function(){ // 鼠标移动到容器则不切换动画，停止计时器
        clearInterval(timer); // 页面隐藏清除定时器
    });
    carousel.addEventListener('mouseleave',function(){ // 鼠标移出容器则开始动画
        timer = setInterval(() => {slide(slideContainer)},config.interval); // 重设定时器
    });
}


(function start() {
    var config = {
        height: "300px", // 设置展示高度
        interval: 4000 // 设置轮播时间间隔
    }
    var carousel = document.getElementById("carousel"); //获取容器对象的引用
    carousel.style.height = config.height; 
    document.querySelectorAll("#carousel img").forEach(v => imgArr.push(v)); // 获取所有图片组成数组
    var slideContainer = document.querySelector("#carousel > ul"); // 获取ul也就是一行图片的容器
    edgeDispose(slideContainer); 
    eventDispose(carousel,slideContainer,config); 
    createBtnGroup(carousel,slideContainer,config); 
    timer = setInterval(() => {slide(slideContainer)},config.interval); 
})();
