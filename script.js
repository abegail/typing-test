const text = document.querySelector('#untyped');
const typedText = document.querySelector('#typed');
const typedArray = [];
const textArray = Array.from(text.textContent);
console.log(textArray);

window.addEventListener('keydown', checkKey);

function checkKey(e) {
    if (e.key === 'Shift') return;

    if (e.key === textArray[0]) {
        console.log('match!');
        textArray.shift();
        typedArray.push(e.key);
        const tink = document.querySelector('#tink');
        tink.currentTime = 0;
        tink.play();

        text.textContent = textArray.join('');
        typedText.textContent = typedArray.join('');
    } else {
        console.log('not a match.')
        const boom = document.querySelector('#boom');
        boom.currentTime = 0;
        boom.play();
    }
    console.log(textArray);
    console.log(typedArray);
}