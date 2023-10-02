$(document).ready(function () {

    // Paginação
    $('a.navMarcada').addClass('active');
    $('a#lnkNumeracao').addClass('pagination-link');


});
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}


function filtrarAno() {
    var ano = $('select[id$=ddlAnoFiltro]').val();
    ano = parseInt(ano);
    if (!isNaN(ano)) {
        efetuarFiltroPorAno(ano);
    }
    else {
        limpaFiltroPorAno();
    }
}


