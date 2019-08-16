const buttonPlay = document.getElementsByClassName("btn")[1];
const buttonNext = document.getElementById("next");
const buttonPrevious = document.getElementById("previous");
const plst = document.getElementsByClassName("codek")[0];
const audio = document.getElementById("audio");
const nameOfSong = document.getElementById("song-name");
const timer = document.getElementById("info");
const audioSongs = [
  "Adrift",
  "A_Great_Darkness_Approaches_Can_You_Feel_It",
  "Apollo_The_Wicked"
];
const format = ".mp3";
const btnSongList = document.getElementsByClassName("songList")[0];

let flag = false;
let angle = 0;
let currentSong = 0;
btnSongList.addEventListener("click", setSong);
audio.src = `src/audio/${audioSongs[currentSong]}${format}`;

buttonNext.removeEventListener("click", nextSong);
buttonPrevious.removeEventListener("click", previousSong);
buttonPlay.removeEventListener("click", startPlay); // for memory leaking
buttonPlay.addEventListener("click", startPlay);
buttonNext.addEventListener("click", nextSong);
buttonPrevious.addEventListener("click", previousSong);

function startPlay() {
  flagChanger();
  animation();
  if (flag) {
    audio.play();
    audio.ontimeupdate = () => {
      CurrTime();
    };
    btnText("Stop");
    let arr = audioSongs[currentSong].split("_");
    arr.length = 3;
    let strName = arr.join(" ");
    nameOfSong.innerText = strName;
  } else {
    audio.pause();
    btnText("Start");
  }
}

function btnText(msg) {
  buttonPlay.innerText = msg;
}

function CurrTime() {
  if (audio.ended) {
    flagChanger();
    animation();
    btnText("Start");
  } else {
    timeTracker(audio.currentTime);
  }
}

function timeTracker(currentTime) {
  timer.innerText = currentTime.toFixed(2) + "s";
}

function animation() {
  if (flag) {
    if (angle >= 360) {
      angle = 0;
    }
    angle++;
    plst.style.transform = `rotate(${angle}deg)`;
    nameOfSong.style.transformOrigin = "left center";
    nameOfSong.style.transform = `rotate(${angle}deg)`;
    setTimeout(animation, 20);
  }
}

function flagChanger() {
  flag = !flag;
}
function previousSong() {
  audio.pause();
  flagChanger();
  if (buttonPlay.innerText == "Stop") {
    animation();
  }
  btnText("Start");
  if (currentSong <= 0) {
    currentSong = 2;
  } else {
    currentSong--;
  }
  audio.src = `src/audio/${audioSongs[currentSong]}${format}`;
}

function nextSong() {
  audio.pause();
  flagChanger();
  if (buttonPlay.innerText == "Start") {
    animation();
  }
  btnText("Start");
  if (currentSong >= 2) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  audio.src = `src/audio/${audioSongs[currentSong]}${format}`;
}

function setSong(event) {
  if (+event.target.id === 0) {
    currentSong = 0;
  } else if (+event.target.id === 1) {
    currentSong = 1;
  } else {
    currentSong = 2;
  }
  if (buttonPlay.innerText == "Stop") {
    animation();
  }
  flagChanger();
  audio.pause();
  btnText("Start");
  audio.src = `src/audio/${audioSongs[currentSong]}${format}`;
}
