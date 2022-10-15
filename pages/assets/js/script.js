/* ----------------------- js file for Projects and Assignments Page ----------------------- */

$(window).on('load', function () {
    $('#loader,#extra-div').fadeOut(1000);
    $('body').children(':not(#loader,#extra-div)').fadeIn(3000);
});

$(document).ready(function (){
    $('body').children(':not(#loader,#extra-div)').css('display','none');
});

/* ------------------------ Projects Page -------------------- */
$('#btnProject1').on('click', function () {
    $("#btnProject1>a").attr("target", "_blank");
    $("#btnProject1>a").attr("href", "https://github.com/AshanSandeep06/Restaurant_Management-POS_System");
});

$('#btnProject2').on('click', function () {
    $("#btnProject2>a").attr("target", "_blank");
    $("#btnProject2>a").attr("href", "https://github.com/AshanSandeep06/Hostel_Management_System-Hibernate-CourseWork");
});

$('#btnProject3').on('click', function () {
    $("#btnProject3>a").attr("target", "_blank");
    $("#btnProject3>a").attr("href", "https://github.com/AshanSandeep06/Hotel_Reservation-System");
});

$('#btnProject4').on('click', function () {
    $("#btnProject4>a").attr("target", "_blank");
    $("#btnProject4>a").attr("href", "https://github.com/AshanSandeep06/Supermarket_System-Layered_Architecture.git");
});

$('#btnProject5').on('click', function () {
    $("#btnProject5>a").attr("target", "_blank");
    $("#btnProject5>a").attr("href", "https://github.com/AshanSandeep06/Vehicle_Parking-System.git");
});

$('#btnProject6').on('click', function () {
    $("#btnProject6>a").attr("target", "_blank");
    $("#btnProject6>a").attr("href", "https://github.com/AshanSandeep06/My_Chat_Application-INP_Coursework.git");
});

$('#btnAllProjects').on('click', function () {
    // $('.display_desktop_projects').css('display', 'none');
    $('.display_desktop_projects').hide();

    // $('.display_all_projects').css('display', 'flex');
    $('.display_all_projects').show();

    $('#btnAllProjects').css({
        "color": "#fff",
        "background": "#007bff",
        "transition": "all 0.3s ease"
    });

    $('#btnDesktop, #btnWeb').css({
        "color": "#007bff",
        "background": "transparent",
        "transition": "all 0.3s ease",
        "border-radius": "50px",
        "border": "2px solid #007bff"
    });
});

$('#btnDesktop').on('click', function () {
    // $('.display_all_projects').css('display', 'none');
    $('.display_all_projects').hide();

    // $('.display_desktop_projects').css('display', 'flex');
    $('.display_desktop_projects').show();

    $('#btnDesktop').css({
        "color": "#fff",
        "background": "#007bff",
        "transition": "all 0.3s ease"
    });

    $('#btnAllProjects, #btnWeb').css({
        "color": "#007bff",
        "background": "transparent",
        "transition": "all 0.3s ease",
        "border-radius": "50px",
        "border": "2px solid #007bff"
    });
});

$('#btnWeb').on('click', function () {
    // $('.display_all_projects').css('display', 'none');
    $('.display_all_projects').hide();

    // $('.display_desktop_projects').css('display', 'none');
    $('.display_desktop_projects').hide();

    $('#btnWeb').css({
        "color": "#fff",
        "background": "#007bff",
        "transition": "all 0.3s ease"
    });

    $('#btnAllProjects, #btnDesktop').css({
        "color": "#007bff",
        "background": "transparent",
        "transition": "all 0.3s ease",
        "border-radius": "50px",
        "border": "2px solid #007bff"
    });
});


