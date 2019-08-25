import {
  buttonPlay,
  buttonNext,
  buttonPrevious,
  plst,
  audio,
  nameOfSong,
  timer,
  audioSongs,
  format,
  strela,
  btnSongTop,
  btnSongDown,
  btnSongMiddle
} from "./const.js";

let flag = false;
let angle = 0;
let currentSong = 0;
let t = 100;
let rotateCoord = 300;
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
audio.src = `src/audio/${audioSongs[currentSong]}${format}`;

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
    console.log(e + " /\t Start error");
  }
}

function setSongName() {
  try {
    let arr = audioSongs[currentSong].split("_");
    arr.length = 3;
    let strName = arr.join(" ");
    nameOfSong.innerText = strName;
  } catch (e) {
    console.log(e + "setSongName error");
  }
}

function btnText(msg) {
  try {
    buttonPlay.innerText = msg;
  } catch (e) {
    console.log(e + "/\t btnText error");
  }
}

function timeTracker(currentTime) {
  try {
    timer.innerText = currentTime.toFixed(2) + "s";
  } catch (e) {
    console.log(e + "/\t + timeTracker error");
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
    console.log(e + "/\t audioTime error");
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
    console.log(e + "/\t + animation error");
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
    audio.src = `src/audio/${audioSongs[currentSong]}${format}`;
    setSongName();
    audio.play();
  } catch (e) {
    console.log(e + "/\t + switching song error");
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
    audio.src = `src/audio/${audioSongs[currentSong]}${format}`;
    setSongName();
    audio.play();
  } catch (e) {
    console.log(e + "/\t setSong error");
  }
}

function strelaRotation() {
  try {
    if (flag) {
      if (rotateCoord <= endCoord) {
        return;
      }
      rotateCoord -= 0.2;
      strela.style.transform = `rotate(${rotateCoord}deg)`;
      setTimeout(strelaRotation, t);
    } else {
      return;
    }
  } catch (e) {
    console.log(e + "/\t strela error");
  }
}

function setStartPosOfAngle() {
  try {
    angle = 0;
  } catch (e) {
    console.log(e + "/\t setStartPosOfAngle error");
  }
}

function setStrelaStartPosition() {
  try {
    rotateCoord = 300;
  } catch (e) {
    console.log(e + "setStartPos error");
  }
}
