/* ----------------------------------- Place Order Form ------------------------------------ */

// Disabled the AddToCart and PlaceOrder buttons
$('#btnAddToCart').attr('disabled', true);
$('#btnPlaceOrder').attr('disabled', true);

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