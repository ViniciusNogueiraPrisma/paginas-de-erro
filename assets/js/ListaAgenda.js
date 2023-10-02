$(document).ready(function () {


    var i = 0;
    var months = new Array();

    $('div.calendarioEventos').each(function () {
        var divAgenda = $(this).find('.divAgenda');
        var month = $(this).find('.event-title').text();

        if ($.inArray(month, months) == -1) {
            months.push(month);
            $(this).attr('id', 'div' + i);
            i++;
            return;
        }
        else {
            divAgenda.remove();
            var div = $(this).find('.divEvento');
            var mainDiv = $("#div" + (i - 1));
            mainDiv.append(div);
            $(this).remove();
        }
    });

    
    $('div.calendarioEventos .divAgenda .anoAgenda').each(function () {
        var mes = $(this).html();
        $(this).parents('#page-calendario-interno').find('#mesesAgenda').append(mes);      
    });


    //exportat google
    $('.card--body--exportar--gmail').each(function () {
        var link = this.href;
        var splited = link.split('&dates=');
        this.href = splited[0] + '&dates=' + splited[1].replace(/\:/g, '');
    });

    //$('.calendarioEventos').each(function () {
    //    var div = $(this).text().trim();

    //    if (div == "") {
    //        $(this).parent().remove();
    //    }
    //});
});

function ExportarOutlook(titulo, descricao, cidade, datainicio, datafim) {
    var calSingle = new ics();
    calSingle.addEvent(titulo, descricao, cidade, datainicio, datafim);
    calSingle.download(titulo);
}
