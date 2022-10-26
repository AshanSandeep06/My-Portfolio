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

// InvalidQtySpan, invalidDiscountSpan will display: hidden, until OrderedQuantity textField's value is invalid
$('#invalidQtySpan').css('display', "none");
$('#invalidDiscountSpan').css('display', "none");

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

    // enableOrDisablePlaceOrderButton();

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

function clearCustomerData() {
    $('#orderId').val(generateOrderID());
    $('#orderDate').val(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    $('#cmbCusId').val('Select Customer');
    $('#cusName').val('');
    $('#cusAddress').val('');
    $('#cusSalary').val('');
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
});

// validate Quantity textField
function checkDiscount() {
    if ($('#txtDiscount').val().trim().length !== 0) {
        var discountValidation = /^[1-9]{1}[0-9]{0,5}(.[0-9]{2})?$/;
        if (discountValidation.test($('#txtDiscount').val())) {
            $('#invalidDiscountSpan').css('display', 'none');
            $('#txtDiscount').css("border", "1px solid rgb(206, 212, 218)");
        } else {
            $('#invalidDiscountSpan').css('display', 'block');
            $('#txtDiscount').css("border", "2px solid red");
        }
    } else {
        $('#invalidDiscountSpan').css('display', 'none');
        $('#txtDiscount').css("border", "1px solid rgb(206, 212, 218)");
    }
}

$('#txtDiscount').on('keyup', function () {
    checkDiscount();
});

