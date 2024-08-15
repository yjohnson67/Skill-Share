//Sticky nav bar
const navbar = document.querySelector('.navbar')
 
window.addEventListener("scroll",()=>{
    if(window.scrollY > 0){
        navbar.classList.add('sticky')
    }else{
        navbar.classList.remove('sticky')
    }
})
//End of sticky navigation bar 

//Projects
const filterLinks = document.querySelectorAll('.filter-nav-link')
 
filterLinks.forEach((filterLink)=>{
    filterLink.addEventListener('click',(e)=>{
        e.preventDefault()
 
        document.querySelector(".filter-nav-link.active").classList.remove("active")
        filterLink.classList.add("active")
 
        const projects = document.querySelectorAll(".project")
        projects.forEach((project)=>{
            project.classList.add('hide')
 
            if(filterLink.getAttribute('data-type') === project.getAttribute('data-type') || filterLink.getAttribute('data-type') === 'all'
            ){
            project.classList.remove('hide')
            }
        })
    })
})
//End of Projects

//video
const videoContainer = document.querySelector(".video-container")
const mainVideo = document.querySelector('video')
const playPauseBtn = document.querySelector('.play-pause i')
const progressBar = document.querySelector('.progress-bar')
const skipBackward = document.querySelector('.skip-backward i')
const skipForward = document.querySelector('.skip-forward i')
const volumeBtn = document.querySelector('.volume i')
const volumeSlider = document.querySelector('.left input')
const speedBtn = document.querySelector('.playback-speed span')
const speedOptions = document.querySelector('.speed-options')
const speedOptionsItems = document.querySelectorAll('.speed-options div')
const picInPicBtn = document.querySelector('.pic-in-pic span')
const fullscreenBtn = document.querySelector('.fullscreen i')
const videoTimeline = document.querySelector('.video-timeline')
const currentVidTime = document.querySelector('.current-time')
const videoDuration = document.querySelector('.video-duration')
let timer


//Controls
const hideControls = () => {
    if(mainVideo.paused) return
    timer = setTimeout(() => {
        videoContainer.classList.remove('show-controls')
    },3000)
}

hideControls()

videoContainer.addEventListener('mousemove', () => {
    videoContainer.classList.add('show-controls')
    clearTimeout(timer)
    hideControls()
})
//End of Controls


//Progress Bar
const formatTime=(time)=>{
    let seconds = Math.floor(time % 60)
    let minutes = Math.floor(time / 60) %60
    let hours = Math.floor(time / 3600) 

    seconds = seconds < 10 ? `0${seconds}`: seconds
    minutes = minutes < 10 ? `0${minutes}`: minutes
    hours = hours < 10 ? `0${hours}`: hours

    if(hours == 0){
        return`${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
}

mainVideo.addEventListener('timeupdate',(e)=>{
    let {currentTime, duration} = e.target
    let percent = (currentTime / duration)* 100
    progressBar.style.width = `${percent}%`
    currentVidTime.innerText = formatTime(currentTime)
})
//End of Progress Bar

//Video Timeline
videoTimeline.addEventListener("click",(e)=>{
    let timelineWidth=videoTimeline.clientWidth
    mainVideo.currentTime = (e.offsetX /timelineWidth) *
    mainVideo.duration
})

mainVideo.addEventListener('loadeddata', ()=> {
    videoDuration.innerText = formatTime(mainVideo.duration)
})

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth
    progressBar.style.width =`${e.offsetX}px`
    mainVideo.currentTime = (e.offsetX /timelineWidth) *
    mainVideo.duration
    currentVidTime.innerText = formatTime(mainVideo.currentTime)
}

videoTimeline.addEventListener('mousedown', () => {
    videoTimeline.addEventListener('mousemove', draggableProgressBar)
})

videoContainer.addEventListener('mouseup', () => {
    videoTimeline.removeEventListener('mousemove', draggableProgressBar)
})

videoTimeline.addEventListener('mousemove', e=> {
    const progressTime = document.querySelector('.progress-area span')
    let offsetX = e.offsetX
    progressTime.style.left = `${offsetX}px`
    let timelineWidth = videoTimeline.clientWidth
    let progressBarTime = (e.offsetX / timelineWidth) *
    mainVideo.duration
    progressTime.innerText = formatTime(progressBarTime)
})
//End of Video Timeline


//Volume 
volumeBtn.addEventListener('click',()=> {
    if(!volumeBtn.classList.contains("fa-volume-high")){
        mainVideo.volume=0.5
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high')
    }else{
        mainVideo.volume=0.0
        volumeBtn.classList.replace('fa-volume-high','fa-volume-xmark')
    }

    volumeSlider.value = mainVideo.volume
})

volumeSlider.addEventListener('input',(e)=> {
    mainVideo.volume = e.target.value * 1
    if(mainVideo.volume === 0){
        volumeBtn.classList.replace('fa-volume-high','fa-volume-xmark') 
    }else{
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high')
    }
})
//End of Volume 


//Play Pause Button
playPauseBtn.addEventListener('click',()=>{
    if(mainVideo.paused){
        mainVideo.play()
    }else {
        mainVideo.pause()
    }
})

mainVideo.addEventListener('play',()=>{
playPauseBtn.classList.replace('fa-play', 'fa-pause')
})

mainVideo.addEventListener('pause',()=>{
    playPauseBtn.classList.replace('fa-pause', 'fa-play')
})
//End of Play Pause Button

//Skip Button
skipBackward.addEventListener("click",()=>{
    mainVideo.currentTime -= 5
})

skipForward.addEventListener('click',()=> {
    mainVideo.currentTime += 5
})
//End of Skip Button


//Speed Options
speedBtn.addEventListener('click',()=>{
    speedOptions.classList.toggle('show')
})

document.addEventListener('click',(e)=>{
    if(e.target.tagName !== 'SPAN'||e.target.className !== 'material-symbols-rounded'){
        speedOptions.classList.remove('show')  
    }
})

speedOptionsItems.forEach((option)=>{
    option.addEventListener('click',()=>{
        mainVideo.playbackRate = option.dataset.speed
        speedOptions.querySelector('.active-option').classList.remove('active-option')
        option.classList.add('active-option')
    })
})
//End of Speed Options

//Picture in Picture Mode
picInPicBtn.addEventListener('click', ()=>{
    mainVideo.requestPictureInPicture()
})
//End of Picture in Picture Mode

//Fullscreen Mode
fullscreenBtn.addEventListener('click', ()=>{
    mainVideo.requestFullscreen()
})
//End of Fullscreen Mode
//End of video