/* ------------------------ Assignments Page -------------------- */
for (let i = 1; i < 16; i++) {
    $('#btnAssignment-' + i).on('click', function () {
        let pressedBtnID = this.id;
        switch (pressedBtnID) {
            case "btnAssignment-1":
                $("#btnAssignment-1>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-2":
                $("#btnAssignment-2>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Basics/case_02/index.html"
                });
                break;

            case "btnAssignment-3":
                $("#btnAssignment-3>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Basics/case_03/index.html"
                });
                break;

            case "btnAssignment-4":
                $("#btnAssignment-4>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Basics/case_04/index.html"
                });
                break;

            case "btnAssignment-5":
                $("#btnAssignment-5>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Basics/case_05/index.html"
                });
                break;

            case "btnAssignment-6":
                $("#btnAssignment-6>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Basics/case_06/index.html"
                });
                break;

            case "btnAssignment-7":
                $("#btnAssignment-7>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Transitions/case_01/index.html"
                });
                break;

            case "btnAssignment-8":
                $("#btnAssignment-8>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Transitions/case_02/index.html"
                });
                break;

            case "btnAssignment-9":
                $("#btnAssignment-9>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Animations/case_01/index.html"
                });
                break;

            case "btnAssignment-10":
                $("#btnAssignment-10>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Animations/case_02/index.html"
                });
                break;

            case "btnAssignment-11":
                $("#btnAssignment-11>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Animations/case_03/index.html"
                });
                break;

            case "btnAssignment-12":
                $("#btnAssignment-12>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Animations/case_04/index.html"
                });
                break;

            case "btnAssignment-13":
                $("#btnAssignment-13>a").attr({
                    "target": "_blank",
                    "href": "../assignments/css/Frameworks/POS/index.html"
                });
                break;

            case "btnAssignment-14":
                $("#btnAssignment-14>a").attr({
                    "target": "_blank",
                    "href": "../assignments/JS/Calculator/index.html"
                });
                break;

            case "btnAssignment-15":
                $("#btnAssignment-15>a").attr({
                    "target": "_blank",
                    "href": "../assignments/JS/SPA/index.html"
                });
                break;

            default:
                break;
        }
    });
}

$('#btnAllAssignments').on('click', function () {
    // $('.display_desktop_projects').css('display', 'none');
    $('.display_css_assignments').hide();
    $('.display_js_assignments').hide();

    // $('.display_all_projects').css('display', 'flex');
    $('.display_all_assignments').show();

    $('#btnAllAssignments').css({
        "color": "#fff",
        "background": "#007bff",
        "transition": "all 0.3s ease"
    });

    $('#btnCSS, #btnJS').css({
        "color": "#007bff",
        "background": "transparent",
        "transition": "all 0.3s ease",
        "border-radius": "50px",
        "border": "2px solid #007bff"
    });
});

$('#btnCSS').on('click', function () {
    // $('.display_all_projects').css('display', 'none');
    $('.display_all_assignments').hide();
    $('.display_js_assignments').hide();

    // $('.display_desktop_projects').css('display', 'flex');
    $('.display_css_assignments').show();

    $('#btnCSS').css({
        "color": "#fff",
        "background": "#007bff",
        "transition": "all 0.3s ease"
    });

    $('#btnAllAssignments, #btnJS').css({
        "color": "#007bff",
        "background": "transparent",
        "transition": "all 0.3s ease",
        "border-radius": "50px",
        "border": "2px solid #007bff"
    });
});

$('#btnJS').on('click', function () {
    // $('.display_all_projects').css('display', 'none');
    $('.display_all_assignments').hide();
    $('.display_css_assignments').hide();

    // $('.display_desktop_projects').css('display', 'none');
    $('.display_js_assignments').show();

    $('#btnJS').css({
        "color": "#fff",
        "background": "#007bff",
        "transition": "all 0.3s ease"
    });

    $('#btnAllAssignments, #btnCSS').css({
        "color": "#007bff",
        "background": "transparent",
        "transition": "all 0.3s ease",
        "border-radius": "50px",
        "border": "2px solid #007bff"
    });

    $('#assignments_page').css('height', '722px');
});