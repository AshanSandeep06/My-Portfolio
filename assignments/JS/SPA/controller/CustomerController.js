/* -------------------------------- Manage Customer Form ------------------------------------*/

/* Save Customer function */
$("#btnSaveCustomer").click(function () {
    let customerID = "";
    let customerName = "";
    let cusAddress = "";
    let cusSalary = "";

    customerID = $("#txtCustomerID").val();
    customerName = $("#txtCustomerName").val();
    cusAddress = $("#txtAddress").val();
    cusSalary = $("#txtSalary").val();

    /* Check if the customer fields have typed values */
    if (customerID.length !== 0 && customerName.length !== 0 && cusAddress.length !== 0 && cusSalary.length !== 0) {
        if (searchCustomer($('#txtCustomerID').val()) == null) {
            /* Customer Object */
            var cusObj = Object.assign({}, customerObject);
            cusObj['id'] = customerID;
            cusObj["name"] = customerName;
            cusObj['address'] = cusAddress;
            cusObj['salary'] = cusSalary;

            /* Newly added customer was stored in this array */
            customers.push(cusObj);

            // Customer was saved alert
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Customer has been saved successfully..!',
                showConfirmButton: false,
                timer: 1500
            })

            loadAllCustomers();
            clearCustomerModalFields();
            bindRowClickEvents($("#tblCustomer > tbody > tr"));
            bindRowDblClickEvents($("#tblCustomer > tbody > tr"));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'This Customer was already exists by this Customer ID!',
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

//Load all customers function
function loadAllCustomers() {
    $("#tblCustomer>tbody").empty();

    for (let i = 0; i < customers.length; i++) {
        var tblRow = `<tr><td>${customers[i].id}</td><td>${customers[i].name}</td><td>${customers[i].address}</td><td>${customers[i].salary}</td></tr>`;
        $("#tblCustomer>tbody").append(tblRow);
    }
}

function searchCustomer(customerID) {
    for (let c1 of customers) {
        if (c1.id === customerID) {
            return c1;
        }
    }
    return null;
}

/* Search Customer function */
$("#btnSearchCustomer").click(function () {
    if ($("#txtSearchCustomer").val().length !== 0) {
        if ($("#cmbSearchCustomer").val() === "ID") {
            var typedId = $("#txtSearchCustomer").val();
            var customer = null;

            customer = searchCustomer(typedId);

            if (customer !== null) {
                setCustomerData(customer);
            } else {
                clearCustomerTextFields();
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'This customer doesn\'t exist..!',
                })
            }

        } else {
            var typedName = $("#txtSearchCustomer").val();
            customer = null;

            for (let i of customers) {
                if (i.name === typedName) {
                    customer = i;
                    break;
                }
            }

            if (customer !== null) {
                setCustomerData(customer);
            } else {
                clearCustomerTextFields();
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'This customer doesn\'t exist..!',
                })
            }
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Empty field..',
            text: 'Please input customer ID or name',
        })
    }
});

$('#txtSearchCustomer').on('keyup', function (event) {
    if (event.key === "Enter") {
        if ($("#txtSearchCustomer").val().length !== 0) {
            if ($("#cmbSearchCustomer").val() === "ID") {
                var typedId = $("#txtSearchCustomer").val();
                var customer = null;

                customer = searchCustomer(typedId);

                if (customer !== null) {
                    setCustomerData(customer);
                } else {
                    clearCustomerTextFields();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'This customer doesn\'t exist..!',
                    })
                }

            } else {
                var typedName = $("#txtSearchCustomer").val();
                customer = null;

                for (let i of customers) {
                    if (i.name === typedName) {
                        customer = i;
                        break;
                    }
                }

                if (customer !== null) {
                    setCustomerData(customer);
                } else {
                    clearCustomerTextFields();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'This customer doesn\'t exist..!',
                    })
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Empty field..',
                text: 'Please input customer ID or name',
            })
        }
    }
});

/*---------------------------------*/

function setCustomerData(c1) {
    $("#customerID").val(c1.id);
    $("#customerName").val(c1.name);
    $("#customerAddress").val(c1.address);
    $("#customerSalary").val(c1.salary);

    checkValidation(saveCustomerOptionValidations, $('#btnSaveCustomer'));
    checkValidation(updateAndDeleteCustomerValidations, $('#btnUpdateCustomer'));
}

function clearCustomerTextFields() {
    $("#customerID").val('');
    $("#customerName").val('');
    $("#customerAddress").val('');
    $("#customerSalary").val('');
    $('#customerID,#customerName,#customerAddress,#customerSalary').css("border", "1px solid #ced4da");
    $('#btnUpdateCustomer').attr('disabled', true);
}

