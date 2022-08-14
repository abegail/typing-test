const text = document.querySelector('#untyped');
const textArray = Array.from(text.textContent);
const typedText = document.querySelector('#typed');
const typedArray = [];

let correctKeyStroke = 0;
let incorrectKeyStroke = 0;

let timerStarted = false;
let time = 10000;
let countdownTimer;
let wordsTyped = 0;

const message = document.querySelector('#testDone');
const timerDisplay = document.querySelector('#timerDisplay');
timerDisplay.textContent = `Time remaining: ${new Date(time).toISOString().slice(14, 19)}`;

window.addEventListener('keydown', checkKey);

function checkKey(e) {
    if (!timerStarted) {
        printTimer();
        timer();
    }

    timerStarted = true;

    if (e.key === 'Shift') return;

    if (e.key === textArray[0]) {
        playSound(true);
        updateDisplay(e.key);
        correctKeyStroke++;
    } else {
        playSound(false);
        incorrectKeyStroke++;
    }

    if (textArray.length === 0) displayResults();
}

function playSound(matched) {
    if (matched) {
        const tink = document.querySelector('#tink');
        tink.currentTime = 0;
        tink.play();
    } else {
        const boom = document.querySelector('#boom');
        boom.currentTime = 0;
        boom.play();
    }
}

function updateDisplay(key) {
    textArray.shift();
    typedArray.push(key);
    text.textContent = textArray.join('');
    typedText.textContent = typedArray.join('');
}

function displayResults() {
    window.removeEventListener('keydown', checkKey);
    const accuracy = Math.round((correctKeyStroke / (correctKeyStroke + incorrectKeyStroke)) * 100);
    message.textContent = `Done! Accuracy: ${accuracy}%`;
    clearInterval(countdownTimer);
    calculateWPM();
}

function timer() {
    setTimeout(displayResults, time);
}

function printTimer() {
    countdownTimer = setInterval(printTimerHelper, 1000);
}

function printTimerHelper() {
    time -= 1000;
    timerDisplay.textContent = `Time remaining: ${new Date(time).toISOString().slice(14, 19)}`;
}

function calculateWPM() {
    for (i = 0; i < typedArray.length; i++) {
        if (typedArray[i] === ' ' || typedArray[i] === '.' || typedArray[i] === ',' || typedArray[i] === '?' || typedArray[i] === '!') {
            wordsTyped++
        }
        if(i === typedArray.length - 1) {
            if(textArray[0] === ' ' || textArray[0] === '.' || textArray[0] === ',' || textArray[0] === '?' || textArray[0] === '!') {
                wordsTyped++;
            }
        } 
    }
    console.log(wordsTyped);
}