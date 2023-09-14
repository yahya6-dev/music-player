window.onload = function() {
 let isPlaying = false
 //get reference to the player
 let player = document.getElementById("player")
 let status = document.getElementById("status")
 let playLength = document.querySelector(".timer#end")
 let playOffset = document.querySelector(".timer#start")
 let title = document.getElementById("title")
 let play = document.getElementById("play")
 let restart  = document.getElementById("restart")
 let forward = document.getElementById("forward")

 status.onclick = function(e) {
  e.preventDefault()
  let delta = player.duration / 100
  let currentValue = Number(status.value)
  let seekPosition = currentValue  * currentValue
  player.currentTime = seekPosition


 }

 forward.onclick = restart.onclick = function() {
   player.currentTime = 0
   player.play()
 } 
 //event listener to the play button
 play.onclick = (e) => {
  e.preventDefault()
  if (isPlaying) {
    player.pause()
    play.src = "play-circle.svg"
    return
  }

  player.play()
  play.src = "pause-circle.svg"
  console.log("I modified by adding listener")
 }

 let scrollerPosition = 0
 playLength.textContent = `${(player.duration / 60).toFixed(2)}`
 
 player.onplay  = function() {
  isPlaying = true
  scrollerPosition +=  player.currentTime / 100
  title.textContent = "Playing " + player.currentSrc.match(/\/[a-zA-Z0-9]+\.mp3/)[0]
  
 }

 player.onpause = function() {
  isPlaying = false 
  play.src = "play-circle.svg"
  title.textContent  = ''
 }


 let circle = function() {
  if (isPlaying) {
   let second,minute,total

   if (player.currentTime < 60) {
      second =  player.currentTime.toFixed(2)
	        .toString()
	        .slice(0,2)
      second = second.charAt(1) !== "." ? second:  second.charAt(0)
      minute = 0
      scrollerPosition += player.currentTime / 100
   }
   else {
      total = player.currentTime / 60
      minute = Math.trunc(total)
      second = Math.trunc(player.currentTime - (minute*60))
      scrollerPosition += player.currentTime / 100   
     }
   playOffset.textContent = `${minute}:${second}`
   status.setAttribute("value",scrollerPosition)
   console.log(total,second,minute,player.currentTime)
  }
 }

 setInterval(circle,1000)


}