function clearCustomerModalFields() {
    $("#txtCustomerID").val('');
    $("#txtCustomerName").val('');
    $("#txtAddress").val('');
    $("#txtSalary").val('');
    $("#txtCustomerID").focus();
    $('#txtCustomerID,#txtCustomerName,#txtAddress,#txtSalary').css("border", "1px solid #ced4da");
    $('#txtCustomerID,#txtCustomerName,#txtAddress,#txtSalary').parent().children('span').text("");
    $('#btnSaveCustomer').attr('disabled', true);
}

$("#btnClearCustomer").click(function () {
    clearCustomerTextFields();
});

$("#btnSearchCustomerClear").click(function () {
    $("#txtSearchCustomer").val('');
});

/* set customer data to the fields when hover table row */
function bindRowClickEvents(tableRow) {
    tableRow.on('click', function (event) {
        if (tableRow.parent().parent().attr('id') === "tblCustomer") {
            var cusObject = Object.assign({}, customerObject);
            cusObject['id'] = $(this).children(":eq(0)").text();
            cusObject["name"] = $(this).children(":eq(1)").text();
            cusObject['address'] = $(this).children(":eq(2)").text();
            cusObject['salary'] = $(this).children(":eq(3)").text();
            setCustomerData(cusObject);
        } else {
            var itemObj = Object.assign({}, itemObject);
            itemObj['itemCode'] = $(this).children(":eq(0)").text();
            itemObj["itemName"] = $(this).children(":eq(1)").text();
            itemObj['unitPrice'] = $(this).children(":eq(2)").text();
            itemObj['qtyOnHand'] = $(this).children(":eq(3)").text();
            setItemData(itemObj);
        }
    });
}

/* Deleted the clicked table row if the row is double clicked function */
function bindRowDblClickEvents(tblRow) {
    tblRow.on('dblclick', function () {
        $(this).remove();
    });
}

/* Clear button in Modal */
$('#btnClearCustomerFields').on('click', function () {
    clearCustomerModalFields();
});

/* Disable Tab Key focus */
$('.prevent_tab_key_focus').on('keydown', function (event) {
    if (event.code === "Tab") {
        event.preventDefault();
    }
});

$("#txtCustomerID").focus();
$("#btnSaveCustomer").attr('disabled', true);

/* Regex Patterns */
const idPattern = /^(C00-)[0-9]{3}$/;
const namePattern = /^[A-z ]{5,20}$/;
const addressPattern = /^[0-9/A-z. ,]{7,}$/;
const salaryPattern = /^[0-9]{1,}([.][0-9]{2})?$/;

/* Validate save Customer textFields */
let saveCustomerOptionValidations = [];
saveCustomerOptionValidations.push({
    regEx: idPattern,
    textField: $('#txtCustomerID'),
    errorMsg: 'Invalid Customer ID Pattern : C00-001'
});
saveCustomerOptionValidations.push({
    regEx: namePattern,
    textField: $('#txtCustomerName'),
    errorMsg: 'Invalid Customer Name Pattern : A-z 5-20'
});
saveCustomerOptionValidations.push({
    regEx: addressPattern,
    textField: $('#txtAddress'),
    errorMsg: 'Invalid Customer Address Pattern : A-z 0-9 ,/'
});
saveCustomerOptionValidations.push({
    regEx: salaryPattern,
    textField: $('#txtSalary'),
    errorMsg: 'Invalid Customer Salary Pattern : 250 or 250.00'
});

/* Focusing the textFields */
$('#txtCustomerID').on('keydown', function (event) {
    if (event.code === "Enter" && check(idPattern, $('#txtCustomerID'))) {
        $('#txtCustomerName').focus();
    }
});

$('#txtCustomerName').on('keydown', function (event) {
    if (event.code === "Enter" && check(namePattern, $('#txtCustomerName'))) {
        $('#txtAddress').focus();
    }
});

$('#txtAddress').on('keydown', function (event) {
    if (event.code === "Enter" && check(addressPattern, $('#txtAddress'))) {
        $('#txtSalary').focus();
    }
});

$('#txtSalary').on('keydown', function (event) {
    if (event.code === "Enter" && check(salaryPattern, $('#txtSalary'))) {
        $('#btnSaveCustomer').focus();
    }
});

$("#txtCustomerID,#txtCustomerName,#txtAddress,#txtSalary").on('keyup', function () {
    checkValidation(saveCustomerOptionValidations, $('#btnSaveCustomer'));
});

