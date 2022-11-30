/* ---------------------------------------------- Level 02 -------------------------------------------------------- */

let [milliseconds_level_02, seconds_level_02, minutes_level_02] = [0, 0, 0];
let time_level_02 = $('#lblTime-level_02');
let intervalID_level_02 = -1;
$("#txtScore-level_02").val(0);
let movZomIntervalID_level_02 = -1;

function displayTimer_level_02() {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        milliseconds_level_02 += 10;
        if (milliseconds_level_02 === 1000) {
            milliseconds_level_02 = 0;
            seconds_level_02++;
            if (seconds_level_02 === 60) {
                seconds_level_02 = 0;
                minutes_level_02++;
            }
        }

        let m_level_02 = minutes_level_02 < 10 ? "0" + minutes_level_02 : minutes_level_02;
        let s_level_02 = seconds_level_02 < 10 ? "0" + seconds_level_02 : seconds_level_02;
        let ms_level_02 = milliseconds_level_02 < 10 ? "0" + milliseconds_level_02 : String(milliseconds_level_02).substring(0, 2);

        time_level_02.text(`${m_level_02} : ${s_level_02} : ${ms_level_02}`);
    }
}

$('#btnStartPlay-level_02').on('click', function () {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        clearInterval(intervalID_level_02);
        intervalID_level_02 = setInterval(displayTimer_level_02, 10);

        $('#btnStartPlay-level_02').fadeOut(500);
        $('.hs-level_02').fadeIn(1000);

        movZomIntervalID_level_02 = window.setInterval(moveZombies_level_02, 1000);

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 4500);
    }
});

/* --------------------------------------------------------------------------------------------------- */

/* To Move the rocket to left or right and sending bullets */
$(document).on('keydown', function (event) {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var rocketPosition_level_02 = $("#rocket-level_02").position();

        // To Move left, the Rocket
        // 37 ---> ArrowLeft
        if (event.keyCode === 37 && rocketPosition_level_02.left > 0) {
            $("#rocket-level_02").css('left', rocketPosition_level_02.left - 15 + 'px');
        }

        // To Move right, the Rocket
        // 39 ---> ArrowRight
        if (event.keyCode === 39 && rocketPosition_level_02.left < 956) {
            $("#rocket-level_02").css('left', rocketPosition_level_02.left + 15 + 'px');
        }

        // To Fire bullets from the Rocket
        // 38 ---> ArrowUp && 32 ---> Space
        if ($('#btnStartPlay-level_02').css('display') === "none") {
            if ($('.hs-level_02').css('display') !== 'none') {
                if (event.keyCode === 38 || event.keyCode === 32) {
                    if (event.keyCode === 38) {
                        fireBullets_level_02(rocketPosition_level_02);
                    } else {
                        fireBullets_level_02(rocketPosition_level_02);
                    }
                }
            }
        }
    }
});

function fireBullets_level_02(rocketPosition_level_02) {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var bullet_level_02 = $('<div>');
        bullet_level_02.css('display', 'none');
        bullet_level_02.attr('class', 'bullet');
        $("#level_2_gamePlayContainer").append(bullet_level_02);

        var moveBullet_level_02 = setInterval(function () {
            var bulletPosition_level_02 = parseInt(window.getComputedStyle($(bullet_level_02).get(0)).getPropertyValue("bottom"));

            if (bulletPosition_level_02 > 700) {
                clearInterval(moveBullet_level_02);
            }

            bullet_level_02.css('left', rocketPosition_level_02.left + 30 + "px");
            bullet_level_02.css('display', 'block');
            bullet_level_02.css('bottom', bulletPosition_level_02 + 10 + "px");

            destroyingZombies_level_02($(bullet_level_02).get(0));
        }, 8);
    }
}

$(document).on('keydown', function (event) {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        if ($('.hs-level_02').css('display') === 'block') {
            if (event.keyCode === 38 || event.keyCode === 32) {
                var shootSound_level_02 = new Audio('assets/audio/ShootSound.mp3');
                shootSound_level_02.play();
            }
        }
    }
});

