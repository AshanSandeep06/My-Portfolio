/* -------------------------------- Manage Item Form ------------------------------------*/

/* Save Item function */
$("#btnSaveItem").click(function () {
    let itemCode = "";
    let itemName = "";
    let unitPrice = "";
    let qtyOnHand = "";

    itemCode = $("#txtItemCode").val();
    itemName = $("#txtItemName").val();
    unitPrice = $("#txtUnitPrice").val();
    qtyOnHand = $("#txtQtyOnHand").val();

    /* Check if the customer fields have typed values */
    if (itemCode.length !== 0 && itemName.length !== 0 && unitPrice.length !== 0 && qtyOnHand.length !== 0) {
        if (searchItem($('#txtItemCode').val()) == null) {
            /* Item Object */
            var newItem = Object.assign({}, itemObject);
            newItem['itemCode'] = itemCode;
            newItem["itemName"] = itemName;
            newItem['unitPrice'] = unitPrice;
            newItem['qtyOnHand'] = qtyOnHand;

            /* Newly added item was stored in this array */
            items.push(newItem);

            // Item was saved alert
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Item has been saved successfully..!',
                showConfirmButton: false,
                timer: 1500
            })

            loadAllItems();
            bindRowClickEvents($('#tblItem > tbody > tr'));
            bindRowDblClickEvents($('#tblItem > tbody > tr'));
            clearItemModalFields();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'This Item was already exists by this Item Code!',
            })
        }
    } else {
        // Error alert
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Something went wrong!',
        })
    }
});

//Load all items function
function loadAllItems() {
    $("#tblItem>tbody").empty();

    for (let i = 0; i < items.length; i++) {
        var tblRow = `<tr><td>${items[i].itemCode}</td><td>${items[i].itemName}</td><td>${items[i].unitPrice}</td><td>${items[i].qtyOnHand}</td></tr>`;
        $("#tblItem>tbody").append(tblRow);
    }
}

function searchItem(itemCode) {
    for (let i1 of items) {
        if (i1.itemCode === itemCode) {
            return i1;
        }
    }
    return null;
}

/* Search Item function */
$("#btnSearchItem").click(function () {
    if ($("#txtSearchItem").val().length !== 0) {
        if ($("#cmbSearchItem").val() === "Item Code") {
            var typedId = $("#txtSearchItem").val();
            var item = null;

            item = searchItem(typedId);

            if (item !== null) {
                setItemData(item);
            } else {
                clearItemTextFields();
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'This item doesn\'t exist..!',
                })
            }

        } else {
            var typedName = $("#txtSearchItem").val();
            item = null;

            for (let i of items) {
                if (i.itemName === typedName) {
                    item = i;
                    break;
                }
            }

            if (item !== null) {
                setItemData(item);
            } else {
                clearItemTextFields();
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'This item doesn\'t exist..!',
                })
            }
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Empty field..',
            text: 'Please input Item Code or item name',
        })
    }
});

$('#txtSearchItem').on('keyup', function (event) {
    if (event.key === "Enter") {
        if ($("#txtSearchItem").val().length !== 0) {
            if ($("#cmbSearchItem").val() === "Item Code") {
                var typedId = $("#txtSearchItem").val();
                var item = null;

                item = searchItem(typedId);

                if (item !== null) {
                    setItemData(item);
                } else {
                    clearItemTextFields();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'This item doesn\'t exist..!',
                    })
                }

            } else {
                var typedName = $("#txtSearchItem").val();
                item = null;

                for (let i of items) {
                    if (i.itemName === typedName) {
                        item = i;
                        break;
                    }
                }

                if (item !== null) {
                    setItemData(item);
                } else {
                    clearItemTextFields();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'This item doesn\'t exist..!',
                    })
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Empty field..',
                text: 'Please input Item Code or name',
            })
        }
    }
});

function setItemData(i1) {
    $("#itemCode").val(i1.itemCode);
    $("#itemName").val(i1.itemName);
    $("#unitPrice").val(i1.unitPrice);
    $("#qtyOnHand").val(i1.qtyOnHand);

    checkValidation(saveItemOptionValidations, $('#btnSaveItem'));
    checkValidation(updateAndDeleteItemValidations, $('#btnUpdateItem'));
}

function clearItemTextFields() {
    $("#itemCode").val('');
    $("#itemName").val('');
    $("#unitPrice").val('');
    $("#qtyOnHand").val('');
    $('#itemCode,#itemName,#unitPrice,#qtyOnHand').css("border", "1px solid #ced4da");
    $('#btnUpdateItem').attr('disabled', true);
}

