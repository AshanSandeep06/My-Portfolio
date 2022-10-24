/* ----------------------------------- Place Order Form ------------------------------------ */

// Disabled the AddToCart and PlaceOrder buttons
$('#btnAddToCart').attr('disabled', true);
$('#btnPlaceOrder').attr('disabled', true);

var c1 = Object.assign({}, orderObject);
c1.orderId = "OI-001";
c1.orderDate = "2022";
c1.cusId = "C00-001";
c1.discount = 50.00;
c1.totalCost = 3500.00;
orders.push(c1);

var c2 = Object.assign({}, orderObject);
c2.orderId = "OI-002";
c2.orderDate = "2022";
c2.cusId = "C00-002";
c2.discount = 50.00;
c2.totalCost = 3500.00;
orders.push(c2);

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