function destroyingZombies_level_02(bullet_level_02) {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var displayedZombies_level_02 = $('.display-zombies-level_02');

        for (let zombie_level_02 of displayedZombies_level_02) {
            var bulletPosition_level_02 = bullet_level_02.getBoundingClientRect();
            var zombiePosition_level_02 = $(zombie_level_02).get(0).getBoundingClientRect();

            if (bulletPosition_level_02.right <= zombiePosition_level_02.right && bulletPosition_level_02.left >= zombiePosition_level_02.left &&
                bulletPosition_level_02.top >= zombiePosition_level_02.top && bulletPosition_level_02.bottom <= zombiePosition_level_02.bottom) {
                $(zombie_level_02).css('display', 'none');

                // Calculate Score
                $("#txtScore-level_02").val(parseInt($("#txtScore-level_02").val()) + 20);
            }
        }
    }
}

var count = 0;

function moveZombies_level_02() {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        var displayedZombies_level_02 = $('.display-zombies-level_02');

        for (let zombie_level_02 of displayedZombies_level_02) {
            var randomValue_level_02 = Math.floor((Math.random() * 50) + 1);

            var existTopValue_level_02 = parseInt($(zombie_level_02).css('top'));
            var newTopValue_level_02 = existTopValue_level_02 + randomValue_level_02;
            $(zombie_level_02).css('top', newTopValue_level_02 + "px");

            if ($(zombie_level_02).css('display') !== 'none') {
                if (newTopValue_level_02 > 675) {
                    // count++;
                    $('#rocket-level_02').css('display', 'none');
                    clearInterval(intervalID_level_02);
                    clearInterval(movZomIntervalID_level_02);

                    $('#gameLost_play_time-level_02').text("Time : " + $('#lblTime-level_02').text());
                    $('#gameLost_your_score-level_02').text("Your Score : " + $('#txtScore-level_02').val());

                    $('#gameLostModal-level_02').modal('show');
                    $('#gameLostModal-level_02').show();

                    // game_over.loop = true;
                    game_over.play();

                    clearInterval(audioIntervalId);
                    pauseAudios();
                }
            }

            var destroyedZombiesCount_level_02 = 0;

            if ($('.hs-level_02').css('display') === 'block') {
                for (let i = 0; i < displayedZombies_level_02.length; i++) {
                    if ($(displayedZombies_level_02[i]).css('display') === "none") {
                        destroyedZombiesCount_level_02++;
                    }
                }
            }

            if (destroyedZombiesCount_level_02 === displayedZombies_level_02.length) {
                $('#rocket-level_02').css('display', 'none');
                clearInterval(intervalID_level_02);
                clearInterval(movZomIntervalID_level_02);

                $('#play_time-level_02').text("Time : " + $('#lblTime-level_02').text());
                $('#your_score-level_02').text("Your Score : " + $('#txtScore-level_02').val());

                $('#gameWinModal-level_02').modal('show');
                $('#gameWinModal-level_02').show();

                clearInterval(audioIntervalId);
                pauseAudios();
            }
        }
    }
}

function modalNeeds_level_02() {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        clearInterval(intervalID_level_02);
        clearInterval(movZomIntervalID_level_02);
        $('.display-zombies-level_02').css('top', '0px');
        $('.display-zombies-level_02').css('display', 'none');

        $('#rocket-level_02').css({left: "auto"});

        milliseconds_level_02 = 0;
        seconds_level_02 = 0;
        minutes_level_02 = 0;

        $('#btnStartPlay-level_02').css('display', 'block');
        $('#lblTime-level_02').text("00 : 00 : 00");
        $('#txtScore-level_02').val("0");
    }
}

$('#btnPlayAgain-level_02').on('click', function () {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#gameWinModal-level_02').modal('hide');
        modalNeeds_level_02();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#gameLostBtnTryAgain-level_02').on('click', function () {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#gameLostModal-level_02').modal('hide');
        modalNeeds_level_02();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#btnNext-level_02').on('click', function () {
    if ($('#level_2_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none' && $('#level_4_section').css('display') === 'none') {
        $('#level_2_section').css('display', 'none');
        $('#level_3_section').fadeIn(1000);
        game_over.pause();

        $('#gameWinModal-level_02').modal('hide');
        $('#gameLostModal-level_02').modal('hide');

        clearInterval(intervalID_level_02);
        clearInterval(movZomIntervalID_level_02);
        $('.display-zombies-level_02').css('top', '0px');
        $('.display-zombies-level_02').css('display', 'none');

        $('#rocket-level_02').css({left: "auto"});

        milliseconds_level_02 = 0;
        seconds_level_02 = 0;
        minutes_level_02 = 0;

        $('#btnStartPlay-level_02').css('display', 'block');
        $('#lblTime-level_02').text("00 : 00 : 00");
        $('#txtScore-level_02').val("0");
    }
});