function clearItemModalFields() {
    $("#txtItemCode").val('');
    $("#txtItemName").val('');
    $("#txtUnitPrice").val('');
    $("#txtQtyOnHand").val('');
    $("#txtItemCode").focus();
    $('#txtItemCode,#txtItemName,#txtUnitPrice,#txtQtyOnHand').css("border", "1px solid #ced4da");
    $('#txtItemCode,#txtItemName,#txtUnitPrice,#txtQtyOnHand').parent().children('span').text("");
    $('#btnSaveItem').attr('disabled', true);
}

$("#btnClearItem").click(function () {
    clearItemTextFields();
});

$("#btnSearchItemClear").click(function () {
    $("#txtSearchItem").val('');
});

/* Clear button in Modal */
$('#btnClearFields').on('click', function () {
    clearItemModalFields();
});

/* Disable Tab Key focus */
$('.prevent_tab_key_focus').on('keydown', function (event) {
    if (event.code === "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode").focus();
$("#btnSaveItem").attr('disabled', true);

/* Regex Patterns */
const itemCodePattern = /^(I-)[0-9]{3,5}$/;
const itemNamePattern = /^[A-z0-9-& ]{3,45}$/;
const unitPricePattern = /^[1-9][0-9]*(.[0-9]{2})?$/;
const qtyOnHandPattern = /^[0-9]{1,6}$/;

/* Validate save item textFields */
let saveItemOptionValidations = [];
saveItemOptionValidations.push({
    regEx: itemCodePattern,
    textField: $('#txtItemCode'),
    errorMsg: 'Invalid Item Code Pattern : I-001'
});
saveItemOptionValidations.push({
    regEx: itemNamePattern,
    textField: $('#txtItemName'),
    errorMsg: 'Invalid Item Name Pattern : A-z 0-9 - & 3-45'
});
saveItemOptionValidations.push({
    regEx: unitPricePattern,
    textField: $('#txtUnitPrice'),
    errorMsg: 'Invalid UnitPrice Pattern : 200 or 250.00'
});
saveItemOptionValidations.push({
    regEx: qtyOnHandPattern,
    textField: $('#txtQtyOnHand'),
    errorMsg: 'Invalid QtyOnHand Pattern : 15 (Only a Number)'
});

/* Focusing the textFields */
$('#txtItemCode').on('keydown', function (event) {
    if (event.code === "Enter" && check(itemCodePattern, $('#txtItemCode'))) {
        $('#txtItemName').focus();
    }
});

$('#txtItemName').on('keydown', function (event) {
    if (event.code === "Enter" && check(itemNamePattern, $('#txtItemName'))) {
        $('#txtUnitPrice').focus();
    }
});

$('#txtUnitPrice').on('keydown', function (event) {
    if (event.code === "Enter" && check(unitPricePattern, $('#txtUnitPrice'))) {
        $('#txtQtyOnHand').focus();
    }
});

$('#txtQtyOnHand').on('keydown', function (event) {
    if (event.code === "Enter" && check(qtyOnHandPattern, $('#txtQtyOnHand'))) {
        $('#btnSaveItem').focus();
    }
});

$("#txtItemCode,#txtItemName,#txtUnitPrice,#txtQtyOnHand").on('keyup', function () {
    checkValidation(saveItemOptionValidations, $('#btnSaveItem'));
});

$("#txtItemCode,#txtItemName,#txtUnitPrice,#txtQtyOnHand").on('blur', function () {
    checkValidation(saveItemOptionValidations, $('#btnSaveItem'));
});

function check(regEx, textField) {
    return regEx.test(textField.val());
}

function checkValidation(validationArray, button) {
    let errorCounts = 0;
    for (let validation of validationArray) {
        if (validation.regEx.test(validation.textField.val())) {
            removeError(validation.textField, "");
        } else {
            addError(validation.textField, validation.errorMsg);
            errorCounts += 1;
        }
    }
    enableOrDisableBtn(button, errorCounts);
}

/* arguments array stores the values which are send from parameters when calling the removeError() method */
function removeError() {
    arguments[0].css('border', '2px solid green');
    arguments[0].parent().children('span').text(arguments[1]);
}

function addError(textField, errorMessage) {
    if (textField.val().length <= 0) {
        textField.css("border", "1px solid #ced4da");
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '2px solid red');
        textField.parent().children('span').text(errorMessage);
    }
}

function enableOrDisableBtn(button, errorCounts) {
    if (errorCounts > 0) {
        button.attr('disabled', true);
    } else {
        button.attr('disabled', false);
    }
}

/* Validate Update and Delete Item textFields */
let updateAndDeleteItemValidations = [];
updateAndDeleteItemValidations.push({
    regEx: itemCodePattern,
    textField: $('#itemCode'),
    errorMsg: 'Invalid Item Code Pattern : I-001'
});
updateAndDeleteItemValidations.push({
    regEx: itemNamePattern,
    textField: $('#itemName'),
    errorMsg: 'Invalid Item Name Pattern : A-z 0-9 - & 3-45'
});
updateAndDeleteItemValidations.push({
    regEx: unitPricePattern,
    textField: $('#unitPrice'),
    errorMsg: 'Invalid UnitPrice Pattern : 200 or 250.00'
});
updateAndDeleteItemValidations.push({
    regEx: qtyOnHandPattern,
    textField: $('#qtyOnHand'),
    errorMsg: 'Invalid QtyOnHand Pattern : 15 (Only a Number)'
});

/* Focusing the textFields */
$('#itemCode').on('keydown', function (event) {
    if (event.code === "Enter" && check(itemCodePattern, $('#itemCode'))) {
        $('#itemName').focus();
    }
});

$('#itemName').on('keydown', function (event) {
    if (event.code === "Enter" && check(itemNamePattern, $('#itemName'))) {
        $('#unitPrice').focus();
    }
});

$('#unitPrice').on('keydown', function (event) {
    if (event.code === "Enter" && check(unitPricePattern, $('#unitPrice'))) {
        $('#qtyOnHand').focus();
    }
});

$('#qtyOnHand').on('keydown', function (event) {
    if (event.code === "Enter" && check(qtyOnHandPattern, $('#qtyOnHand'))) {
        $('#updated-btn').focus();
    }
});

$("#itemCode,#itemName,#unitPrice,#qtyOnHand").on('keyup', function () {
    checkValidation(updateAndDeleteItemValidations, $('#btnUpdateItem'));
});

$("#itemCode,#itemName,#unitPrice,#qtyOnHand").on('blur', function () {
    checkValidation(updateAndDeleteItemValidations, $('#btnUpdateItem'));
});

$("#btnUpdateItem").attr('disabled', true);
$("#btnDeleteItem").attr('disabled', true);

/* Update Item Function */
$('#btnUpdateItem').click(function (event) {
    let item = searchItem($('#itemCode').val());
    if (item !== null) {
        item.itemCode = $('#itemCode').val();
        item.itemName = $('#itemName').val();
        item.unitPrice = $('#unitPrice').val();
        item.qtyOnHand = $('#qtyOnHand').val();
        Swal.fire(
            'Successfully Updated!',
            'Item has been Updated successfully!',
            'success'
        )
        loadAllItems();
        bindRowClickEvents($('#tblItem > tbody > tr'));
        bindRowDblClickEvents($("#tblItem > tbody > tr"));
        clearItemTextFields();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Item Update was failed..!',
        })
    }
});

