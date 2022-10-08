/* -------------------------------- Manage Customer Form ------------------------------------*/

/* Customer Object Array */
var customers = [];

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
            var customerObject = {
                id: customerID,
                name: customerName,
                address: cusAddress,
                salary: cusSalary
            }

            /* Newly added customer was stored in this array */
            customers.push(customerObject);

            // Customer was saved alert
            Swal.fire(
                'Successfully saved!',
                'Customer has been saved successfully!',
                'success'
            )

            loadAllCustomers();
            bindRowClickEvents();
            clearModalFields();
            bindRowDblClickEvents();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Customer was already exists!',
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
        if ($("#disabledSelect").val() === "ID") {
            var typedId = $("#txtSearchCustomer").val();
            var customer = null;

            customer = searchCustomer(typedId);

            if (customer !== null) {
                setCustomerData(customer);
            } else {
                clearTextFields();
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
                clearTextFields();
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

function setCustomerData(c1) {
    $("#customerID").val(c1.id);
    $("#customerName").val(c1.name);
    $("#customerAddress").val(c1.address);
    $("#customerSalary").val(c1.salary);
}

function clearTextFields() {
    $("#customerID").val('');
    $("#customerName").val('');
    $("#customerAddress").val('');
    $("#customerSalary").val('');
}

function clearModalFields() {
    $("#txtCustomerID").val('');
    $("#txtCustomerName").val('');
    $("#txtAddress").val('');
    $("#txtSalary").val('');
    $("#txtCustomerID").focus();
    $('#txtCustomerID,#txtCustomerName,#txtAddress,#txtSalary').css("border", "1px solid #ced4da");
    $('#txtCustomerID,#txtCustomerName,#txtAddress,#txtSalary').parent().children('span').text("");
}

$("#btnClear").click(function () {
    clearTextFields();
});

$("#btnSearchCustomerClear").click(function () {
    $("#txtSearchCustomer").val('');
});

/* set customer data to the fields when hover table row */
function bindRowClickEvents() {
    $('#tblCustomer > tbody > tr').on('click', function (event) {
        var cusObject = {
            "id": $(this).children(":eq(0)").text(),
            "name": $(this).children(":eq(1)").text(),
            "address": $(this).children(":eq(2)").text(),
            "salary": $(this).children(":eq(3)").text()
        };

        setCustomerData(cusObject);
    });
}

/* Deleted the clicked table row if the row is double clicked function */
function bindRowDblClickEvents() {
    $("#tblCustomer > tbody > tr").on('dblclick', function () {
        $(this).remove();
    });
}

/* Clear button in Modal */
$('#btnClearFields').on('click', function () {
    clearModalFields();
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

/* Focusing the textfields */
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
    checkValidation(saveCustomerOptionValidations);
});

$("#txtCustomerID,#txtCustomerName,#txtAddress,#txtSalary").on('blur', function () {
    checkValidation(saveCustomerOptionValidations);
});

function check(regEx, textField) {
    return regEx.test(textField.val());
}

function checkValidation(validationArray) {
    let errorCounts = 0;
    for (let validation of validationArray) {
        if (validation.regEx.test(validation.textField.val())) {
            removeError(validation.textField, "");
        } else {
            addError(validation.textField, validation.errorMsg);
            errorCounts += 1;
        }
    }
    enableOrDisableSaveCustomerBtn(errorCounts);
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

function enableOrDisableSaveCustomerBtn(errorCounts) {
    if (errorCounts > 0) {
        $('#btnSaveCustomer').attr('disabled', true);
    } else {
        $('#btnSaveCustomer').attr('disabled', false);
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

/* Focusing the textfields */
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
    checkValidation(updateAndDeleteCustomerValidations);
});

$("#customerID,#customerName,#customerAddress,#customerSalary").on('blur', function () {
    checkValidation(updateAndDeleteCustomerValidations);
});