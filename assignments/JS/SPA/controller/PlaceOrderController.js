/* ----------------------------------- Place Order Form ------------------------------------ */

// Disabled the AddToCart and PlaceOrder buttons
$('#btnAddToCart').attr('disabled', true);
$('#btnPlaceOrder').attr('disabled', true);

// Set the OrderID when application runs in the initial point
$('#orderId').val(generateOrderID());

loadAllCustomerIDs();
loadAllItemCodes();

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

// load all added customers' ids
function loadAllCustomerIDs() {
    $('#cmbCusId').empty();
    $('#cmbCusId').append(`<option selected disabled>Select Customer</option>`);
    for (let customer of customers) {
        $('#cmbCusId').append(`<option>${customer.id}</option>`);
    }
}

// Set customer data
$('#cmbCusId').on('click', function () {
    for (let c1 of customers) {
        if (c1.id === $('#cmbCusId').val()) {
            $('#cusName').val(c1.name);
            $('#cusAddress').val(c1.address);
            $('#cusSalary').val(c1.salary);
            break;
        }
    }
});

// load all added items' codes
function loadAllItemCodes() {
    $('#cmbItemCode').empty();
    $('#cmbItemCode').append(`<option selected disabled>Select Item</option>`);
    for (let item of items) {
        $('#cmbItemCode').append(`<option>${item.itemCode}</option>`);
    }
}

// Set Item data
$('#cmbItemCode').on('click', function () {
    for (let item of items) {
        if (item.itemCode === $('#cmbItemCode').val()) {
            $('#iName').val(item.itemName);
            $('#iPrice').val(item.unitPrice);
            $('#QuantityOnHand').val(item.qtyOnHand);
            break;
        }
    }
});