$('#txtSearchItem').on('keyup', function () {
    if ($("#cmbSearchItem").val() === "Item Code") {
        if ($("#txtSearchItem").val().length !== 0) {
            if (itemCodePattern.test($('#txtSearchItem').val())) {
                $('#btnDeleteItem').attr('disabled', false);
            } else {
                $('#btnDeleteItem').attr('disabled', true);
            }
        } else {
            $('#btnDeleteItem').attr('disabled', true);
        }
    } else {
        $('#btnDeleteItem').attr('disabled', true);
    }
});

/* Delete Customer Function */
$('#btnDeleteItem').click(function (event) {
    let i1 = searchItem($('#txtSearchItem').val());
    if (i1 != null) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this item!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (deleteItem(i1.itemCode)) {
                    Swal.fire(
                        'Successfully Deleted!',
                        'Item has been Deleted successfully!',
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Item Deletion was failed..!',
                    })
                }
            } else {

            }
        })
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Any Item doesn\'t exist for this Item Code..!',
        })
    }
    $('#delete-btn').attr('disabled', true);
});

function deleteItem(itemCode) {
    let index = -1;
    for (let i = 0; i < items.length; i++) {
        if (items[i].itemCode === itemCode) {
            index = i;
            items.splice(index, 1);
            loadAllItems();
            bindRowClickEvents($('#tblItem > tbody > tr'));
            bindRowDblClickEvents($("#tblItem > tbody > tr"));
            clearItemTextFields();
            return true;
        }
    }
    return false;
}



