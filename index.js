let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let prev_btn = document.querySelector(".prev-track");
let next_btn = document.querySelector(".next-track");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total_duration");

let volume_up=document.querySelector(".volume-up");

let inactivity_time=0;
function timeIncrement()
{
    inactivity_time++;
    if(inactivity_time>=2)
    {
        pauseTrack();
        //alert("you are out of music player");
    }
}

setInterval(timeIncrement,60000);

document.onmousemove=function(event)
{
   inactivity_time=0;
   //alert("You are Inactive in the browser for a long time!");
};

document.onkeydown=function(event){
    inactivity_time=0;
   // alert("You are Inactive in the browser for a long time!");
};


let ismute=false;
let track_index=0;
let isplaying=false;
let update_timer;

//create an audio element

let curr_track = document.createElement("audio");

let track_list = [
      {
        name: "Natu Natu",
        artist: "Rahul Spiligunj ,  Kala Bhairava ,M.M.Keeravani ",
        image: "https://statushb.com/upload/post_thumbnail/natu_natu_poster.jpg",
        path: "./audio1.mp3",
      },
      {
        name: "Etthara Jenda",
        artist: "MM Keeravani, Ram Charan, Jr NTR, Vishal Mishra , Prudhvi Chandra",
        image: "https://alllyricszone.in/wp-content/uploads/2022/03/RRR-Ethara-Jenda-From-March-14-1646916366-1719.jpg",
        path: "./audio2.mp3",
      },
      {
        name: "Toofan",
        artist: "SriKrishna, Pridhwi Chandar ,Arun Kaundinya, Santosh Venky, Mohan Krishna",
        image: "https://pbs.twimg.com/media/FOWbkYmVUAAj4Go?format=jpg&name=900x900",
        path: "./audio3.mp3",
      },
      {
        name: "The Monster",
        artist: "RaviBasrur, AdithiSagar",
        image: "http://www.teluguone.com//teluguoneUserFiles/img/kgf-song-today.webp",
        path: "./audio5.mp3",
      },
      {
        name: "Sulthana",
        artist: "Sontosh Venky, Mohan Krishna, Arun Kaundinya, SriKrishna, Prudhvi Chandra",
        image:"https://c.saavncdn.com/556/Sulthana-From-Kgf-Chapter-2--Telugu-2022-20220413121011-500x500.jpg",
        path: "./audio4.mp3",
      }
];



function loadTrack(track_index){
    clearInterval("update_timer");
    resetValues();

    //load the track

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = `url(${track_list[track_index].image})`;
    track_name.textContent = `${track_list[track_index].name}`;
    track_artist.textContent = `${track_list[track_index].artist}`;
    now_playing.textContent = `PLAYING ${track_index+1} OF ${track_list.length}`;

    update_timer = setInterval(seekUpdate , 1000);
    curr_track.addEventListener("ended" ,nextTrack);

    randombgColor();

}

function randombgColor()
{
    let red = Math.floor(Math.random()*256)+64;
    let green = Math.floor(Math.random()*256)+64;
    let blue = Math.floor(Math.random()*256)+64;

    let new_color = `rgb(${red},${green},${blue})`;

    document.body.style.backgroundColor = new_color;


}

function resetValues(){
     current_time.textContent = "00:00";
     total_duration.textContent = "00:00";
     seek_slider.value = "0";
}


playpause_btn.addEventListener("click", ()=>{
    if(!isplaying) playTrack();
    else pauseTrack();
})

volume_up.addEventListener("click" , ()=>{
    volume_up.innerHTML = `<i class="fa fa-microphone-slash"></i>`;
    if(!ismute){
    curr_track.volume = "0";
    ismute=true;
    }
    else 
    {
        ismute=false;
        curr_track.volume = volume_slider.value/100;
        volume_up.innerHTML =`<i class="fa fa-volume-up"></i>`;
    }
})

function playTrack(){
    //play the loaded track
    curr_track.play();
    console.log("song is playing now");
    isplaying=true;

    //change the icon to play track
    playpause_btn.innerHTML = `<i class="fa fa-pause-circle fa-5x" ></i>`;
}

function pauseTrack(){
    curr_track.pause();
    isplaying = false;

    playpause_btn.innerHTML = `<i class="fa fa-play-circle fa-5x" ></i>`;

}

function nextTrack()
{
    if(track_index<track_list.length-1)
    {
        track_index++;
    }
    else track_index = 0;

    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index==0) track_index=track_list.length-1;
    else track_index--;

    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    //seeking the position in the slider
    let seekto = (seek_slider.value/100)*curr_track.duration;
    
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value/100;
}

function seekUpdate(){
    let seekPosition = 0;

    if(!isNaN(curr_track.duration)){
        seekPosition = (curr_track.currentTime/curr_track.duration)*100;
        seek_slider.value = seekPosition;

        let current_minutes = Math.floor(curr_track.currentTime/60);
        let current_seconds = Math.floor(curr_track.currentTime-60*current_minutes);
        let duration_minutes = Math.floor(curr_track.duration/60);
        let duration_seconds = Math.floor(curr_track.duration-duration_minutes*60);

        if (current_seconds < 10) { current_seconds = "0" + current_seconds; }
        if (duration_seconds < 10) { duration_seconds = "0" + duration_seconds; }
         if (current_minutes < 10) { current_minutes = "0" + current_minutes; }
        if (duration_minutes < 10) { duration_minutes = "0" + duration_minutes; }

        current_time.textContent = `${current_minutes}:${current_seconds}`;
        total_duration.textContent = `${duration_minutes}:${duration_seconds}`;
    }
    

}

seek_slider.onchange = function (){
    let seek_position=0;
    
 }

loadTrack(track_index);
playTrack();