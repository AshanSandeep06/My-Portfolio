/* ---------------------------------------------- Level 01 -------------------------------------------------------- */

let [milliseconds, seconds, minutes] = [0, 0, 0];
let time = $('#lblTime');
let intervalID = -1;
$("#txtScore").val(0);
let movZomIntervalID = -1;
let audioIntervalId = -1;

const laugh = new Audio('assets/audio/laugh.mp3');
const game_over = new Audio('assets/audio/GameOverSound.mp3');

const audioArray = [];
audioArray.push(new Audio('assets/audio/laugh.mp3'));
audioArray.push(new Audio('assets/audio/Sound-01.mp3'));
audioArray.push(new Audio('assets/audio/Sound-03.wav'));
audioArray.push(new Audio('assets/audio/Sound-05.wav'));
audioArray.push(new Audio('assets/audio/Sound-06.mp3'));
audioArray.push(new Audio('assets/audio/Sound-07.mp3'));

var index = 0;

function playAudios() {
    audioArray[index].pause();
    index = Math.floor(Math.random() * 6);
    audioArray[index].play();
}

function pauseAudios() {
    for (let audio of audioArray) {
        audio.pause();
    }
}

$(function () {
    $('#level_1_section').css('display', 'none');
    $('#level_2_section').css('display', 'none');
    $('#level_3_section').css('display', 'none');
    $('#level_4_section').css('display', 'none');

    $('.hs, .bullet').css('display', 'none');
    $('.hs-level_02, .bullet').css('display', 'none');
    $('.hs-level_03, .bullet').css('display', 'none');
    $('.hs-level_04, .bullet').css('display', 'none');

    $('#btnStartPlay').css('display', 'block');
    $('#btnStartPlay-level_02').css('display', 'block');
    $('#btnStartPlay-level_03').css('display', 'block');
    $('#btnStartPlay-level_04').css('display', 'block');

    /* For GameWin modal (This modal is not closed when click outside of this modal) */
    $('#gameWinModal').modal({backdrop: 'static', keyboard: false});
    $('#gameWinModal-level_02').modal({backdrop: 'static', keyboard: false});
    $('#gameWinModal-level_03').modal({backdrop: 'static', keyboard: false});
    $('#gameWinModal-level_04').modal({backdrop: 'static', keyboard: false});

    $('#gameLostModal').modal({backdrop: 'static', keyboard: false});
    $('#gameLostModal-level_02').modal({backdrop: 'static', keyboard: false});
    $('#gameLostModal-level_03').modal({backdrop: 'static', keyboard: false});
    $('#gameLostModal-level_04').modal({backdrop: 'static', keyboard: false});
});

$('#btnPlay').on('click', function () {
    $('#homePageSection').css('display', 'none');
    $('.bullet').css('display', 'block');
    $('#level_1_section').fadeIn(1000);
});

function displayTimer() {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
        }

        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        let ms = milliseconds < 10 ? "0" + milliseconds : String(milliseconds).substring(0, 2);

        time.text(`${m} : ${s} : ${ms}`);
    }
}

$('#btnStartPlay').on('click', function () {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        clearInterval(intervalID);
        intervalID = setInterval(displayTimer, 10);

        $('#btnStartPlay').fadeOut(500);
        $('.hs').fadeIn(1000);

        movZomIntervalID = window.setInterval(moveZombies, 950);

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 4500);
    }
});

/* --------------------------------------------------------------------------------------------------- */

/* To Move the rocket to left or right and sending bullets */
$(document).on('keydown', function (event) {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var rocketPosition = $("#rocket").position();

        // To Move left, the Rocket
        // 37 ---> ArrowLeft
        if (event.keyCode === 37 && rocketPosition.left > 0) {
            $("#rocket").css('left', rocketPosition.left - 15 + 'px');
        }

        // To Move right, the Rocket
        // 39 ---> ArrowRight
        if (event.keyCode === 39 && rocketPosition.left < 926) {
            $("#rocket").css('left', rocketPosition.left + 15 + 'px');
        }

        // To Fire bullets from the Rocket
        // 38 ---> ArrowUp && 32 ---> Space
        if ($('#btnStartPlay').css('display') === "none") {
            if ($('.hs').css('display') !== 'none') {
                if (event.keyCode === 38 || event.keyCode === 32) {
                    if (event.keyCode === 38) {
                        fireBullets(rocketPosition);
                    } else {
                        fireBullets(rocketPosition);
                    }
                }
            }
        }

    }
});

