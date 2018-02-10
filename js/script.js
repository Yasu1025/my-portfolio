// Global var

var winWidth = $(window).width();
var smartPhoneWidth = 459;
var tabletWidth = 959;

var headerHeight = $("header").height();
var defaultWidth = winWidth <= smartPhoneWidth ? "100vw" : "calc(100vw - 12vmax)";
//var defaulHeight = winWidth <= smartPhoneWidth ? "calc(100vh - 10vmax)" : "calc(100vh - 10vmax)";
var defaulHeight = "100%";

var current = 0;
var slideWidth = $('.slide').outerWidth();
var slideNum = $('.slide').length;
var allSlideWidth = slideWidth * slideNum;


$(document).ready(function(){
    
    WindowResize();
    ShowCloseBtn();
    // SlideNavi();
    navArrowshowHide();
    Slider();
    FlickSlider();
    SlideFromRight();
    CloseWork();

    ToonSlide('.vfw');
    ToonSlide('.bungobox');
    ToonSlide('.milleniax');
    

    $('.down_arrow').click(function(){
        $("html, body").animate({scrollTop:$(".work_contents").offset().top}, 1000)
    })
    
});



function WindowResize(){
    $(window).resize(function(){
        winWidth = $(window).width();
        defaultWidth = winWidth <= smartPhoneWidth ? "100vw" : "calc(100vw - 12vmax)";
        defaulHeight = "calc(100vh - 10vmax)";
        slideWidth = $('.slide').outerWidth();
        allSlideWidth = slideWidth * slideNum;

        if(!$('.work_body').length){ 
            $('.slide_container,  .slide').css({'width': defaultWidth, "height": defaulHeight})
        }
        $('.slideset').css({"width": allSlideWidth});
        
    })
}




    $('head').append(
        '<style type="text/css">#main_wrapper { display: none; } #for_loading, .spinner { display: block; }</style>'
    );
    jQuery.event.add(window,"load",function(){
        $("#for_loading").delay(900).fadeOut(800);
        $(".spinner").delay(600).fadeOut(300);
        $("#main_wrapper").css("display", "block");
    })



    function Slider(){

        // var activeSlide = $("#slide_nav > ul > li").eq(current);
        // activeSlide.addClass("active");
       
        WindowResize();

        $('.slideset').css({"width": allSlideWidth})


    var Sliding = function(){
            if(current < 0){
                current = slideNum -1;
                // activeSlide.addClass("active");
            }else if(current > slideNum -1){
                current = 0;
                // activeSlide = $("#slide_nav > ul > li").eq(current);
                // activeSlide.addClass("active");
                navArrowshowHide();
            }
            $('.slideset').stop().fadeIn(300).animate({
                'left': current * -slideWidth
            });
            
        }

    var GoNext = function(){
            // activeSlide.removeClass("active");
            current++;
            // activeSlide = $("#slide_nav > ul > li").eq(current);
            navArrowshowHide();
            // activeSlide.addClass("active");
            Sliding();
    }

    var GoPrev = function(){
            // activeSlide.removeClass("active");
            current--;
            // activeSlide = $("#slide_nav > ul > li").eq(current);
            navArrowshowHide();
            // activeSlide.addClass("active");
            Sliding();
    }

        $('.home_arrow_prev').click(function(){
            GoPrev();
        })
        $('.home_arrow_next').click(function(){
            GoNext();
        })

        // Flick

        $('.slide').bind('touchstart', function(e) {
            startX = e.changedTouches[0].pageX;//the point X when you start Flick
        });
        $('.slide').bind('touchmove', function(e) {
            endX = e.changedTouches[0].pageX;//The point X when you end Flick
            diffX = Math.round(startX - endX);//point X (start - end)
        });


        $('.slide').bind('touchend', function(e) {
        if (diffX > 100) {
            GoNext();
            startX = 0;
            endX = 0;
            diffX = 0;
        } else if (diffX < -100) {
            GoPrev();
            startX = 0;
            endX = 0;
            diffX = 0;
        };
        })

        // Keybord -> and <-
        
        $('html').keyup(function(e){
            if(!$('article').hasClass("work_body")){
            switch(e.which){
                case 39: // ->
                    GoNext();
                    break;
                case 37: // <-
                    if(current !== 0){
                        GoPrev();
                    }
                    break;
            }
            }   
        })
    }

    function FlickSlider(){
        
    }

    function ToonSlide(targetSlide){

        var fileName = "pages/"+targetSlide.slice(1)+".html";
        

        var LoadWork = function(fileName){
            $('.work_contents').hide();
            $('.work_contents').addClass("work_container");
            $('.work_contents').load(fileName);
            $('.work_contents'). fadeIn(500);
        }
            $(document).on('click',targetSlide ,function(e){
                
                h = $(window).height() - headerHeight;
                $(this).addClass("active_slide prevent_click");
                $(".down_arrow").fadeIn(1000);
                $('.slide').not(this).hide();
                $(".slideset").css({"left": 0});
                
                $('#work_wrapper').animate({
                    "width":"100%",
                    "height":$(window).height()-headerHeight, 
                    "margin": 0
                    }, 500);
                
                $('.slide_container,  .slideset, .slide').animate({"width": "100vw", "height":h}, 500, function(){
                    $('#work_wrapper').animate({"height": "100%"},500)
                    LoadWork(fileName);
                    
                });
                
                $(this).animate({"width": "100vw", "height":h}, 800);
                $('.page_navs').hide();
            });
    }

    function ShowCloseBtn(){
        var btn = $('.close_work');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                btn.fadeIn();
            } else {
                btn.fadeOut();
            }
        });
    }


    function CloseWork(){
        defaultWidth = winWidth <= smartPhoneWidth ? "100vw" : "calc(100vw - 12vmax)";
        defaulHeight = winWidth <= smartPhoneWidth ? "calc(100vh - 10vmax)" : "calc(100vh - 10vmax)";

        slideWidth = $('.slide').outerWidth();
        slideNum = $('.slide').length;
        allSlideWidth = slideWidth * slideNum;

        

       
        $(document).on('click', '.close_btn', function(e){
            $('#for_loading').fadeIn(500, function(){
                defaultHead();
                WindowResize()
            });
            $('#for_loading').fadeOut(800);
        } )
    }


    function defaultHead(){
        $('.slide').show();
        $(".slideset").css({"left": 0});
        $('.slide, .slide_container,  .slideset').css({"width": defaultWidth, "height":defaulHeight})
        $('.work_contents').show();
        $(".down_arrow").hide();
        $('.close_work').hide();
        $('.work_contents').removeClass("work_container");
        $('.slide').removeClass('active_slide prevent_click');
        //$(".slide01").css({"width": originalWidth, "height":originalheight});
        $('.page_navs').show();
        $('.work_contents').empty();
        slideWidth = $('.slide').outerWidth();
        $('.slideset').css({
            'left': current * -slideWidth
        });
        $('#work_wrapper').css({"width":defaultWidth, "margin":"0 auto"});
        
        allSlideWidth = slideWidth * slideNum;
        $('.slideset').css({"width": allSlideWidth});
    }

    function SlideFromRight(){
        var flag = false;
        var w;
        var h;

        $('#about_page').css({"right": -$(window).width()});

        WindowResize();

        $(window).resize(function(){
            w = $(window).width();
            h = "100vh" - headerHeight;
            $('#about_page, #about_me').css({"width": w, "height": h});
            if(flag){
                $('#about_page').css({"right": 0});
            }else{
                $('#about_page').css({"right": -$(window).width()});
            }
        })

        $(document).on('click','#about_open',function(e){
            $('#about_page').show();
            $(this).addClass("prevent_click");
            flag = true;
                // PreventScroll();
            w = $(window).width();
            h = "100vh" - headerHeight;
            $('#about_page, #about_me').css({"width": w, "height": h+"30px"});
            $('#about_page').load('pages/about.html');  
            
            $('#about_page').stop().animate({"right": 0}, 800, function(){
                $("#about_me").fadeIn(500);
                defaultHead();
                WindowResize();
            });
            $('#about_open').addClass("active");
            $('#work_open').removeClass("active");
            $('.page_navs').hide();       
            
        });

        $(document).on('click','#work_open, .close_about',function(){
            $("#about_open").removeClass("prevent_click");
            flag = false;
            // $(".test").fadeOut(500).queue(function(){
            //     $('#about_page').stop().animate({"right": -$(window).width()}, 500);
            // })
            $("#about_me").fadeOut(300)
            $('#about_page').stop().animate({"right": -$(window).width()}, 500, function(){
                $('#about_page').hide();
                AllowScroll();
            });
            $('#about_open').removeClass("active");
            $('#work_open').addClass("active");
            if(!$('article').hasClass('work_body')){
                $('.page_navs').show();
            }
            
        })
            
    }

    // function SlideNavi(){
    //         for(var i = 0; slideNum > i; i++){
    //             $("#slide_nav > ul").append('<li><i class="fa fa-circle"></i></li>');
    //         }            
    // }
    function navArrowshowHide(){
        if(current === 0){
            $('.home_arrow_prev').hide();
        }else{
            $('.home_arrow_prev').show();
        }
    }

    function PreventScroll(){
        var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        $(document).on(scroll_event,function(e){e.preventDefault();});
        //for SP
        $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
    }

    function AllowScroll(){
        var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        $(document).off(scroll_event);
        //for SP
        $(document).off('.noScroll');
        }


    
