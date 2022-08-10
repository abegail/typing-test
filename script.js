const text = document.querySelector('#untyped');
const textArray = Array.from(text.textContent);
const typedText = document.querySelector('#typed');
const typedArray = [];

window.addEventListener('keydown', checkKey);

function checkKey(e) {
    if (e.key === 'Shift') return;

    if (e.key === textArray[0]) {
        playSound(true);
        updateDisplay(e.key);
    } else {
        playSound(false);
    }
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

    if (textArray.length === 0) {
        const message = document.querySelector('#testDone');
        message.textContent = "Done!";
        window.removeEventListener('keydown', checkKey);
    }
}