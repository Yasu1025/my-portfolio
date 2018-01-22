


$(document).ready(function(){

    Slider();
    slideFromRight();

    ToonSlide('.slide01');
    ToonSlide('.slide02');
    ToonSlide('.slide03');
        // $('.work_contents').load('pages/work.html')
    
    
});
    


    function Slider(){
                // Slider

        var slideWidth = $('.slide').outerWidth();
        var slideNum = $('.slide').length;
        var allSlideWidth = slideWidth * slideNum;
        var current = 0;

        $(window).resize(function(){
            slideWidth = $('.slide').outerWidth();
            allSlideWidth = slideWidth * slideNum;
            $('.slide_container,  .slide').css({'width': "calc(100vw - 12vmax)", "height": "calc(100vw - 12vmax);"})
            $('.slideset').css({"width": allSlideWidth})
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
        var h = "40vw";
        $(document).one('click',targetSlide ,function(e){
            $('.slide').not(this).hide();
            $(".slideset").css({"left": 0});
            $('.slide_container,  .slideset').animate({"width": "100vw", "height":h}, 500, function(){
                $('.work_contents').hide();
                $('.work_contents').addClass("work_container");
                $('.work_contents').load('pages/work.html');
                $('.work_contents'). fadeIn(500);
            });
            $(this).animate({"width": "100vw", "height":h}, 800);
            $('.home_page_nav').hide();
        })
        
    }

    function slideFromRight(){
        var flag = false;
        $('#about_page').css({"right": -$(window).width()});
        $(window).resize(function(){
            if(flag){
                $('#about_page').css({"right": 0});
            }else{
                $('#about_page').css({"right": -$(window).width()});
            }
        })

        $(document).on('click','#about_open',function(e){

            $('#about_page').load('pages/about.html');
            flag = true;
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


    
