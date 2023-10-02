$( document ).ready(function() {
    $('.owl-portfolio').owlCarousel({
        nav: true,
        items: 1,
        dots: true,
        loop: false,
        navText: [],
        navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right']
    });


    if( window.matchMedia("(max-width: 991px)").matches ) {

        var slick = $('.carrossel');
        slick.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            infinite: true,
            autoplay: true,
            arrows: false,
            dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        dots: false,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                    }
                },
            ]
        });
    
    }



    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        fade: true,
        centerMode: true,
        focusOnSelect: false,
        prevArrow: '<a class="calendario-control--prev" href="#"><div class="owl-prev fa fa-angle-left"></div></a>',
        nextArrow: '<a class="calendario-control--next" href="#"><div class="owl-next fa fa-angle-right"></div></a>',
    });

    $('#accordion').collapse({
        toggle: false
    })
    

    $('#mailing').modal('show');
});

function clickBusca() {
    document.getElementById("showBusca").classList.add("show");
    document.getElementById("showBusca").removeAttribute("style");
}