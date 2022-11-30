/* ------------------------------------ My Portfolio js file ------------------------------------------------ */

/* Window = DOM + CSSOM */
$(window).on('load', function () {
    $('#loader,#extra-div').fadeOut(1000);
    $('body').children(':not(#loader,#extra-div)').fadeIn(3000);
});

$(document).ready(function (){
    $('body').children(':not(#loader,#extra-div)').css('display','none');
});

/*$(function (){

});*/

/* ------------------------ Projects Section -------------------- */
$("#btnProjectsViewMore").on("click", function () {
    $("#btnProjectsViewMore>a").attr("target", "_blank");
    $("#btnProjectsViewMore>a").attr("href", "pages/projects.html");
});

$('#btnPOSProject').on('click', function () {
    $("#btnPOSProject>a").attr("target", "_blank");
    $("#btnPOSProject>a").attr("href", "https://github.com/AshanSandeep06/Restaurant_Management-POS_System");
});

$('#btnHostelProject').on('click', function () {
    $("#btnHostelProject>a").attr("target", "_blank");
    $("#btnHostelProject>a").attr("href", "https://github.com/AshanSandeep06/Hostel_Management_System-Hibernate-CourseWork");
});

$('#btnHotelReservationProject').on('click', function () {
    $("#btnHotelReservationProject>a").attr("target", "_blank");
    $("#btnHotelReservationProject>a").attr("href", "https://github.com/AshanSandeep06/Hotel_Reservation-System");
});

/* ------------------------ Assignments Section -------------------- */
$("#btnAssignmentsViewMore").on("click", function () {
    $("#btnAssignmentsViewMore>a").attr("target", "_blank");
    $("#btnAssignmentsViewMore>a").attr("href", "pages/assignments.html");
});

$('#btnAssignment-01').on('click', function () {
    $("#btnAssignment-01>a").attr("target", "_blank");
    $("#btnAssignment-01>a").attr("href", "assignments/JS/Calculator/index.html");
});

$('#btnAssignment-02').on('click', function () {
    $("#btnAssignment-02>a").attr("target", "_blank");
    $("#btnAssignment-02>a").attr("href", "assignments/JS/Game/index.html");
});

$('#btnAssignment-03').on('click', function () {
    $("#btnAssignment-03>a").attr("target", "_blank");
    $("#btnAssignment-03>a").attr("href", "assignments/css/Animations/case_04/index.html");
});