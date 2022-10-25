/* ----------------------------------- Place Order Form ------------------------------------ */

// Global variables
let itemCode;
let itemName;
let unitPrice;
let qtyOnHand;
let orderedQuantity;

let subTotal = 0.00;
let discount;
let totalCost;

// Disabled the AddToCart and PlaceOrder buttons
$('#btnAddToCart').attr('disabled', true);
$('#btnPlaceOrder').attr('disabled', true);

// displays initial value of discount
$('#txtDiscount').val(0.00);

// Set the OrderID when application runs in the initial point
$('#orderId').val(generateOrderID());

// InvalidQtySpan will display: hidden, until OrderedQuantity textField's value is invalid
$('#invalidQtySpan').css('display', "none");

// Set the current date
var date = new Date();
$('#orderDate').val(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

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

// ------------------------------------------------------------------------------------------------------------------

// Checked whether the passed itemCode already exist in the Cart Table
function isExists(itemCode) {
    for (let tm of cartDetails) {
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
        var tblRow = `<tr><td>${cartDetails[i].itemCode}</td><td>${cartDetails[i].itemName}</td><td>${cartDetails[i].unitPrice}</td><td>${cartDetails[i].quantity}</td><td>${cartDetails[i].total}</td></tr>`;
        $("#tblCart>tbody").append(tblRow);
    }
}

// Calculates sub total of the Ordered items
function calculateSubTotal() {
    subTotal = 0;
    for (let i of cartDetails) {
        subTotal += parseFloat(i.total);
    }
    $('#lblSubTotal').text(subTotal.toFixed(2) + " LKR");
}

// Calculates total cost of the Ordered items
function calculateTotalCost() {
    totalCost = 0;
    discount = 0;
    discount = parseFloat($('#txtDiscount').val());
    totalCost = parseFloat(`${subTotal} - ${discount}`);

    $('#txtDiscount').val(discount.toFixed(2));
    $('#txtTotalCost').val(totalCost.toFixed(2));
}

// Items were added to the Cart Table
$('#btnAddToCart').click(function () {
    var quantityValidation = /^[1-9][0-9]{0,4}$/;

    if (!quantityValidation.test($('#txtQuantity').val()) || parseInt($('#txtQuantity').val()) <= 0 ||
        parseInt($('#txtQuantity').val()) > parseInt($('#QuantityOnHand').val())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You has entered a Invalid Quantity.!',
            footer: 'Why do I have this issue?'
        })

        $('#txtQuantity').focus();
        return;
    }

    try {
        if (parseInt($('#QuantityOnHand').val()) > 0) {
            if ($('#cmbItemCode').val() !== null && $('#txtQuantity').val() !== '') {
                if (quantityValidation.test($('#txtQuantity').val())) {
                    var total = 0;
                    itemCode = $('#cmbItemCode').val();
                    itemName = $('#iName').val();
                    unitPrice = parseFloat($('#iPrice').val()).toFixed(2);
                    qtyOnHand = parseInt($('#QuantityOnHand').val());
                    orderedQuantity = parseInt($('#txtQuantity').val());

                    discount = parseFloat($('#txtDiscount').val());
                    total = (unitPrice * orderedQuantity).toFixed(2);

                    var tmIsExist = isExists($('#cmbItemCode').val());

                    if (tmIsExist != null) {
                        tmIsExist.quantity = tmIsExist.quantity + orderedQuantity;
                        total = (tmIsExist.quantity * unitPrice).toFixed(2);
                        tmIsExist.total = total;
                    } else {
                        var cartTm = Object.assign({}, cartTMObject);
                        cartTm.itemCode = itemCode;
                        cartTm.itemName = itemName;
                        cartTm.unitPrice = unitPrice;
                        cartTm.quantity = orderedQuantity;
                        cartTm.total = total;

                        cartDetails.push(cartTm);

                        loadAllCartDetails();
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Quantity...',
                        text: 'Please enter a valid quantity..!'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to adding items..',
                    text: 'Please select an item & input item Quantity..!'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Out Of Stock..',
                text: 'This item has zero quantity, Therefore Choose another item..!'
            })
        }

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }

    $('#btnAddToCart').attr('disabled', true);
    calculateSubTotal();
    calculateTotalCost();
    loadAllCartDetails();
    $('#cmbItemCode').focus();
    clearFields();

    // enableOrDisablePlaceOrderButton();

});

function clearFields() {
    clearCustomerData();
    clearItemData();
}

// This function is used for Events
function enableOrDisableAddToCartButton() {
    if ($('#txtQuantity').val().trim().length !== 0 && $('#cmbCusId').val() !== null && $('#cmbItemCode').val() !== null && $('#orderDate').val().trim().length !== 0) {
        var qtyValidation = /^[1-9][0-9]{0,4}$/;
        if (qtyValidation.test($('#txtQuantity').val())) {
            $('#btnAddToCart').attr('disabled', false);
        } else {
            $('#btnAddToCart').attr('disabled', true);
        }
    } else {
        $('#btnAddToCart').attr('disabled', true);
    }
}

// Set events for enable AddToCart button
$('#orderDate, #cmbCusId, #cmbItemCode').click(function () {
    enableOrDisableAddToCartButton();
});

// validate Quantity textField
function checkQuantity() {
    if ($('#txtQuantity').val().trim().length !== 0) {
        var qtyValidation = /^[1-9][0-9]{0,4}$/;
        if (qtyValidation.test($('#txtQuantity').val())) {
            $('#invalidQtySpan').css('display', 'none');
            $('#txtQuantity').css("border", "1px solid rgb(206, 212, 218)");
        } else {
            $('#invalidQtySpan').css('display', 'block');
            $('#txtQuantity').css("border", "2px solid red");
        }
    } else {
        $('#invalidQtySpan').css('display', 'none');
        $('#txtQuantity').css("border", "1px solid rgb(206, 212, 218)");
    }
}

$("#txtQuantity").on('keyup', function (event) {
    enableOrDisableAddToCartButton();
    checkQuantity();
});

function clearCustomerData(){
    $('#orderId').val(generateOrderID());
    $('#orderDate').val(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    $('#cmbCusId').val('Select Customer');
    $('#cusName').val('');
    $('#cusAddress').val('');
    $('#cusSalary').val('');
}

function clearItemData(){
    $('#cmbItemCode').val('Select Item');
    $('#iName').val('');
    $('#iPrice').val('');
    $('#QuantityOnHand').val('');
    $('#txtQuantity').val('');
    checkQuantity();
}

// Clear customer textFields' data
$("#btnClearCusData").on('click', function (event) {
    clearCustomerData();
});

// Clear item textFields' data
$("#btnClearItemData").on('click', function (event) {
    clearItemData();
});
