// Global var

var winWidth = $(window).width();
var smartPhoneWidth = 600;
var tabletWidth = 959;

var headerHeight = $("header").height();
var footerHeight = $(".home_page_nav").height();
var defaultWidth = winWidth <= smartPhoneWidth ? "100vw" : "calc(100vw - 12vmax)";
var defaulHeight = winWidth <= smartPhoneWidth ? "100vh" : "calc(100vh - 10vmax)";

var current = 0;
var slideWidth = $('.slide').outerWidth();
var slideNum = $('.slide').length;
var allSlideWidth = slideWidth * slideNum;


$(document).ready(function(){
    WindowResize();
    SlideNavi();
    navArrowshowHide();
    Slider();
    SlideFromRight();
    CloseWork();

    ToonSlide('.vfw');
    ToonSlide('.bungobox');
    ToonSlide('.milleniax');
        // $('.work_contents').load('pages/work.html')
    
});



function WindowResize(){
    $(window).resize(function(){
        winWidth = $(window).width();
        defaultWidth = winWidth <= smartPhoneWidth ? "100vw" : "calc(100vw - 12vmax)";
        defaulHeight = winWidth <= smartPhoneWidth ? "100vh" : "calc(100vh - 10vmax)";
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

        var activeSlide = $("#slide_nav > ul > li").eq(current);
        activeSlide.addClass("active");
       
        WindowResize();

        $('.slideset').css({"width": allSlideWidth})


        var Sliding = function(){
            if(current < 0){
                current = slideNum -1;
                activeSlide.addClass("active");
            }else if(current > slideNum -1){
                current = 0;
                activeSlide = $("#slide_nav > ul > li").eq(current);
                activeSlide.addClass("active");
                navArrowshowHide();
            }
            $('.slideset').stop().animate({
                'left': current * -slideWidth
            });
        }

        var GoNext = function(){
            activeSlide.removeClass("active");
            current++;
            activeSlide = $("#slide_nav > ul > li").eq(current);
            navArrowshowHide();
            activeSlide.addClass("active");
            Sliding();
        }

        var GoPrev = function(){
            activeSlide.removeClass("active");
            current--;
            activeSlide = $("#slide_nav > ul > li").eq(current);
            navArrowshowHide();
            activeSlide.addClass("active");
            Sliding();
        }

        $('.home_arrow_prev').click(function(){
            GoPrev();
        })
        $('.home_arrow_next').click(function(){
            GoNext();
        })

        
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

    function ToonSlide(targetSlide){
        var h = "90vh"
        var fileName = "pages/"+targetSlide.slice(1)+".html";

        var LoadWork = function(fileName){
            $('.work_contents').hide();
            $('.work_contents').addClass("work_container");
            $('.work_contents').load(fileName);
            $('.work_contents'). fadeIn(500);
        }
            $(document).on('click',targetSlide ,function(e){
                $(this).addClass("active_slide prevent_click");
                $('.slide').not(this).hide();
                $(".slideset").css({"left": 0});
                    $('.slide_container,  .slideset, .slide').animate({"width": "100vw", "height":h}, 500, function(){
                        LoadWork(fileName);
                    });
                
                $(this).animate({"width": "100vw", "height":h}, 800);
                $('footer').hide();

            });
        
    }

    function CloseWork(){
        defaultWidth = winWidth <= smartPhoneWidth ? "100vw" : "calc(100vw - 12vmax)";
        defaulHeight = winWidth <= smartPhoneWidth ? "100vh" : "calc(100vh - 10vmax)";
        
        slideWidth = $('.slide').outerWidth();
        slideNum = $('.slide').length;
        allSlideWidth = slideWidth * slideNum;

        var defaultHead = function(){
            $('.slide').show();
            $(".slideset").css({"left": 0});
            $('.slide, .slide_container,  .slideset').css({"width": defaultWidth, "height":defaulHeight})
            $('.work_contents').show();
            $('.work_contents').removeClass("work_container");
            $('.slide').removeClass('active_slide prevent_click');
            //$(".slide01").css({"width": originalWidth, "height":originalheight});
            $('footer').show();
            $('.work_contents').empty();
            $('.slideset').css({
                'left': current * -slideWidth
            });
            slideWidth = $('.slide').outerWidth();
            allSlideWidth = slideWidth * slideNum;
            $('.slideset').css({"width": allSlideWidth});
            //$('.slide').removeClass("test");
            
        }
        $(document).on('click', '.close_btn', function(e){
            $('#for_loading').fadeIn(500, function(){
                defaultHead();
                WindowResize()
            });
            $('#for_loading').fadeOut(800);
        } )
    }

    function SlideFromRight(){
        var flag = false;
        var slidewidth;
        var slideheight;

        $('#about_page').css({"right": -$(window).width()});
        $(window).resize(function(){
            slidewidth = $('.active_slide').length ? $(".active_slide").outerWidth() : $(".slide").outerWidth();
            slideheight = $('.active_slide').length ? $(".active_slide").height() : $(".slide").height();
            $('#about_page, #about_me').css({"width": slidewidth, "height": slideheight});
            if(flag){
                $('#about_page').css({"right": 0});
            }else{
                $('#about_page').css({"right": -$(window).width()});
            }
        })

        $(document).on('click','#about_open',function(e){
            $(this).addClass("prevent_click");
            flag = true;
            slidewidth = $('.active_slide').length ? $(".active_slide").outerWidth() : $(".slide").outerWidth();
            slideheight = $('.active_slide').length ? $(".active_slide").height() : $(".slide").height();
            $('#about_page, #about_me').css({"width": slidewidth, "height": slideheight});
            $('#about_page').load('pages/about.html');   
            
            $('#about_page').stop().animate({"right": 0}, 800, function(){
                $("#about_me").fadeIn(500);
            });
            $('#about_open').addClass("active");
            $('#work_open').removeClass("active");
            $('.home_page_nav').hide();
            
        });

        $(document).on('click','#work_open',function(){
            $("#about_open").removeClass("prevent_click");
            flag = false;

            // $(".test").fadeOut(500).queue(function(){
            //     $('#about_page').stop().animate({"right": -$(window).width()}, 500);
            // })
            $("#about_me").fadeOut(300)
            $('#about_page').stop().animate({"right": -$(window).width()}, 500);

            
            $('#about_open').removeClass("active");
            $('#work_open').addClass("active");
            if(!$('article').hasClass('work_body')){
                $('.home_page_nav').show();
            }
            
        })
            
    }

    function SlideNavi(){
            for(var i = 0; slideNum > i; i++){
                $("#slide_nav > ul").append('<li><i class="fa fa-circle"></i></li>');
            }      
            
    }
    function navArrowshowHide(){
        if(current === 0){
            $('.home_arrow_prev').hide();
        }else{
            $('.home_arrow_prev').show();
        }
    }


    
