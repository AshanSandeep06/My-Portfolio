/* ----------------------------------- Place Order Form ------------------------------------ */

// Disabled the AddToCart and PlaceOrder buttons
$('#btnAddToCart').attr('disabled', true);
$('#btnPlaceOrder').attr('disabled', true);

// Set the OrderID when application runs in the initial point
$('#orderId').val(generateOrderID());

// Generates OrderID (Order id's convention ---> OI-001)
function generateOrderID() {
    if (orders.length === 0) {
        return "OI-001";
    } else {
        var i = parseInt(orders[orders.length - 1].orderId.split("-")[1]);
        i++;

        if (i < 10) {
            return "OI-00" + i;
        } else if (i < 100) {
            return "OI-0" + i;
        } else if (i < 1000) {
            return "OI-" + i;
        } else {
            return "OI-" + i;
        }
    }
}

function loadAllCustomerIDs() {
    $('#cmbCusId').empty();
    $('#cmbCusId').append(`<option selected disabled>Select Customer</option>`);
    for (let customer of customers) {
        $('#cmbCusId').append(`<option>${customer.id}</option>`);
    }
}