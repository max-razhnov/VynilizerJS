import "./styles/styles.scss";
import {
  buttonPlay,
  buttonNext,
  buttonPrevious,
  audio,
  nameOfSong,
  timer,
  btnSongTop,
  btnSongDown,
  btnSongMiddle
} from "./js/const.js";

import * as img1 from "./img/1.png";
import * as img2 from "./img/3.png";
import audio1 from "./audio/Adrift.mp3";
import audio2 from "./audio/A_Great_Darkness_Approaches_Can_You_Feel_It.mp3";
import audio3 from "./audio/Apollo_The_Wicked.mp3";

const vynilImage = `<img src=${img1} class="codek" alt="" />`;
const recorderImage = `<img src=${img2} id="strela" alt="" />`;
const vynil = document.getElementsByClassName("vynil-container")[0];
vynil.insertAdjacentHTML("afterbegin", vynilImage);
vynil.insertAdjacentHTML("afterbegin", recorderImage);
const plst = document.getElementsByClassName("codek")[0];
const strela = document.getElementById("strela");

const audioSongs = [
  { id: 0, song: audio1, name: "Adrift" },
  { id: 1, song: audio2, name: "A Great Darkness" },
  { id: 2, song: audio3, name: "Apollo The Wicked" }
];

let flag = false;
let angle = 0;
let currentSong = 0;
let time = 1000;
let rotateCoord = 300;
let rotateDistance = 50;
let endCoord = 250;

btnSongTop.removeEventListener("click", setSong);
btnSongDown.removeEventListener("click", setSong);
btnSongMiddle.removeEventListener("click", setSong);
buttonNext.removeEventListener("click", switchSong);
buttonPrevious.removeEventListener("click", switchSong);
buttonPlay.removeEventListener("click", startPlay);

buttonPlay.addEventListener("click", startPlay);
buttonNext.addEventListener("click", switchSong);
buttonPrevious.addEventListener("click", switchSong);
btnSongTop.addEventListener("click", setSong);
btnSongDown.addEventListener("click", setSong);
btnSongMiddle.addEventListener("click", setSong);
audio.src = audioSongs[currentSong].song;

function startPlay() {
  try {
    flag = !flag;
    animation();
    strelaRotation();
    if (flag) {
      audio.play();
      audioTime();
      btnText("Stop");
      setSongName();
    } else {
      audio.pause();
      btnText("Start");
    }
  } catch (e) {
    errorMsg("Start error");
  }
}

function setSongName() {
  try {
    nameOfSong.innerText = audioSongs[currentSong].name;
  } catch (e) {
    errorMsg("setSongName error");
  }
}

function btnText(msg) {
  try {
    buttonPlay.innerText = msg;
  } catch (e) {
    errorMsg("btnText error");
  }
}

function timeTracker(currentTime) {
  try {
    timer.innerText = currentTime.toFixed(2) + "s";
  } catch (e) {
    errorMsg("timeTracker error");
  }
}

function audioTime() {
  try {
    audio.ontimeupdate = () => {
      if (audio.ended) {
        flag = false;
        animation();
        btnText("Start");
      } else {
        timeTracker(audio.currentTime);
      }
    };
  } catch (e) {
    errorMsg("audioTime error");
  }
}

function animation() {
  try {
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
  } catch (e) {
    errorMsg("animation error");
  }
}

function switchSong() {
  try {
    setStrelaStartPosition();
    setStartPosOfAngle();
    if (!flag) {
      flag = true;
      animation();
      strelaRotation();
    }
    btnText("Stop");
    audioTime();
    if (this.id === "next") {
      if (currentSong >= 2) {
        currentSong = 0;
      } else {
        currentSong++;
      }
    } else if (this.id === "previous") {
      if (currentSong <= 0) {
        currentSong = 2;
      } else {
        currentSong--;
      }
    }
    audio.src = audioSongs[currentSong].song;
    setSongName();
    audio.play();
  } catch (e) {
    errorMsg("switching song error");
  }
}

function setSong(event) {
  try {
    if (+event.target.id === 0) {
      currentSong = 0;
    } else if (+event.target.id === 1) {
      currentSong = 1;
    } else {
      currentSong = 2;
    }
    setStartPosOfAngle();
    setStrelaStartPosition();
    if (!flag) {
      flag = true;
      animation();
      strelaRotation();
    }
    audioTime();
    btnText("Stop");
    audio.src = audioSongs[currentSong].song;
    setSongName();
    audio.play();
  } catch (e) {
    errorMsg("setSong error");
  }
}

function angleForTime() {
  try {
    return +((rotateDistance * (time / 1000)) / audio.duration);
  } catch (e) {
    errorMsg("angleForTime error");
  }
}

function strelaRotation() {
  try {
    if (flag) {
      if (rotateCoord <= endCoord) {
        return;
      }
      rotateCoord -= angleForTime();
      strela.style.transform = `rotate(${rotateCoord}deg)`;
      setTimeout(strelaRotation, time);
    }
  } catch (e) {
    errorMsg("strela error");
  }
}

function setStartPosOfAngle() {
  try {
    angle = 0;
  } catch (e) {
    errorMsg("setStartPosOfAngle error");
  }
}

function setStrelaStartPosition() {
  try {
    rotateCoord = 300;
  } catch (e) {
    errorMsg("setStartPos error");
  }
}

function errorMsg(msg) {
  throw new Error(msg);
}
