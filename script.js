const text = document.querySelector('#untyped');
const typedText = document.querySelector('#typed');
const typedArray = [];
const textArray = Array.from(text.textContent);

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
}