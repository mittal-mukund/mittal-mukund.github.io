$(document).ready(function () {
    "use strict";

    /*======== preloader js ============*/
    $(window).load(function(){
        $('#loading-area').delay('500').fadeOut(2000);
    });

    /* ======= Back to Top Button ======= */
    $(document).on('click', '#scroll-top', function () {
        $('html').animate({scrollTop:0},1000);
    });

    var scrollButton = $('#scroll-top');

    $(window).on('scroll', function () {

        //back to top button control
        if($(this).scrollTop()>= 300){
            scrollButton.show();
        }else{
            scrollButton.hide();
        }
    });


    /*======== menu-trigger control ============*/
    $(document).on('click', '.menu-trigger', function () {
        $('.off-canvas-menu').addClass('active');
        $('.demo-body-overlay').addClass('active');
    });

    /*======== menu-trigger-close demo-body-overlay ============*/
    $(document).on('click', '.menu-trigger-close, .demo-body-overlay', function () {
        $('.off-canvas-menu').removeClass('active');
        $('.demo-body-overlay').removeClass('active');
    });


    /*======== panel-open ============*/
    $(document).on('click', '.panel-open', function () {
        $('.theme-panel').toggleClass('active');
    });

    /*====  accordion style  =====*/
    $(document).on('click', '.off-canvas-menu ul li a', function(){

        if(false == $(this).next().is(':visible')) {
            $('.off-canvas-menu ul li ul.off-canvas-dropdown').slideUp(200);
        }
        $(this).next().slideToggle(200);
    });
});