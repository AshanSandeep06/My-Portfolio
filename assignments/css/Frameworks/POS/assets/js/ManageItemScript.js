/* -------------------------------- Manage Item Form ------------------------------------*/

/* Item Object Array */
var items = [];

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

        /* Item Object */
        var itemObject = {
            itemCode: itemCode,
            itemName: itemName,
            unitPrice: unitPrice,
            qtyOnHand: qtyOnHand
        }

        /* Newly added item was stored in this array */
        items.push(itemObject);

        $("#tblItem>tbody").empty();

        for (let i = 0; i < items.length; i++) {
            var tblRow = `<tr><td>${items[i].itemCode}</td><td>${items[i].itemName}</td><td>${items[i].unitPrice}</td><td>${items[i].qtyOnHand}</td></tr>`;
            $("#tblItem>tbody").append(tblRow);
        }

        // Success alert
        Swal.fire(
            'Successfully saved!',
            'Item has been saved successfully!',
            'success'
        )

    } else {
        // Error alert
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Something went wrong!',
        })
    }
});

/* ================================================================================== */

/* Search Item function */
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