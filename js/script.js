


$(document).ready(function(){

    Slider();

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
        $(targetSlide).click(function(){
            $('.slide').not(this).hide();
            $(".slideset").css({"left": 0});
            $('.slide_container, .work_slider, .slideset').animate({"width": "100vw", "height":"30vw"});
            $(this).animate({"width": "100vw", "height":"30vw"}, 800);
    
            $('.home_page_nav').hide();
        })
        
    }


    
