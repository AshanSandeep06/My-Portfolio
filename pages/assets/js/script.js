/* ----------------------- js file for Projects and Assignments Page ----------------------- */

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

/* ------------------------ Assignments Page -------------------- */
for (let i = 1; i < 16; i++) {
    $('#btnAssignment-' + i).on('click', function () {
        let pressedBtnID = this.id;
        switch (pressedBtnID) {
            case "btnAssignment-1":
                $("#btnAssignment-1>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-2":
                $("#btnAssignment-2>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-3":
                $("#btnAssignment-3>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-4":
                $("#btnAssignment-4>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-5":
                $("#btnAssignment-5>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-6":
                $("#btnAssignment-6>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-7":
                $("#btnAssignment-7>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-8":
                $("#btnAssignment-8>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-9":
                $("#btnAssignment-9>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-10":
                $("#btnAssignment-10>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-11":
                $("#btnAssignment-11>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-12":
                $("#btnAssignment-12>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-13":
                $("#btnAssignment-13>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-14":
                $("#btnAssignment-14>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            case "btnAssignment-15":
                $("#btnAssignment-15>a").attr({
                    "target": "_blank",
                    "href": "assignments/css/Basics/case_01/index.html"
                });
                break;

            default:
                break;
        }
    });
}