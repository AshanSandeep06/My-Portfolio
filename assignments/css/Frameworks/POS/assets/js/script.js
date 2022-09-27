/* Customer Object Array */
var customers = [];

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

        $("#tblCustomer>tbody").empty();

        for (let i = 0; i < customers.length; i++) {
            var tblRow = `<tr><td>${customers[i].id}</td><td>${customers[i].name}</td><td>${customers[i].address}</td><td>${customers[i].salary}</td></tr>`;
            $("#tblCustomer>tbody").append(tblRow);
        }

        // Success alert
        Swal.fire(
            'Successfully saved!',
            'Customer has been saved successfully!',
            'success'
        )

    }else{
        // Error alert
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
});