function fireBullets(rocketPosition) {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var bullet = $('<div>');
        bullet.css('display', 'none');
        bullet.attr('class', 'bullet');
        $("#level_1_gamePlayContainer").append(bullet);

        var moveBullet = setInterval(function () {
            var bulletPosition = parseInt(window.getComputedStyle($(bullet).get(0)).getPropertyValue("bottom"));

            if (bulletPosition > 700) {
                clearInterval(moveBullet);
            }

            bullet.css('left', rocketPosition.left + 30 + "px");
            bullet.css('display', 'block');
            bullet.css('bottom', bulletPosition + 10 + "px");

            destroyingZombies($(bullet).get(0));
        }, 8);
    }
}

$(document).on('keydown', function (event) {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        if ($('.hs').css('display') === 'block') {
            if (event.keyCode === 38 || event.keyCode === 32) {
                var shootSound = new Audio('assets/audio/ShootSound.mp3');
                shootSound.play();
            }
        }
    }
});

// run the currently selected effect
/*function runEffect(object) {
    console.log($(object))
    var options = {};
    var selectedEffect = 'explode';
    // Run the effect
    $(object).hide( selectedEffect, options, 1000, this.callback);
    this.callback = function() {
        setTimeout(function() {
            $(object).removeAttr( "style" ).hide();
        }, 1000 );
    }
}*/

function destroyingZombies(bullet) {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var displayedZombies = $('.display-zombies');

        for (let zombie of displayedZombies) {
            var bulletPosition = bullet.getBoundingClientRect();
            var zombiePosition = $(zombie).get(0).getBoundingClientRect();

            if (bulletPosition.right <= zombiePosition.right && bulletPosition.left >= zombiePosition.left &&
                bulletPosition.top >= zombiePosition.top && bulletPosition.bottom <= zombiePosition.bottom) {
                $(zombie).css('display', 'none');

                // Calculate Score
                $("#txtScore").val(parseInt($("#txtScore").val()) + 20);
            }
        }
    }
}

var count = 0;

function moveZombies() {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var displayedZombies = $('.display-zombies');

        for (let zombie of displayedZombies) {
            var randomValue = Math.floor((Math.random() * 50) + 1);

            var existTopValue = parseInt($(zombie).css('top'));
            var newTopValue = existTopValue + randomValue;
            $(zombie).css('top', newTopValue + "px");

            if ($(zombie).css('display') !== 'none') {
                if (newTopValue > 675) {
                    // count++;
                    $('#rocket').css('display', 'none');
                    clearInterval(intervalID);
                    clearInterval(movZomIntervalID);

                    $('#gameLost_play_time').text("Time : " + $('#lblTime').text());
                    $('#gameLost_your_score').text("Your Score : " + $('#txtScore').val());

                    $('#gameLostModal').modal('show');
                    $('#gameLostModal').show();

                    // game_over.loop = true;
                    game_over.play();

                    clearInterval(audioIntervalId);
                    pauseAudios();
                }
            }

            var destroyedZombiesCount = 0;

            if ($('.hs').css('display') === 'block') {
                for (let i = 0; i < displayedZombies.length; i++) {
                    if ($(displayedZombies[i]).css('display') === "none") {
                        destroyedZombiesCount++;
                    }
                }
            }

            if (destroyedZombiesCount === displayedZombies.length) {
                $('#rocket').css('display', 'none');
                clearInterval(intervalID);
                clearInterval(movZomIntervalID);

                $('#play_time').text("Time : " + $('#lblTime').text());
                $('#your_score').text("Your Score : " + $('#txtScore').val());

                $('#gameWinModal').modal('show');
                $('#gameWinModal').show();

                clearInterval(audioIntervalId);
                pauseAudios();
            }
        }
    }
}

function modalNeeds() {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        clearInterval(intervalID);
        clearInterval(movZomIntervalID);
        $('.display-zombies').css('top', '0px');
        $('.display-zombies').css('display', 'none');

        $('#rocket').css({left: "auto"});

        milliseconds = 0;
        seconds = 0;
        minutes = 0;

        $('#btnStartPlay').css('display', 'block');
        $('#lblTime').text("00 : 00 : 00");
        $('#txtScore').val("0");
    }
}

$('#btnPlayAgain').on('click', function () {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#gameWinModal').modal('hide');
        modalNeeds();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#gameLostBtnTryAgain').on('click', function () {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#gameLostModal').modal('hide');
        modalNeeds();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#btnNext').on('click', function () {
    if ($('#level_1_section').css('display') !== 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#level_1_section').css('display', 'none');
        $('#level_2_section').fadeIn(1000);
        game_over.pause();

        $('#gameWinModal').modal('hide');
        $('#gameLostModal').modal('hide');

        clearInterval(intervalID);
        clearInterval(movZomIntervalID);
        $('.display-zombies').css('top', '0px');
        $('.display-zombies').css('display', 'none');

        $('#rocket').css({left: "auto"});

        milliseconds = 0;
        seconds = 0;
        minutes = 0;

        $('#btnStartPlay').css('display', 'block');
        $('#lblTime').text("00 : 00 : 00");
        $('#txtScore').val("0");
    }
});