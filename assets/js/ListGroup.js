$(document).ready(function () {
	
    var cont = 0;
    $('a[id*=tituloList]').each(function () {
        $(this).attr('data-target', '#collapse-' + cont);
        $(this).attr('aria-controls', 'collapse-' + cont);
        cont++;
    });

    var cont2 = 0;
    $('div[id*=collapse-]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont2);
        $(this).attr('aria-labelledby', 'heading-' + cont2);
        cont2++;
    });

    var cont3 = 0;
    $('div[id*=heading-]').each(function () {
        var id = $(this).attr('id');
        $(this).attr('id', id + cont3);
        cont3++;
    });

    $('a[class*=idLink]').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).parents('.card').remove();
        }
    });


	$('#recebeAnos .dropdown-item').first().remove();
	$('select[id*=ddlAnoFiltro] option').first().remove()
	var anoMaisRecente = $('select[id*=ddlAnoFiltro] option').first().text();
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
    } else {
		
        $('a#dropdownMenuLink').text(anoMaisRecente);
    }
	

	
	
	
	
	$('span[class*=textoListNormal]').each(function () {
		if($(this).text() == ""){
			$(this).remove();
		}
    });
	
	
});

function efetuarFiltroPorAno(ano) {
    if (ano != "0000") {
        window.location = "ListGroup.aspx?idCanal=" + getIdCanal() + "&ano=" + ano;
    }
    else {
        limpaFiltroPorAno();
    }
    
}

function limpaFiltroPorAno() {
    window.location = "ListGroup.aspx?idCanal=" + getIdCanal();
}

function getIdCanal() {
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}


