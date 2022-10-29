/* ----------------------------------- Order Details Form ------------------------------------ */

// Reg Ex for Order ID
const orderIdPattern = /^(OID-)[0-9]{3}$/;

// Initially, Search Order button was disabled
$('#btnSearchOrder').attr('disabled', true);

// Spans for validations will display: hidden, until that related textField's values are invalid
$('#searchOrderSpan').css('display', "none");

// Validate txtSearchOrder textField
$('#txtSearchOrder').on('keyup', function (event) {
    if ($('#txtSearchOrder').val().length !== 0) {
        if (orderIdPattern.test($('#txtSearchOrder').val())) {
            $('#btnSearchOrder').attr('disabled', false);
            $('#searchOrderSpan').css('display', 'none');
            $('#txtSearchOrder').css("border", "1px solid rgb(206, 212, 218)");
        } else {
            $('#btnSearchOrder').attr('disabled', true);
            $('#searchOrderSpan').css('display', 'block');
            $('#txtSearchOrder').css("border", "2px solid red");
        }
    } else {
        $('#btnSearchOrder').attr('disabled', true);
        $('#searchOrderSpan').css('display', 'none');
        $('#txtSearchOrder').css("border", "1px solid rgb(206, 212, 218)");
    }
});