/* ----------------------------------- Order Details Form ------------------------------------ */

// Reg Ex for Order ID
const orderIdPattern = /^(OID-)[0-9]{3}$/;

// Initially, Search Order button was disabled
$('#btnSearchOrder').attr('disabled', true);

// Spans for validations will display: hidden, until that related textField's values are invalid
$('#searchOrderSpan').css('display', "none");

// Validate txtSearchOrder textField
$('#txtSearchOrder').on('keyup', function () {
    if ($('#txtSearchOrder').val().length !== 0) {
        if (orderIdPattern.test($('#txtSearchOrder').val())) {
            $('#btnSearchOrder').attr('disabled', false);
            $('#searchOrderSpan').css('display', 'none');
            $('#txtSearchOrder').css("border", "1px solid rgb(206, 212, 218)");
        } else {
            $('#btnSearchOrder').attr('disabled', true);
            $('#searchOrderSpan').css('display', 'block');
            $('#txtSearchOrder').css("border", "2px solid red");
            clearOrderData();
            clearOrderDetailsData();
        }
    } else {
        $('#btnSearchOrder').attr('disabled', true);
        $('#searchOrderSpan').css('display', 'none');
        $('#txtSearchOrder').css("border", "1px solid rgb(206, 212, 218)");
        clearOrderData();
        clearOrderDetailsData();
    }
});

function setOrderData(order) {
    $('#od_txtOrderID').val(order.orderId);
    $('#od_txtOrderDate').val(order.orderDate);
    $('#od_txtCustomerID').val(order.cusId);
    $('#od_txtTotalCost').val(order.totalCost);
    $('#od_txtDiscount').val(order.discount);
}

function clearOrderData() {
    $('#od_txtOrderID').val('');
    $('#od_txtOrderDate').val('');
    $('#od_txtCustomerID').val('');
    $('#od_txtTotalCost').val('');
    $('#od_txtDiscount').val('');
}

function searchOrder() {
    for (let order of orders) {
        if ($('#txtSearchOrder').val() === order.orderId) {
            setOrderData(order);
            searchOrderDetails();
            return true;
        } else {
            clearOrderData();
            clearOrderDetailsData();
        }
    }
    return false;
}

function searchOrderDetails() {
    var orderDetailsArray = [];
    for (let orderDetail of orderDetails) {
        if ($('#txtSearchOrder').val() === orderDetail.orderId) {
            orderDetailsArray.push(orderDetail);
        }
    }
    loadAllOrderDetails(orderDetailsArray);
}

function loadAllOrderDetails(orderDetailsArray) {
    clearOrderDetailsData();

    for (let i = 0; i < orderDetailsArray.length; i++) {
        var tblRow = `<tr><td>${orderDetailsArray[i].orderId}</td><td>${orderDetailsArray[i].cusId}</td>
        <td>${orderDetailsArray[i].itemCode}</td><td>${orderDetailsArray[i].quantity}</td>
        <td>${orderDetailsArray[i].total}</td></tr>`;

        $("#tblOrderDetails>tbody").append(tblRow);
    }
}

function clearOrderDetailsData() {
    $('#tblOrderDetails>tbody').empty();
}

function checkOrder() {
    if (searchOrder() === false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is no Orders exists for this Order ID!'
        })
    }
}

$('#btnSearchOrder').click(function () {
    checkOrder();
});

$('#txtSearchOrder').on('keydown', function (event) {
    if (event.key === "Enter") {
        $('#btnSearchOrder').get(0).focus();
    }
});

$('#btnSearchOrderClear').on('click', function () {
    $('#txtSearchOrder').css("border", "1px solid rgb(206, 212, 218)");
    $('#searchOrderSpan').css('display', "none");
    $('#txtSearchOrder').val('');
    clearOrderData();
    clearOrderDetailsData();
});
