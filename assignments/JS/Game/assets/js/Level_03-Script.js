/* ---------------------------------------------- Level 03 -------------------------------------------------------- */

let [milliseconds_level_03, seconds_level_03, minutes_level_03] = [0, 0, 0];
let time_level_03 = $('#lblTime-level_03');
let intervalID_level_03 = -1;
$("#txtScore-level_03").val(0);
let movZomIntervalID_level_03 = -1;

function displayTimer_level_03() {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        milliseconds_level_03 += 10;
        if (milliseconds_level_03 === 1000) {
            milliseconds_level_03 = 0;
            seconds_level_03++;
            if (seconds_level_03 === 60) {
                seconds_level_03 = 0;
                minutes_level_03++;
            }
        }

        let m_level_03 = minutes_level_03 < 10 ? "0" + minutes_level_03 : minutes_level_03;
        let s_level_03 = seconds_level_03 < 10 ? "0" + seconds_level_03 : seconds_level_03;
        let ms_level_03 = milliseconds_level_03 < 10 ? "0" + milliseconds_level_03 : String(milliseconds_level_03).substring(0, 2);

        time_level_03.text(`${m_level_03} : ${s_level_03} : ${ms_level_03}`);
    }
}

$('#btnStartPlay-level_03').on('click', function () {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        clearInterval(intervalID_level_03);
        intervalID_level_03 = setInterval(displayTimer_level_03, 10);

        $('#btnStartPlay-level_03').fadeOut(500);
        $('.hs-level_03').fadeIn(1000);

        movZomIntervalID_level_03 = window.setInterval(moveZombies_level_03, 700);

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 4500);
    }
});

/* --------------------------------------------------------------------------------------------------- */

/* To Move the rocket to left or right and sending bullets */
$(document).on('keydown', function (event) {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var rocketPosition_level_03 = $("#rocket-level_03").position();

        // To Move left, the Rocket
        // 37 ---> ArrowLeft
        if (event.keyCode === 37 && rocketPosition_level_03.left > 0) {
            $("#rocket-level_03").css('left', rocketPosition_level_03.left - 15 + 'px');
        }

        // To Move right, the Rocket
        // 39 ---> ArrowRight
        if (event.keyCode === 39 && rocketPosition_level_03.left < 1051) {
            $("#rocket-level_03").css('left', rocketPosition_level_03.left + 15 + 'px');
        }

        // To Fire bullets from the Rocket
        // 38 ---> ArrowUp && 32 ---> Space
        if ($('#btnStartPlay-level_03').css('display') === "none") {
            if ($('.hs-level_03').css('display') !== 'none') {
                if (event.keyCode === 38 || event.keyCode === 32) {
                    if (event.keyCode === 38) {
                        fireBullets_level_03(rocketPosition_level_03);
                    } else {
                        fireBullets_level_03(rocketPosition_level_03);
                    }
                }
            }
        }
    }
});

function fireBullets_level_03(rocketPosition_level_03) {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var bullet_level_03 = $('<div>');
        bullet_level_03.css('display', 'none');
        bullet_level_03.attr('class', 'bullet');
        $("#level_3_gamePlayContainer").append(bullet_level_03);

        var moveBullet_level_03 = setInterval(function () {
            var bulletPosition_level_03 = parseInt(window.getComputedStyle($(bullet_level_03).get(0)).getPropertyValue("bottom"));

            if (bulletPosition_level_03 > 700) {
                clearInterval(moveBullet_level_03);
            }

            bullet_level_03.css('left', rocketPosition_level_03.left + 30 + "px");
            bullet_level_03.css('display', 'block');
            bullet_level_03.css('bottom', bulletPosition_level_03 + 10 + "px");

            destroyingZombies_level_03($(bullet_level_03).get(0));
        }, 8);
    }
}

$(document).on('keydown', function (event) {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        if ($('.hs-level_03').css('display') === 'block') {
            if (event.keyCode === 38 || event.keyCode === 32) {
                var shootSound_level_03 = new Audio('assets/audio/ShootSound.mp3');
                shootSound_level_03.play();
            }
        }
    }
});

