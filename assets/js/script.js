/* ------------------------------------ My Portfolio js file ------------------------------------------------ */

$("#btnProjectsViewMore").on("click", function () {
    $("#btnProjectsViewMore>a").attr("target", "_blank");
    $("#btnProjectsViewMore>a").attr("href", "https://github.com/AshanSandeep06?tab=repositories");
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