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