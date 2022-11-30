/* ---------------------------------------------- Level 04 -------------------------------------------------------- */

let [milliseconds_level_04, seconds_level_04, minutes_level_04] = [0, 0, 0];
let time_level_04 = $('#lblTime-level_04');
let intervalID_level_04 = -1;
$("#txtScore-level_04").val(0);
let movZomIntervalID_level_04 = -1;

function displayTimer_level_04() {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        milliseconds_level_04 += 10;
        if (milliseconds_level_04 === 1000) {
            milliseconds_level_04 = 0;
            seconds_level_04++;
            if (seconds_level_04 === 60) {
                seconds_level_04 = 0;
                minutes_level_04++;
            }
        }

        let m_level_04 = minutes_level_04 < 10 ? "0" + minutes_level_04 : minutes_level_04;
        let s_level_04 = seconds_level_04 < 10 ? "0" + seconds_level_04 : seconds_level_04;
        let ms_level_04 = milliseconds_level_04 < 10 ? "0" + milliseconds_level_04 : String(milliseconds_level_04).substring(0, 2);

        time_level_04.text(`${m_level_04} : ${s_level_04} : ${ms_level_04}`);
    }
}

$('#btnStartPlay-level_04').on('click', function () {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        clearInterval(intervalID_level_04);
        intervalID_level_04 = setInterval(displayTimer_level_04, 10);

        $('#btnStartPlay-level_04').fadeOut(500);
        $('.hs-level_04').fadeIn(1000);

        movZomIntervalID_level_04 = window.setInterval(moveZombies_level_04, 600);

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 4500);
    }
});

/* --------------------------------------------------------------------------------------------------- */

/* To Move the rocket to left or right and sending bullets */
$(document).on('keydown', function (event) {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        var rocketPosition_level_04 = $("#rocket-level_04").position();

        // To Move left, the Rocket
        // 37 ---> ArrowLeft
        if (event.keyCode === 37 && rocketPosition_level_04.left > 179) {
            $("#rocket-level_04").css('left', rocketPosition_level_04.left - 15 + 'px');
        }

        // To Move right, the Rocket
        // 39 ---> ArrowRight
        if (event.keyCode === 39 && rocketPosition_level_04.left < 1230) {
            $("#rocket-level_04").css('left', rocketPosition_level_04.left + 15 + 'px');
        }

        // To Fire bullets from the Rocket
        // 38 ---> ArrowUp && 32 ---> Space
        if ($('#btnStartPlay-level_04').css('display') === "none") {
            if ($('.hs-level_04').css('display') !== 'none') {
                if (event.keyCode === 38 || event.keyCode === 32) {
                    if (event.keyCode === 38) {
                        fireBullets_level_04(rocketPosition_level_04);
                    } else {
                        fireBullets_level_04(rocketPosition_level_04);
                    }
                }
            }
        }
    }
});

function fireBullets_level_04(rocketPosition_level_04) {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        var bullet_level_04 = $('<div>');
        bullet_level_04.css('display', 'none');
        bullet_level_04.attr('class', 'bullet');
        $("#level_4_gamePlayContainer").append(bullet_level_04);

        var moveBullet_level_04 = setInterval(function () {
            var bulletPosition_level_04 = parseInt(window.getComputedStyle($(bullet_level_04).get(0)).getPropertyValue("bottom"));

            if (bulletPosition_level_04 > 730) {
                clearInterval(moveBullet_level_04);
            }

            bullet_level_04.css('left', rocketPosition_level_04.left + 30 + "px");
            bullet_level_04.css('display', 'block');
            bullet_level_04.css('bottom', bulletPosition_level_04 + 10 + "px");

            destroyingZombies_level_04($(bullet_level_04).get(0));
        }, 8);
    }
}

$(document).on('keydown', function (event) {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        if ($('.hs-level_04').css('display') === 'block') {
            if (event.keyCode === 38 || event.keyCode === 32) {
                var shootSound_level_04 = new Audio('assets/audio/ShootSound.mp3');
                shootSound_level_04.play();
            }
        }
    }
});

function destroyingZombies_level_04(bullet_level_04) {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        var displayedZombies_level_04 = $('.display-zombies-level_04');

        for (let zombie_level_04 of displayedZombies_level_04) {
            var bulletPosition_level_04 = bullet_level_04.getBoundingClientRect();
            var zombiePosition_level_04 = $(zombie_level_04).get(0).getBoundingClientRect();

            if (bulletPosition_level_04.right <= zombiePosition_level_04.right && bulletPosition_level_04.left >= zombiePosition_level_04.left &&
                bulletPosition_level_04.top >= zombiePosition_level_04.top && bulletPosition_level_04.bottom <= zombiePosition_level_04.bottom) {
                $(zombie_level_04).css('display', 'none');

                // Calculate Score
                $("#txtScore-level_04").val(parseInt($("#txtScore-level_04").val()) + 20);
            }
        }
    }
}

