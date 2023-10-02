$(document).ready(function () {


    $('a').each(function () {
        var link = $(this);
        var urlLink = $(this).attr('href');
        if (typeof link.attr('href') != 'undefined') {
            if ((link.attr('href').indexOf('/Download/') > -1) || (link.attr('href').indexOf('download.aspx') > -1) || (link.attr('href').indexOf('Download.aspx') > -1)) {
                var descricao = link.text().trim();

                if (descricao == '') {
                    descricao = urlLink.split('download.aspx?')[1];
                }

                link.attr("onClick", "gtag('event', 'link', {'event_label': '" + descricao + "'});");
            }
        }
    });

    // Busca
    $(".inputBusca").keypress(function(event) {
        event = event || window.event;

        if (event.keyCode == '13') {
            Buscar();

            event.preventDefault();
        }
    });

    $(".inputBuscaMobile").keypress(function(event) {
        event = event || window.event;

        if (event.keyCode == '13') {
            BuscarMobile();

            event.preventDefault();
        }
    });

    $(".inputOk").click(function() {
        Buscar();
        event.preventDefault();
    });

    $(".inputOkMobile").click(function() {
        BuscarMobile();
        event.preventDefault();
    });

    $('a[href$="Mailling"]').each(function () {
        $(this).attr("data-toggle", "modal");
        $(this).attr("data-target", "#alertasModal");
        $(this).attr('href', '');

    }); 


    $("a:contains('Cadastre-se no Mailing')").each(function () {
        $(this).attr("data-toggle", "modal");
        $(this).attr("data-target", "#alertasModal");
        $(this).attr('href', '');

    });

    if ($('#hdnDefault').val() != "1") {
        $('#tag-institucional').removeClass('tag-home-overflow');
    }



    $('ul.menu li a').each(function () {

        if (location.href.toUpperCase().indexOf(this.href.toUpperCase()) >= 0) {

            $(this).parent().addClass('hover');
        }
    });

    // $('li.hover').each(function () {

        // $(this).parents('.submenu').addClass('hover');
    // });

   


});


function Buscar() {
    var buscada = $(".inputBusca").val().replace(/"/g, "");
    window.location = "ListaBusca.aspx?busca=" + buscada;
}

function BuscarMobile() {
    var buscada = $(".inputBuscaMobile").val().replace(/"/g, "");
    window.location = "ListaBusca.aspx?busca=" + buscada;
}

function Trim(str) { return str.replace(/^\s+|\s+$/g, ""); }

function irParaTopo() { $('html, body').animate({ scrollTop: 0 }, 'slow'); }


//Alertas

function enviaAlerta() {
    Validar();
}

function Validar() {

    if ((document.getElementById('nome_modal').value == "") && ($(".hidLinguagem").val() == "ptg")) {
        alert("É necessário um nome.");
        return false;
    }
    else if (document.getElementById('nome_modal').value == "") {
        alert("Insert a name.");
        return false;
    }

    if ((document.getElementById('email_modal').value == "") && ($(".hidLinguagem").val() == "ptg")) {
        alert("É necessário um email.");
        return false;
    }
    else if (document.getElementById('email_modal').value == "") {
        alert("Insert a email.");
        return false;
    }

    if ((document.getElementById("idCaptcha").value) == "0") {
        alert("Marque a caixa de seleção!");
        return false;
    }

    cadastraContato();
}

function fechaBoxAlerta() {
    $('#fadeModal').hide();
    $('div[class*=modal-backdrop]').hide();
    $('#alertasModal').hide();
}

function limpaModal() {
    $('.form-contato').find('input:text').val('');
    $('.form-contato').find('input:checkbox').prop('checked', false);
    $('.form-contato').find('select').val('0');
    $('.form-alertas').find('input:text').val('');
}


function cadastraContato() {
   
        var mailingPort = 23654;
        var mailingIng = "";
        var mailingEs = "";

        var nomeAlerta = $('#nome_modal').val();
        var emailAlerta = $('#email_modal').val();
        var telefone = $('#controlTelefone').val();
        var empresa = $('#controlEmpresa').val();
        var cargo = $('#controlCargo').val();
        var perfil = $('#controlPerfil').val();
        //var txtCaptcha = $('input[id*=txtCaptcha]').val();

        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (!filter.test(emailAlerta)) {
            if ($(".hidLinguagem").val() == "ptg") {
                alert('E-mail Inválido!');
            }
            else if ($(".hidLinguagem").val() == "eng") {
                alert("Invalid E-mail!");
            }
            return false;
        }

        CallServer("alerta;" + nomeAlerta + ";" + emailAlerta + ";" + telefone + ";" + empresa + ";" + cargo + ";" + perfil + ";" + mailingPort + ";" + mailingIng + ";" + mailingEs);
   

}
// FIM Alertas

function retornoCallback(arg) {
    var args = arg.split(';');

    switch (args[0]) {
        case "impressao":
            {
                executaImpressao(args[1]);
                break;
            }
        case "buscarShow":
            {
                alert(args[1]);
                break;
            }
        case "email":
            {
                if (args[1] == "success") {
                    alert(args[2]);
                    fechaBoxEmail();
                }
                else
                    alert(args[2]);
                break;
            }
        case "novaDescricaoTriResponse":
            exibirNovaDescricao(args[1], args[2]);
            break;
        case "lembreteAgenda":
            var alertagenda = $('input[id$=MsgLembreteAgenda]').val();
            limparCamposAgenda();
            alert(alertagenda);
            break;
        case "paginarResponse":
            efetuarPaginacaoResponse(args[1], args[2]);
            break;
        case "alerta":
            {
                var alertari = $('input[id$=MsgSucessoRi]').val();
                alert(alertari);
                fechaBoxAlerta();
                limpaModal();
                break;
            }
        case "alertaContatoExiste":
            {
                var mensagem = unescape(args[1]);
                eval(mensagem);
                fechaBoxAlerta();
                limpaModal();
                break;
            }
        case "EventosAnteriores":
            {
                carregarEventosAnteriores(args);
                break;
            }
        case "EventosProximos":
            {
                carregarEventosProximos(args);
                break;
            }
        case "paginarcalendarioresponsive":
            {
                montaEventosCalendario(args[1]);
                mostraEventosDoDiaSelecionadoPosMudancaMes();
                break;
            }
        case "captchaIvalido":
            {
                var textoAlerta = $('input[id$=MsgErroCaptcha]').val();
                alert(textoAlerta);
                break;
            }
        default:
            break;
    }
}

function erroCallback(err) {
    alert("erro:" + err);
}