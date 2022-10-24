/* ----------------------------------- Place Order Form ------------------------------------ */

// Global variables
let itemCode;
let itemName;
let unitPrice;
let qtyOnHand;
let orderedQuantity;

let subTotal;
let discount;
let totalCost;

// Disabled the AddToCart and PlaceOrder buttons
// $('#btnAddToCart').attr('disabled', true);
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

// Checked whether the passed itemCode already exist in the Cart Table
function isExists(itemCode) {
    for (let tm in cartDetails) {
        if (tm.itemCode === itemCode) {
            return tm;
        }
    }
    return null;
}

// Load all cart details
function loadAllCartDetails() {
    $("#tblCart>tbody").empty();

    for (let i = 0; i < cartDetails.length; i++) {
        var tblRow = `<tr><td>${cartDetails[i].itemCode}</td><td>${cartDetails[i].itemName}</td><td>${cartDetails[i].unitPrice}</td><td>${cartDetails[i].quantity}</td><td>${cartDetails[i].totalCost}</td></tr>`;
        $("#tblCart>tbody").append(tblRow);
    }
}

// Items were added to the Cart Table
$('#btnAddToCart').click(function () {
    var quantityValidation = /^[1-9][0-9]{0,4}$/;
    if (!quantityValidation.test($('#txtQuantity').val()) || parseInt($('#txtQuantity').val()) <= 0 ||
        parseInt($('#txtQuantity').val()) > parseInt($('#QuantityOnHand').val())) {
        $('#txtQuantity').focus();
        return;
    }

    try {
        if (parseInt($('#QuantityOnHand').val()) > 0) {
            if ($('#cmbItemCode').val() !== "Select Item" && $('#txtQuantity').val() !== '') {
                if (quantityValidation.test($('#txtQuantity').val())) {
                    itemCode = $('#cmbItemCode').val();
                    itemName = $('#iName').val();
                    unitPrice = parseFloat($('#iPrice').val()).toFixed(2);
                    qtyOnHand = parseInt($('#QuantityOnHand').val());
                    orderedQuantity = parseInt($('#txtQuantity').val());

                    discount = parseFloat($('#txtDiscount').val());
                    subTotal = unitPrice * orderedQuantity;
                    totalCost = parseFloat(subTotal).toFixed(2);

                    var tmIsExist = isExists($('#cmbItemCode').val());

                    if (tmIsExist != null) {
                        tmIsExist.quantity = tmIsExist.quantity + orderedQuantity;
                        totalCost = tmIsExist.quantity * unitPrice;    /* SURE Na */
                        tmIsExist.totalCost = totalCost;
                    } else {
                        var cartTm = Object.assign({}, cartTMObject);
                        cartTm.itemCode = itemCode;
                        cartTm.itemName = itemName;
                        cartTm.unitPrice = unitPrice;
                        cartTm.quantity = orderedQuantity;
                        cartTm.totalCost = totalCost;

                        cartDetails.push(cartTm);

                        loadAllCartDetails();
                    }
                } else {

                }
            } else {

            }
        } else {

        }

    } catch (e) {
        console.log(e.message);
    }

    $('#btnAddToCart').attr('disabled', true);
    $('#cmbItemCode').focus();
});
















