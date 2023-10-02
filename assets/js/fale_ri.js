$(document).ready(function () {
    $('input[id*=txtTelefone]').setMask("(99)9999 99999");

});

function Limpar() {
    $('#formFaleComRi').find('input:text, textarea, input:password').val('');
}

function ValidaCaptcha() {
    $("#alertasModal").remove();
}








