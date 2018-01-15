$(document).ready(function(){
    // Load page
     $('.slide01').click(function(){
        $('.work_contents').load('pages/work.html')
    })

    


    
    // Slider

    var slideWidth = $('.slide').outerWidth();
    var slideNum = $('.slide').length;
    var allSlideWidth = slideWidth * slideNum;
    var current = 0;

    $(window).resize(function(){
        slideWidth = $('.slide').outerWidth();
        allSlideWidth = slideWidth * slideNum;
        $('.slide_container  .slide').css({'width': "calc(100vw - 12vmax)", "height": "calc(100vw - 12vmax);"})
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

    
});