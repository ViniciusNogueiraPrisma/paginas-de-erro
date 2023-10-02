function efetuarFiltroPorAno(ano) {

    if (ano != "0000") {
        window.location = "List.aspx?idCanal=" + getIdCanal() + "&ano=" + ano;
    }
    else {        
        limpaFiltroPorAno();
        
    }
   
}

function limpaFiltroPorAno() {
    window.location = "List.aspx?idCanal=" + getIdCanal();
    
}

function getIdCanal() {
    var strReturn = "";
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}

$(document).ready(function () {

    $('select[id*=ddlAnoFiltro] option').each(function () {
        var value = $(this).attr('value');
        if (value == "Todos os Anos") {
            var a = ('<a class="dropdown-item" href="javascript:void(0);" onclick="efetuarFiltroPorAno(0000)">' + value + '</a>');
        } else {
            var a = ('<a class="dropdown-item" href="javascript:void(0);" onclick="efetuarFiltroPorAno(' + value + ')">' + value + '</a>');
        }


        $('#recebeAnos').append(a);

    });

    $('select[id*=ddlAnoFiltro]').remove();

    var url = window.location.search;

    var anoUrl = url.split('ano=')[1];

  

    if (anoUrl !== undefined) {

        $('a#dropdownMenuLink').text(anoUrl);
    } else  {
        $('a#dropdownMenuLink').text('Todos os Anos');
    }
    

});

