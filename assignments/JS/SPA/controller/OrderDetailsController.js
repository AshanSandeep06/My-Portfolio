/* ----------------------------------- Order Details Form ------------------------------------ */

// Reg Ex for Order ID
const orderIdPattern = /^(OID-)[0-9]{3}$/;

// Initially, Search Order button was disabled
$('#btnSearchOrder').attr('disabled', true);

// Validate txtSearchOrder textField
$('#txtSearchOrder').on('keyup', function (event) {
    if ($('#txtSearchOrder').val().length !== 0) {
        if (orderIdPattern.test($('#txtSearchOrder').val())) {
            $('#btnSearchOrder').attr('disabled', false);
            return;
        }
    }
    $('#btnSearchOrder').attr('disabled', true);
});