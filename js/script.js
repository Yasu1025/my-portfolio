$(document).ready(function(){

    var slideWidth = $('.slide').outerWidth();
    var slideNum = $('.slide').length;
    var allSlideWidth = slideWidth * slideNum;
    var current = 0;

    $('.slideset').css({"width": allSlideWidth})

    var sliding = function(){
        if(current < 0){
            current = slideNum -1;
        }else if(current > slideNum -1){
            current = 0;
        }
        $('.slideset').stop().animate({
            'left': current * -slideWidth
        });
    }

    $('.home_arrow_prev').click(function(){
        current--;
        sliding();
    })
    $('.home_arrow_next').click(function(){
        current++;
        sliding();
    })
    
});