function destroyingZombies_level_03(bullet_level_03) {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var displayedZombies_level_03 = $('.display-zombies-level_03');

        for (let zombie_level_03 of displayedZombies_level_03) {
            var bulletPosition_level_03 = bullet_level_03.getBoundingClientRect();
            var zombiePosition_level_03 = $(zombie_level_03).get(0).getBoundingClientRect();

            if (bulletPosition_level_03.right <= zombiePosition_level_03.right && bulletPosition_level_03.left >= zombiePosition_level_03.left &&
                bulletPosition_level_03.top >= zombiePosition_level_03.top && bulletPosition_level_03.bottom <= zombiePosition_level_03.bottom) {
                $(zombie_level_03).css('display', 'none');

                // Calculate Score
                $("#txtScore-level_03").val(parseInt($("#txtScore-level_03").val()) + 20);
            }
        }
    }
}

var count = 0;

function moveZombies_level_03() {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var displayedZombies_level_03 = $('.display-zombies-level_03');

        for (let zombie_level_03 of displayedZombies_level_03) {
            var randomValue_level_03 = Math.floor((Math.random() * 50) + 1);

            var existTopValue_level_03 = parseInt($(zombie_level_03).css('top'));
            var newTopValue_level_03 = existTopValue_level_03 + randomValue_level_03;
            $(zombie_level_03).css('top', newTopValue_level_03 + "px");

            if ($(zombie_level_03).css('display') !== 'none') {
                if (newTopValue_level_03 > 675) {
                    // count++;
                    $('#rocket-level_03').css('display', 'none');
                    clearInterval(intervalID_level_03);
                    clearInterval(movZomIntervalID_level_03);

                    $('#gameLost_play_time-level_03').text("Time : " + $('#lblTime-level_03').text());
                    $('#gameLost_your_score-level_03').text("Your Score : " + $('#txtScore-level_03').val());

                    $('#gameLostModal-level_03').modal('show');
                    $('#gameLostModal-level_03').show();

                    // game_over.loop = true;
                    game_over.play();

                    clearInterval(audioIntervalId);
                    pauseAudios();
                }
            }

            var destroyedZombiesCount_level_03 = 0;

            if ($('.hs-level_03').css('display') === 'block') {
                for (let i = 0; i < displayedZombies_level_03.length; i++) {
                    if ($(displayedZombies_level_03[i]).css('display') === "none") {
                        destroyedZombiesCount_level_03++;
                    }
                }
            }

            if (destroyedZombiesCount_level_03 === displayedZombies_level_03.length) {
                $('#rocket-level_03').css('display', 'none');
                clearInterval(intervalID_level_03);
                clearInterval(movZomIntervalID_level_03);

                $('#play_time-level_03').text("Time : " + $('#lblTime-level_03').text());
                $('#your_score-level_03').text("Your Score : " + $('#txtScore-level_03').val());

                $('#gameWinModal-level_03').modal('show');
                $('#gameWinModal-level_03').show();

                clearInterval(audioIntervalId);
                pauseAudios();
            }
        }
    }
}

function modalNeeds_level_03() {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        clearInterval(intervalID_level_03);
        clearInterval(movZomIntervalID_level_03);
        $('.display-zombies-level_03').css('top', 'revert-layer');
        $('.display-zombies-level_03').css('display', 'none');

        $('#rocket-level_03').css({left: "auto"});

        milliseconds_level_03 = 0;
        seconds_level_03 = 0;
        minutes_level_03 = 0;

        $('#btnStartPlay-level_03').css('display', 'block');
        $('#lblTime-level_03').text("00 : 00 : 00");
        $('#txtScore-level_03').val("0");
    }
}

$('#btnPlayAgain-level_03').on('click', function () {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#gameWinModal-level_03').modal('hide');
        modalNeeds_level_03();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#gameLostBtnTryAgain-level_03').on('click', function () {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#gameLostModal-level_03').modal('hide');
        modalNeeds_level_03();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#btnNext-level_03').on('click', function () {
    if ($('#level_3_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#level_3_section').css('display', 'none');
        $('#level_4_section').fadeIn(1000);
        game_over.pause();

        $('#gameWinModal-level_03').modal('hide');
        $('#gameLostModal-level_03').modal('hide');

        clearInterval(intervalID_level_03);
        clearInterval(movZomIntervalID_level_03);
        $('.display-zombies-level_03').css('top', 'revert-layer');
        $('.display-zombies-level_03').css('display', 'none');

        $('#rocket-level_03').css({left: "auto"});

        milliseconds_level_03 = 0;
        seconds_level_03 = 0;
        minutes_level_03 = 0;

        $('#btnStartPlay-level_03').css('display', 'block');
        $('#lblTime-level_03').text("00 : 00 : 00");
        $('#txtScore-level_03').val("0");
    }
});