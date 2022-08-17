const text = document.querySelector('#untyped');
const textArray = Array.from(text.textContent);
const typedText = document.querySelector('#typed');
const typedArray = [];

let correctKeyStroke = 0;
let incorrectKeyStroke = 0;

let timerStarted = false;
let setTime = 60000;
let time = setTime;
let countdownTimer;
let timeOut;
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
        console.log(`Correct key: ${e.key}`);
    } else {
        playSound(false);
        incorrectKeyStroke++;
        console.log(`Incorrect key: ${e.key}`);
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
    message.textContent = `Accuracy: ${accuracy}%    Speed: ${calculateWPM()} WPM`;
    timerDisplay.textContent = 'Time\'s up!';
    clearInterval(countdownTimer);
    clearTimeout(timeOut);
}

function timer() {
    timeOut = setTimeout(displayResults, time);
}

function printTimer() {
    countdownTimer = setInterval(printTimerHelper, 1000);
}

function printTimerHelper() {
    time -= 1000;
    timerDisplay.textContent = `Time remaining: ${new Date(time).toISOString().slice(14, 19)}`;
}

function calculateWPM() {
    let punctuation;
    for (i = 0; i < typedArray.length; i++) {
        console.log(`Current char is ${typedArray[i]}`);
        if (typedArray[i] === ' ') {
            wordsTyped++
            punctuation = false;
            console.log(`Went inside if and incremented`);
        } else if (typedArray[i] === '.' || typedArray[i] === ',' || typedArray[i] === '?' || typedArray[i] === '!') {
            wordsTyped++;
            i++;
            punctuation = true;
            console.log(`Went inside else if and incremented`);
        }
        if(i >= typedArray.length - 1 && punctuation === false) {
            if(textArray[0] === ' ' || textArray[0] === '.' || textArray[0] === ',' || textArray[0] === '?' || textArray[0] === '!') {
                wordsTyped++;
                console.log(`Went inside else and incremented`);
            }
        } 
    }
    console.log(`Words typed: ${wordsTyped}`);

    let timeItTook = setTime - time;
    let wpm = Math.round((wordsTyped / timeItTook) * 60000);

    console.log(`WPM2: ${wpm}`);
    return wpm;
}