const text = document.querySelector('#untyped');
const textArray = Array.from(text.textContent);
const typedText = document.querySelector('#typed');
const typedArray = [];

let correctKeyStroke = 0;
let incorrectKeyStroke = 0;

window.addEventListener('keydown', checkKey);

function checkKey(e) {
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
    const message = document.querySelector('#testDone');
    window.removeEventListener('keydown', checkKey);
    const accuracy = Math.round((correctKeyStroke / (correctKeyStroke + incorrectKeyStroke)) * 100);
    message.textContent = `Done! Accuracy: ${accuracy}%`;
}