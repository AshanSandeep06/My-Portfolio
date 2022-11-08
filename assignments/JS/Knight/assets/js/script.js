let leftColors = ['white', 'white', 'white', 'white', 'white', 'white', '#d3c5c5', '#be7474', '#cd4a4a', '#b83030', '#c52525', '#dc1e1e'];
let rightColors = ['white', 'white', 'white', 'white', 'white', 'white', '#dc1e1e', '#c52525', '#b83030', '#cd4a4a', '#be7474', '#d3c5c5'];

var count = 0;
let timerId = -1;

const music = new Audio('assets/audio/Knight-Rider-Theme-Song.mp3');

function leftAnimation() {
    leftColors.unshift(leftColors.pop());

    for (let i = 0; i < leftColors.length / 2; i++) {
        $('#div-0' + (i + 1)).css('background-color', leftColors[i]);
    }
}

function rightAnimation() {
    if (count >= rightColors.length + leftColors.length) {
        count = 0;
    }
    rightColors.push(rightColors.shift());

    for (let i = 0; i < rightColors.length / 2; i++) {
        $('#div-0' + (i + 1)).css('background-color', rightColors[i]);
    }
}

function animate() {
    count++;
    if (count <= 12) {
        leftAnimation();
    } else {
        rightAnimation();
    }
}

function renderKnightRider() {
    $('#container > div').css('background-color', 'white');
    animate();
}

$('#btnStart').on('click', function () {
    clearInterval(timerId);
    timerId = setInterval(renderKnightRider, 80);
    music.play();
    music.loop = true;
});

$('#btnStop').on('click', function () {
    clearInterval(timerId);
    music.pause();
});