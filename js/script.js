$(document).ready(function(){

    

    Slider();
    SlideFromRight();
    CloseWork();

    ToonSlide('.slide01');
    ToonSlide('.slide02');
    ToonSlide('.slide03');
        // $('.work_contents').load('pages/work.html')
    
    
});

// Global var

var currentWork ;
var current = 0;
    


    function Slider(){
                // Slider

        var slideWidth = $('.slide').outerWidth();
        var slideNum = $('.slide').length;
        var allSlideWidth = slideWidth * slideNum;
        

        $(window).resize(function(){
            
            slideWidth = $('.slide').outerWidth();
            allSlideWidth = slideWidth * slideNum;
            $('.slideset').css({"width": allSlideWidth});
            if(!$('.work_body').length){ 
                $('.slide_container,  .slide').css({'width': "calc(100vw - 12vmax)", "height": "calc(100vw - 12vmax);"})
            }
        })

        $('.slideset').css({"width": allSlideWidth})

        var navArrowshowHide = function(){
            if(current === 0){
                $('.home_arrow_prev').hide();
            }else{
                $('.home_arrow_prev').show();
            }
        }


        var sliding = function(){
            if(current < 0){
                current = slideNum -1;
            }else if(current > slideNum -1){
                current = 0;
                navArrowshowHide();
            }
            $('.slideset').stop().animate({
                'left': current * -slideWidth
            });
        }

        $('.home_arrow_prev').click(function(){
            current--;
            navArrowshowHide();
            sliding();
        })
        $('.home_arrow_next').click(function(){
            current++;
            navArrowshowHide();
            sliding();
        })


    }

    function ToonSlide(targetSlide){
        var h = "50vw";
        
        $(document).on('click',targetSlide ,function(e){
            $(this).addClass("active_slide");
            $('.slide').not(this).hide();
            $(".slideset").css({"left": 0});
            $('.slide_container,  .slideset').animate({"width": "100vw", "height":h}, 500, function(){
                $('.work_contents').hide();
                $('.work_contents').addClass("work_container");
                $('.work_contents').load('pages/milleniax.html');
                $('.work_contents'). fadeIn(500);
            });
            $(this).animate({"width": "100vw", "height":h}, 800);
            $('.home_page_nav').hide();

            //$(this).addClass("test");
        })
        
    }

    function CloseWork(){
        var originalWidth = "calc(100vw - 12vmax)";
        var originalheight = "calc(100vh - 10vmax)";
        var slideWidth = $('.slide').outerWidth();
        var slideNum = $('.slide').length;
        var allSlideWidth = slideWidth * slideNum;

        var defaultHead = function(){
            $('.slide').show();
            $(".slideset").css({"left": 0});
            $('.slide, .slide_container,  .slideset').css({"width": originalWidth, "height":originalheight})
            $('.work_contents').show();
            $('.work_contents').removeClass("work_container");
            $('.slide').removeClass('active_slide');
            //$(".slide01").css({"width": originalWidth, "height":originalheight});
            $('.home_page_nav').show();
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
            $('.for_loading').fadeIn(500, function(){
                defaultHead();
            });
            $('.for_loading').fadeOut(800);
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


    
