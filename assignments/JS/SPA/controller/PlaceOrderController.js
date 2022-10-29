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
$('#btnUpdateCart').attr('disabled', true);

// displays initial value of discount
$('#txtDiscount').val(0.00);

// Set the OrderID when application runs in the initial point
$('#orderId').val(generateOrderID());

// Spans for validations will display: hidden, until that related textField's values are invalid
$('#invalidQtySpan').css('display', "none");
$('#invalidDiscountSpan').css('display', "none");
$('#invalidCashSpan').css('display', "none");
$('#invalidBalanceSpan').css('display', "none");

// Set the current date
var date = new Date();
$('#orderDate').val(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

loadAllCustomerIDs();
loadAllItemCodes();

// --------------------------------------------------------------
var c1 = Object.assign({}, customerObject);
c1.id = "C00-001";
c1.name = "Nimal Perera";
c1.address = "Galle 28/C";
c1.salary = 45000;

customers.push(c1);

var i1 = Object.assign({}, itemObject);
i1.itemCode = "I-001";
i1.itemName = "Soap";
i1.unitPrice = 200.00;
i1.qtyOnHand = 4000;

var i2 = Object.assign({}, itemObject);
i2.itemCode = "I-002";
i2.itemName = "Biscuits";
i2.unitPrice = 150.00;
i2.qtyOnHand = 1000;

items.push(i1);
items.push(i2);
// --------------------------------------------------------------

// Generates OrderID (Order id's convention ---> OI-001)
function generateOrderID() {
    if (orders.length === 0) {
        return "OID-001";
    } else {
        var i = parseInt(orders[orders.length - 1].orderId.split("-")[1]);
        i++;

        if (i < 10) {
            return "OID-00" + i;
        } else if (i < 100) {
            return "OID-0" + i;
        } else if (i < 1000) {
            return "OID-" + i;
        } else {
            return "OID-" + i;
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

function setCustomerDetails() {
    for (let c1 of customers) {
        if (c1.id === $('#cmbCusId').val()) {
            $('#cusName').val(c1.name);
            $('#cusAddress').val(c1.address);
            $('#cusSalary').val(c1.salary);
            break;
        }
    }
}

// Set customer data
$('#cmbCusId').on('click', function () {
    setCustomerDetails();
    enableOrDisablePlaceOrderButton();
});

// load all added items' codes
function loadAllItemCodes() {
    $('#cmbItemCode').empty();
    $('#cmbItemCode').append(`<option selected disabled>Select Item</option>`);
    for (let item of items) {
        $('#cmbItemCode').append(`<option>${item.itemCode}</option>`);
    }
}

function setItemDetails() {
    for (let item of items) {
        if (item.itemCode === $('#cmbItemCode').val()) {
            $('#iName').val(item.itemName);
            $('#iPrice').val(item.unitPrice);
            $('#QuantityOnHand').val(item.qtyOnHand);
            break;
        }
    }
}

// Set Item data
$('#cmbItemCode').on('click', function () {
    setItemDetails();
    reduceQuantity();
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
    totalCost = parseFloat(subTotal) - parseFloat(discount);

    // $('#txtDiscount').val(discount.toFixed(2));
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

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: 'Your Ordered item has been added to the Cart',
                        showConfirmButton: true,
                        timer: 1500
                    })


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
    bindTblRowClickEvents();
    bindTblRowDblClickEvents();
    enableOrDisablePlaceOrderButton();
});

function clearFields() {
    // clearCustomerData();
    clearItemData();
}

// This function is used for Events
function enableOrDisableAddToCartButton() {
    if ($('#txtQuantity').val().trim().length !== 0 && $('#cmbCusId').val() !== null && $('#cmbItemCode').val() !== null && $('#orderDate').val().trim().length !== 0) {
        var qtyValidation = /^[1-9][0-9]{0,4}$/;
        if (qtyValidation.test($('#txtQuantity').val())) {
            if (parseInt($('#txtQuantity').val()) <= parseInt($('#QuantityOnHand').val())) {
                $('#btnAddToCart').attr('disabled', false);
            } else {
                $('#btnAddToCart').attr('disabled', true);
            }
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
    var text = "Invalid Quantity Pattern : 15 (Only a Number)";
    if ($('#txtQuantity').val().trim().length !== 0) {
        var qtyValidation = /^[1-9][0-9]{0,4}$/;
        if (qtyValidation.test($('#txtQuantity').val())) {
            if (parseInt($('#txtQuantity').val()) <= parseInt($('#QuantityOnHand').val())) {
                $('#invalidQtySpan').css('display', 'none');
                $('#txtQuantity').css("border", "1px solid rgb(206, 212, 218)");
            } else {
                $('#invalidQtySpan').text("Please Enter a Amount lower than : " + $('#QuantityOnHand').val());
                $('#invalidQtySpan').css('display', 'block');
                $('#txtQuantity').css("border", "2px solid red");
            }
        } else {
            $('#invalidQtySpan').css('display', 'block');
            $('#invalidQtySpan').text(text);
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

function clearCustomerData() {
    $('#orderId').val(generateOrderID());
    $('#orderDate').val(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    $('#cmbCusId').val('Select Customer');
    $('#cusName').val('');
    $('#cusAddress').val('');
    $('#cusSalary').val('');
    enableOrDisablePlaceOrderButton();
}

function clearItemData() {
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
    $('#btnUpdateCart').attr('disabled', true);
    $('#btnAddToCart').attr('disabled', true);
});

function reduceQuantity() {
    for (let tm of cartDetails) {
        if (tm.itemCode === $('#cmbItemCode').val()) {
            var changedQty = $('#QuantityOnHand').val() - tm.quantity;
            $('#QuantityOnHand').val(parseInt(changedQty));
        }
    }
}

function bindTblRowClickEvents() {
    $('#tblCart>tbody>tr').click(function () {
        if ($('#tblCart>tbody>tr').length !== 0) {
            $('#btnUpdateCart').attr('disabled', false);
            $('#btnAddToCart').attr('disabled', true);

            $('#cmbItemCode').val($(this).children().eq(0).text());
            $('#iName').val($(this).children().eq(1).text());
            $('#iPrice').val($(this).children().eq(2).text());
            $('#txtQuantity').val($(this).children().eq(3).text());

            for (let tm of items) {
                if (tm.itemCode === $(this).children().eq(0).text()) {
                    $('#QuantityOnHand').val(parseInt(tm.qtyOnHand - $(this).children().eq(3).text()));
                    break;
                }
            }

        } else {
            $('#btnUpdateCart').attr('disabled', true);
        }
    });
}

function bindTblRowDblClickEvents() {
    $('#tblCart>tbody>tr').on('dblclick', function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to Delete this item ?!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Selected item has been deleted.',
                    'success'
                )
                for (let tm of cartDetails) {
                    if ($(this).children(':eq(0)').text() === tm.itemCode) {
                        cartDetails.splice(cartDetails.indexOf(tm), 1);
                        $(this).remove();
                        clearItemData();
                        break;
                    }
                }

                calculateSubTotal();
                calculateTotalCost();

            } else {
                Swal.fire(
                    'Cancelled',
                    'Selected item are not Deleted\n :)',
                    'error'
                )
            }
        })
        enableOrDisablePlaceOrderButton();
    });
}

$('#txtQuantity').on('keyup', function () {
    if ($('#tblCart>tbody>tr').length !== 0) {
        if ($('#txtQuantity').val().trim().length !== 0) {
            var qtyValidation = /^[1-9][0-9]{0,4}$/;
            if (qtyValidation.test($('#txtQuantity').val())) {
                $('#btnUpdateCart').attr('disabled', false);
            } else {
                $('#btnUpdateCart').attr('disabled', true);
            }
        } else {
            $('#btnUpdateCart').attr('disabled', true);
        }
    } else {
        $('#btnUpdateCart').attr('disabled', true);
    }
});

function updateCartItems() {
    for (let tm of cartDetails) {
        if (tm.itemCode === $('#cmbItemCode').val()) {
            tm.quantity = parseInt($('#txtQuantity').val());
            tm.total = parseFloat(tm.quantity * tm.unitPrice).toFixed(2);
            loadAllCartDetails();
            calculateSubTotal();
            calculateTotalCost();
            bindTblRowClickEvents();
            bindTblRowDblClickEvents();
            return 0;
        }
    }
    return -1;
}

// Update added items of Cart Table
$('#btnUpdateCart').click(function () {
    if ($('#txtQuantity').val().trim().length !== 0 && $('#cmbCusId').val() !== null && $('#cmbItemCode').val() !== null) {
        if (updateCartItems() !== -1) {
            Swal.fire(
                'Successfully Updated!',
                'Selected Cart item has been Updated!',
                'success'
            )
            clearItemData();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This item hasn\'t been exist in the Cart, Therefore, Can\'t Updated!'
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong, Please try again.!'
        })
        $('#btnUpdateCart').attr('disabled', true);
    }
    enableOrDisablePlaceOrderButton();
});

// validate Discount textField
function checkDiscount() {
    if ($('#txtDiscount').val().trim().length !== 0) {
        var discountValidation = /^[0-9]{0,5}(.[0-9]{2})?$/;
        if (discountValidation.test($('#txtDiscount').val())) {
            $('#invalidDiscountSpan').css('display', 'none');
            $('#txtDiscount').css("border", "1px solid rgb(206, 212, 218)");
            calculateSubTotal();
            calculateTotalCost();
            $('#txtCash').attr('disabled', false);
        } else {
            $('#invalidDiscountSpan').css('display', 'block');
            $('#txtDiscount').css("border", "2px solid red");
            $('#txtTotalCost').val($('#lblSubTotal').text().split(' ')[0]);
            $('#txtCash').attr('disabled', true);
        }
    } else {
        $('#invalidDiscountSpan').css('display', 'none');
        $('#txtDiscount').css("border", "1px solid rgb(206, 212, 218)");
        $('#txtTotalCost').val($('#lblSubTotal').text().split(' ')[0]);
        $('#txtCash').attr('disabled', true);
    }
}

$('#txtDiscount').on('keyup', function () {
    checkDiscount();
});

function calculateBalance(totalCost, cash) {
    return cash - totalCost;
}

// validate Cash textField
function checkCash() {
    if ($('#txtCash').val().trim().length !== 0) {
        var cashValidation = /^[0-9]{1,}(.[0-9]{2})?$/;
        if (cashValidation.test($('#txtCash').val())) {
            $('#invalidCashSpan').css('display', 'none');
            $('#txtCash').css("border", "1px solid rgb(206, 212, 218)");
            return true;
        } else {
            $('#invalidCashSpan').css('display', 'block');
            $('#txtCash').css("border", "2px solid red");
            return false;
        }
    } else {
        $('#invalidCashSpan').css('display', 'none');
        $('#txtCash').css("border", "1px solid rgb(206, 212, 218)");
        return false;
    }
}

// Validate Cash TextField
$('#txtCash').on('keyup', function () {
    if (checkCash()) {
        if ($('#lblSubTotal').text().length !== 0 && $('#txtDiscount').val().length !== 0 && $('#txtTotalCost').val().length !== 0) {
            $('#txtBalance').val(calculateBalance(parseFloat($('#txtTotalCost').val()), parseFloat($('#txtCash').val())));
            if (parseFloat($('#txtBalance').val()) < 0) {
                $('#invalidBalanceSpan').css('display', 'block');
                $('#txtBalance').css("border", "2px solid red");
            } else {
                $('#invalidBalanceSpan').css('display', 'none');
                $('#txtBalance').css("border", "1px solid rgb(206, 212, 218)");
            }
        } else {
            $('#txtBalance').val(0);
        }
    } else {
        $('#txtBalance').val(0);
    }
    enableOrDisablePlaceOrderButton();
});

function clearAll() {
    clearCustomerData();
    clearItemData();
    $('#btnUpdateCart').attr('disabled', true);
    $('#btnAddToCart').attr('disabled', true);
    $('#btnPlaceOrder').attr('disabled', true);
    cartDetails = [];
    loadAllCartDetails();
    $('#lblSubTotal').text(0 + " LKR");
    $('#txtDiscount').val(0);
    $('#txtTotalCost').val('');
    $('#txtCash').val('');
    $('#txtBalance').val('');

    $('#invalidDiscountSpan').css('display', "none");
    $('#invalidCashSpan').css('display', "none");
    $('#invalidBalanceSpan').css('display', "none");

    $('#txtBalance').css("border", "1px solid rgb(206, 212, 218)");
    $('#txtCash').css("border", "1px solid rgb(206, 212, 218)");
    $('#txtDiscount').css("border", "1px solid rgb(206, 212, 218)");
}

$('#btnCancelOrder').click(function () {
    clearAll();
});

function enableOrDisablePlaceOrderButton() {
    $('#btnPlaceOrder').attr('disabled', !($('#cmbCusId').val() !== null && $('#tblCart>tbody>tr').length !== 0 &&
        $('#txtCash').val().length !== 0 && /^[0-9]{1,}(.[0-9]{2})?$/.test($('#txtCash').val()) && $('#txtBalance').val().length !== 0 &&
        /^[0-9]{1,}(.[0-9]{2})?$/.test($('#txtBalance').val())));
}

//Check from OrderID whether that Order is exist ?
function existOrder(orderID) {
    for (let order of orders) {
        if (order.orderId === orderID) {
            return true;
        }
    }
    return false;
}

// This is for Place a Order
function purchaseOrder() {
    try {
        if (!existOrder($('#orderId').val())) {
            if ($('#tblCart>tbody>tr').length !== 0 && $('#cmbCusId').val() !== null) {
                for (let tm of cartDetails) {
                    var orderDetail = Object.assign({}, orderDetailObject);
                    orderDetail.orderId = $('#orderId').val();
                    orderDetail.cusId = $('#cmbCusId').val();
                    orderDetail.itemCode = tm.itemCode;
                    orderDetail.quantity = parseInt(tm.quantity);
                    orderDetail.total = parseFloat(tm.total);
                    orderDetails.push(orderDetail);

                    // Updating Quantity
                    var item = searchItem(orderDetail.itemCode);
                    if (item !== null) {
                        item.qtyOnHand = item.qtyOnHand - orderDetail.quantity;
                    }
                }

                var order = Object.assign({}, orderObject);
                order.orderId = $('#orderId').val();
                order.cusId = $('#cmbCusId').val();
                order.orderDate = $('#orderDate').val();
                order.discount = $('#txtDiscount').val();
                order.totalCost = $('#txtTotalCost').val();
                orders.push(order);

                Swal.fire(
                    'Order Placement successful!',
                    'Order has been placed successfully..!',
                    'success'
                )

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed...',
                    text: 'Something went wrong!'
                })
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'This Order is already exists..!'
            })
        }

    } catch (e) {
        console.log(e);
    }
    clearAll();
    enableOrDisablePlaceOrderButton();
}

//Purchase Order click event
$('#btnPlaceOrder').on('click', function () {
    purchaseOrder();
});

