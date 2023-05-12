// 定义歌曲题目和位置
const songs = [
    {
        title:'Smells Like Teen Spirit',
        artist:'Nirvana',
        src:"./music/smells.mp3"
    },
    {
        title:'绿光',
        artist:'孙燕姿',
        src:"./music/7绿光.mp3"
    },
    {
        title:'Under Pressure',
        artist:'Queen & David Bowie',
        src:"./music/4under pressure.mp3"
    }
]
// 定义

let currentSongIndex = 0
const audio = document.getElementById('music').querySelector('audio')

// 绑定播放器长度（不知道为什么，这段代码加进来其他的功能就都会失效）
// const music_name = document.getElementById('music_name')
// const pn_btn = document.getElementById('pn_btn')
// pn_btn.style.width = audio.offsetWidth + 'px'
// music_name.style.width = audio.offsetWidth + 'px'



// 定义播放函数
function playSong(){
    audio.src = songs[currentSongIndex].src
    music_name.textContent = `${songs[currentSongIndex].title} - ${songs[currentSongIndex].artist}`

    audio.autoplay()
    audio.play()

}

// 下一首歌和上一首歌
document.getElementById('previous_song').addEventListener('click',function(){
    if(currentSongIndex > 0 ){
        currentSongIndex -= 1
        playSong()
    }
    else{
        currentSongIndex = 2
        playSong()
    }
})
document.getElementById('next_song').addEventListener('click',function(){
    if(currentSongIndex < 2 ){
        currentSongIndex += 1
        playSong()
    }
    else{
        currentSongIndex = 0
        playSong()
    }
})
// 播放完当前歌曲自动播放下一首歌
audio.addEventListener('ended',function(){
    if(currentSongIndex<2){
        currentSongIndex += 1
        playSong()
    }
    else{
        currentSongIndex = 0
        playSong()
    }
    
})
 const downmusic = document.getElementById('downmusic')
// document.addEventListener("click", function() {
//     document.getElementById('music').style.transform = `translateY(0%)`

//   });
// downmusic.onclick = function(){
    // document.getElementById('music').classList.add('movedown')
    // document.getElementById('music').addEventListener('transitionend', function() {
    //     document.getElementById('music').classList.remove('movedown');
    //   }, {
    //     once: true
    //   });
//     document.getElementById('music').style.transform = `translateY(100%)`
// }
let Up_or_Not = false
//播放器位置变化动画操作（上滑和下拉）
downmusic.onclick = function(){
    if(Up_or_Not){
        document.getElementById('music').style.transform = `translateY(0%)`
        Up_or_Not = false
    }
    else{
        document.getElementById('music').style.transform = `translateY(-210%)`
        Up_or_Not = true
    }
}
// 点击除去按钮以外的元素就会上滑
document.onclick = function(event){
    if(event.target !== downmusic &&event.target !== next_song && event.target !== previous_song){
        if(!Up_or_Not){
        document.getElementById('music').style.transform = `translateY(-210%)`
        Up_or_Not = true
    }
    }
    
}
// 利用本地存储实现动画控制
const local_remember = document.getElementById('local_remember')
const snow1 = document.getElementById('snow1')
const snow2 = document.getElementById('snow2')
const snow3 = document.getElementById('snow3')
// 初始化clickcount数据以及本地值
let clickcount = parseInt(localStorage.getItem('clickcount')) || 0
// local_remember.textContent = localStorage.getItem('clickcount',clickcount) ==='0'?'关闭动画':'打开动画'; 
// if(localStorage.getItem('clickcount',clickcount)==0){
//     snow1.classList.add('foreground')  
//     snow2.classList.add('middleground')
//     snow3.classList.add('background')
// }
// 打开页面的时候读取数值初始化动画效果
if (clickcount === 0) {
  snow1.classList.remove('foreground')  
  snow2.classList.remove('middleground')
  snow3.classList.remove('background')
  snow1.classList.remove('snow')  
  snow2.classList.remove('snow')
  snow3.classList.remove('snow')
  local_remember.textContent = '打开动画'
  localStorage.setItem('clickcount',clickcount)
}
else{
  snow1.classList.add('foreground')
    
  snow2.classList.add('middleground')
  snow3.classList.add('background')
  snow1.classList.add('snow')
    
  snow2.classList.add('snow')
  snow3.classList.add('snow')  
  local_remember.textContent = '关闭动画'
  localStorage.setItem('clickcount',clickcount)
}
// 开关功能设计
local_remember.onclick = function(){
    // if(clickcount == 0)clickcount ++
    // else clickcount --
    // localStorage.setItem('clickcount',clickcount)
    if(clickcount == 1){
        snow1.classList.remove('foreground')  
        snow2.classList.remove('middleground')
        snow3.classList.remove('background')
        snow1.classList.remove('snow')  
        snow2.classList.remove('snow')
        snow3.classList.remove('snow')
        local_remember.textContent = '打开动画'
        clickcount--
        localStorage.setItem('clickcount',clickcount)

    }
    else{
        snow1.classList.add('foreground')
    
        snow2.classList.add('middleground')
        snow3.classList.add('background')
        snow1.classList.add('snow')
    
        snow2.classList.add('snow')
        snow3.classList.add('snow')  
        local_remember.textContent = '关闭动画'
        clickcount++
        localStorage.setItem('clickcount',clickcount)

    } 
    // local_remember.textContent = local_remember.textContent === '关闭动画'?'打开动画':'关闭动画';

}
//临时加了一个时间显示

const date_school = +new Date(2020,8,5)
// let date_now1 = +Date()
// let date_school1 = +Date(2020,9,5)
let TimeCounter = setInterval(function(){
    const date_now = +new Date()
    let date_dif = date_now - date_school
    const SchoolTime = document.querySelector('.SchoolTime')
    let dif_day = Math.floor(date_dif/1000/60/60/24)
    let dif_hour = Math.floor(date_dif/1000/60/60 - dif_day*24)
    let dif_min = Math.floor(date_dif/1000/60 - dif_hour*60 - dif_day*24*60)
    let dif_sec = Math.floor(date_dif/1000 - dif_min*60 - dif_hour*60*60 - dif_day*24*60*60)
    SchoolTime.innerHTML = `我们已经来到燕大${dif_day}天${dif_hour}小时${dif_min}分${dif_sec}秒了`
    
},1000)


 