$("#txtCustomerID,#txtCustomerName,#txtAddress,#txtSalary").on('blur', function () {
    checkValidation(saveCustomerOptionValidations, $('#btnSaveCustomer'));
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

/* Validate Update and Delete Customer textFields */
let updateAndDeleteCustomerValidations = [];
updateAndDeleteCustomerValidations.push({
    regEx: idPattern,
    textField: $('#customerID'),
    errorMsg: 'Invalid Customer ID Pattern : C00-001'
});
updateAndDeleteCustomerValidations.push({
    regEx: namePattern,
    textField: $('#customerName'),
    errorMsg: 'Invalid Customer Name Pattern : A-z 5-20'
});
updateAndDeleteCustomerValidations.push({
    regEx: addressPattern,
    textField: $('#customerAddress'),
    errorMsg: 'Invalid Customer Address Pattern : A-z 0-9 ,/'
});
updateAndDeleteCustomerValidations.push({
    regEx: salaryPattern,
    textField: $('#customerSalary'),
    errorMsg: 'Invalid Customer Salary Pattern : 250 or 250.00'
});

/* Focusing the textFields */
$('#customerID').on('keydown', function (event) {
    if (event.code === "Enter" && check(idPattern, $('#customerID'))) {
        $('#customerName').focus();
    }
});

$('#customerName').on('keydown', function (event) {
    if (event.code === "Enter" && check(namePattern, $('#customerName'))) {
        $('#customerAddress').focus();
    }
});

$('#customerAddress').on('keydown', function (event) {
    if (event.code === "Enter" && check(addressPattern, $('#customerAddress'))) {
        $('#customerSalary').focus();
    }
});

$('#customerSalary').on('keydown', function (event) {
    if (event.code === "Enter" && check(salaryPattern, $('#customerSalary'))) {
        $('#btnUpdateCustomer').focus();
    }
});

$("#customerID,#customerName,#customerAddress,#customerSalary").on('keyup', function () {
    checkValidation(updateAndDeleteCustomerValidations, $('#btnUpdateCustomer'));
});

$("#customerID,#customerName,#customerAddress,#customerSalary").on('blur', function () {
    checkValidation(updateAndDeleteCustomerValidations, $('#btnUpdateCustomer'));
});

$("#btnUpdateCustomer").attr('disabled', true);
$("#btnDeleteCustomer").attr('disabled', true);

/* Update Customer Function */
$('#btnUpdateCustomer').click(function (event) {
    let customer = searchCustomer($('#customerID').val());
    if (customer !== null) {
        customer.id = $('#customerID').val();
        customer.name = $('#customerName').val();
        customer.address = $('#customerAddress').val();
        customer.salary = $('#customerSalary').val();
        Swal.fire(
            'Successfully Updated!',
            'Customer has been Updated successfully!',
            'success'
        )
        loadAllCustomers();
        bindRowClickEvents($('#tblCustomer > tbody > tr'));
        bindRowDblClickEvents($("#tblCustomer > tbody > tr"));
        clearCustomerTextFields();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Customer Update was failed..!',
        })
    }
});

$('#txtSearchCustomer').on('keyup', function () {
    if ($("#cmbSearchCustomer").val() === "ID") {
        if ($("#txtSearchCustomer").val().length !== 0) {
            if (idPattern.test($('#txtSearchCustomer').val())) {
                $('#btnDeleteCustomer').attr('disabled', false);
            } else {
                $('#btnDeleteCustomer').attr('disabled', true);
            }
        } else {
            $('#btnDeleteCustomer').attr('disabled', true);
        }
    } else {
        $('#btnDeleteCustomer').attr('disabled', true);
    }
});

/* Delete Customer Function */
$('#btnDeleteCustomer').click(function (event) {
    let c1 = searchCustomer($('#txtSearchCustomer').val());
    if (c1 != null) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this customer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (deleteCustomer(c1.id)) {
                    Swal.fire(
                        'Successfully Deleted!',
                        'Customer has been Deleted successfully!',
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Customer Deletion was failed..!',
                    })
                }
            } else {

            }
        })
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Any Customer doesn\'t exist for this Customer ID..!',
        })
    }
    $('#btnDeleteCustomer').attr('disabled', true);
});

function deleteCustomer(customerID) {
    let index = -1;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].id === customerID) {
            index = i;
            customers.splice(index, 1);
            loadAllCustomers();
            bindRowClickEvents($('#tblCustomer > tbody > tr'));
            bindRowDblClickEvents($("#tblCustomer > tbody > tr"));
            clearCustomerTextFields();
            return true;
        }
    }
    return false;
}
