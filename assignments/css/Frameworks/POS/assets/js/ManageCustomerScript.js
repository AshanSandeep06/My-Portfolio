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
        clearCustomerFields();

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

/* Search Customer function */
$("#btnSearchCustomer").click(function () {
    if ($("#txtSearchCustomer").val().length !== 0) {
        if ($("#disabledSelect").val() === "ID") {
            var typedId = $("#txtSearchCustomer").val();
            var customer = null;

            for (let i of customers) {
                if (i.id === typedId) {
                    customer = i;
                    break;
                }
            }

            if (customer !== null) {
                setCustomerData(customer);
            } else {
                clearCustomerFields();
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
                clearCustomerFields();
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

function clearCustomerFields() {
    $("#customerID").val('');
    $("#customerName").val('');
    $("#customerAddress").val('');
    $("#customerSalary").val('');
}

$("#btnClear").click(function () {
    clearCustomerFields();
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
$("#tblCustomer > tbody > tr").on('dblclick', function () {

});