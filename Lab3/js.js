function play(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function RemoveTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

addEventListener('keydown', play);

const keysAll = document.querySelectorAll('.key');
keysAll.forEach(key => key.addEventListener('transitionend', RemoveTransition));

const start1 = document.querySelector('#start1');
const start2 = document.querySelector('#start2');
const start3 = document.querySelector('#start3');
const start4 = document.querySelector('#start4');

const starts = [start1, start2, start3, start4];
starts.forEach(start => {
    start.addEventListener('click', this.startRecording);
});

const stop1 = document.querySelector('#stop1');
const stop2 = document.querySelector('#stop2');
const stop3 = document.querySelector('#stop3');
const stop4 = document.querySelector('#stop4');

const stops = [stop1, stop2, stop3, stop4];
stops.forEach(stop => {
    stop.addEventListener('click', stopRecording);
});

const play1 = document.querySelector('#play1');
const play2 = document.querySelector('#play2');
const play3 = document.querySelector('#play3');
const play4 = document.querySelector('#play4');

const plays = [play1, play2, play3, play4];

plays.forEach(play => {
    play.addEventListener('click', playRecording);
});

let records = [];
let startTime;
let endTime;
let pressedKeys = [];
let recording = false;

function startRecording() {
    startTime = Date.now();
    recording = true;
    console.log('started recording');
}

function stopRecording() {
    endTime = Date.now();
    recording = false;
    console.log('stopped recording');
}

document.addEventListener('keydown', gathering);

function gathering(e) {
    if (recording) {
        let key = e.key;
        let keyCode = e.keyCode;
        let keyTime = Date.now();
        pressedKeys.push({key, keyCode, keyTime});
    }
}

let currentAudio;
function playRecording() {
    console.log('playing...');
    let previousKeyTime = pressedKeys[0].keyTime;
    let i = 0;
    function playNext() {
        if (i >= pressedKeys.length) return;
        let key = pressedKeys[i];
        let delay = key.keyTime - previousKeyTime;
        setTimeout(function() {
            if(currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = document.querySelector(`audio[data-key="${key.keyCode}"]`);
            if (!currentAudio) return;
            currentAudio.play();
            previousKeyTime = key.keyTime;
            i++;
            playNext();
        }, delay);
    }
    playNext();
}
