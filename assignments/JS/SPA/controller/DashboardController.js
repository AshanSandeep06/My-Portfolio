/*This will only run once, When the DOM is ready for JavaScript code to execute.*/
$(function () {
    $('#dashBoardSection').css("display", "block");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "none");
});

/*When the Home button clicked*/
$('#homeBtn').click(function () {
    $('#dashBoardSection').css("display", "block");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "none");
});

/*When the Customer button clicked*/
$('#customerBtn').click(function () {
    $('#dashBoardSection').css("display", "none");
    $('#customerSection').css("display", "block");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "none");
});

/*When the Item button clicked*/
$('#itemBtn').click(function () {
    $('#dashBoardSection').css("display", "none");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "block");
    $('#placeOrderSection').css("display", "none");
});

/*When the Place Order button clicked*/
$('#placeOrderBtn').click(function () {
    $('#dashBoardSection').css("display", "none");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "block");
    loadAllCustomerIDs();
});