var count = 0;

function moveZombies_level_04() {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        var displayedZombies_level_04 = $('.display-zombies-level_04');

        for (let zombie_level_04 of displayedZombies_level_04) {
            var randomValue_level_04 = Math.floor((Math.random() * 50) + 1);

            var existTopValue_level_04 = parseInt($(zombie_level_04).css('top'));
            var newTopValue_level_04 = existTopValue_level_04 + randomValue_level_04;
            $(zombie_level_04).css('top', newTopValue_level_04 + "px");

            if ($(zombie_level_04).css('display') !== 'none') {
                if (newTopValue_level_04 > 675) {
                    // count++;
                    $('#rocket-level_04').css('display', 'none');
                    clearInterval(intervalID_level_04);
                    clearInterval(movZomIntervalID_level_04);

                    $('#gameLost_play_time-level_04').text("Time : " + $('#lblTime-level_04').text());
                    $('#gameLost_your_score-level_04').text("Your Score : " + $('#txtScore-level_04').val());

                    $('#gameLostModal-level_04').modal('show');
                    $('#gameLostModal-level_04').show();

                    // game_over.loop = true;
                    game_over.play();

                    clearInterval(audioIntervalId);
                    pauseAudios();
                }
            }

            var destroyedZombiesCount_level_04 = 0;

            if ($('.hs-level_04').css('display') === 'block') {
                for (let i = 0; i < displayedZombies_level_04.length; i++) {
                    if ($(displayedZombies_level_04[i]).css('display') === "none") {
                        destroyedZombiesCount_level_04++;
                    }
                }
            }

            if (destroyedZombiesCount_level_04 === displayedZombies_level_04.length) {
                $('#rocket-level_04').css('display', 'none');
                clearInterval(intervalID_level_04);
                clearInterval(movZomIntervalID_level_04);

                $('#play_time-level_04').text("Time : " + $('#lblTime-level_04').text());
                $('#your_score-level_04').text("Your Score : " + $('#txtScore-level_04').val());

                $('#gameWinModal-level_04').modal('show');
                $('#gameWinModal-level_04').show();

                clearInterval(audioIntervalId);
                pauseAudios();
            }
        }
    }
}

function modalNeeds_level_04() {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        clearInterval(intervalID_level_04);
        clearInterval(movZomIntervalID_level_04);
        $('.display-zombies-level_04').css('top', 'revert-layer');
        $('.display-zombies-level_04').css('display', 'none');

        $('#rocket-level_04').css({left: "auto"});

        milliseconds_level_04 = 0;
        seconds_level_04 = 0;
        minutes_level_04 = 0;

        $('#btnStartPlay-level_04').css('display', 'block');
        $('#lblTime-level_04').text("00 : 00 : 00");
        $('#txtScore-level_04').val("0");
    }
}

$('#btnPlayAgain-level_04').on('click', function () {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        $('#gameWinModal-level_04').modal('hide');
        modalNeeds_level_04();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#gameLostBtnTryAgain-level_04').on('click', function () {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        $('#gameLostModal-level_04').modal('hide');
        modalNeeds_level_04();
        game_over.pause();

        clearInterval(audioIntervalId);
        pauseAudios();
        audioIntervalId = setInterval(playAudios, 3000);
    }
});

$('#btnNext-level_04').on('click', function () {
    if ($('#level_4_section').css('display') !== 'none' && $('#level_1_section').css('display') === 'none' && $('#level_2_section').css('display') === 'none' && $('#level_3_section').css('display') === 'none') {
        $('#level_4_section').css('display', 'none');
        $('#homePageSection').fadeIn(1000);
        game_over.pause();

        $('#gameWinModal-level_04').modal('hide');
        $('#gameLostModal-level_04').modal('hide');

        clearInterval(intervalID_level_04);
        clearInterval(movZomIntervalID_level_04);
        $('.display-zombies-level_04').css('top', 'revert-layer');
        $('.display-zombies-level_04').css('display', 'none');

        $('#rocket-level_04').css({left: "auto"});

        milliseconds_level_04 = 0;
        seconds_level_04 = 0;
        minutes_level_04 = 0;

        $('#btnStartPlay-level_04').css('display', 'block');
        $('#lblTime-level_04').text("00 : 00 : 00");
        $('#txtScore-level_04').val("0");
    }
});