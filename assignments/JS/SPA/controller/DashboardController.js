/*This will only run once, When the DOM is ready for JavaScript code to execute.*/
$(function () {
    $('#dashBoardSection').css("display", "block");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "none");
    $('#orderDetailsSection').css("display", "none");
});

/*When the Home button is clicked*/
$('#homeBtn').click(function () {
    $('#dashBoardSection').css("display", "block");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "none");
    $('#orderDetailsSection').css("display", "none");
});

/*When the Customer button is clicked*/
$('#customerBtn').click(function () {
    $('#dashBoardSection').css("display", "none");
    $('#customerSection').css("display", "block");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "none");
    $('#orderDetailsSection').css("display", "none");
});

/*When the Item button is clicked*/
$('#itemBtn').click(function () {
    $('#dashBoardSection').css("display", "none");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "block");
    $('#placeOrderSection').css("display", "none");
    $('#orderDetailsSection').css("display", "none");
});

/*When the Place Order button is clicked*/
$('#placeOrderBtn').click(function () {
    $('#dashBoardSection').css("display", "none");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "block");
    $('#orderDetailsSection').css("display", "none");

    loadAllCustomerIDs();
    loadAllItemCodes();
    $('#orderId').val(generateOrderID());
});

/*When the Order Details button is clicked*/
$('#orderDetailsBtn').on('click', function () {
    $('#dashBoardSection').css("display", "none");
    $('#customerSection').css("display", "none");
    $('#itemSection').css("display", "none");
    $('#placeOrderSection').css("display", "none");
    $('#orderDetailsSection').css("display", "block");
});