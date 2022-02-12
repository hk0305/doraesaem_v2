// /* main slide
function mainSlideInit() {
    if($('#main_slide').hasClass('slick-initialized')){
        $('#main_slide').slick('unslick');
    }

    var windowW = $(window).innerWidth();
    if(windowW <= 1200){    //화면 너비가 1200 이하일 경우
        $('#main_slide').slick({
            initialSlide: 1, //시작 슬라이드 index(default는 0)
            autoplay: true,
            autoplaySpeed: 5000
        });
    }else { //화면 너비가 1200 초과일 경우
        var slide = $('#main_slide .slide_item');
        if(slide.length <= 3){  //슬라이드 갯수가 3개 이하일 경우 작동하지 않기 때문에, 3개 이하일 경우 각 슬라이드 클론을 생성함.
            slide.each(function(){
                $(this).clone().appendTo('#main_slide');
            }); 
        }

        $('#main_slide').slick({    //슬라이드 생성
            initialSlide: 1,    //시작 슬라이드 index(default는 0)
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 5000
        });

        if($('#main_slide').hasClass('initialized')){   //센터 슬라이드 외 슬라이드 너비 지정
            var defaultWidth = ($('body').innerWidth() - 1200) / 2;
            slide.each(function(){
                $(this).attr('style','width='+defaultWidth+'px !important');
            })
        }
    }
}
//main slide */ 


//modal 닫기
function closeModal() {
    var e = $(event.target);
    e.parent().parent().hide();
    if(e.parent().parent().hasClass('gallery_modal')){   
        e.next('.slick-slider').slick('unslick');        
    }
}
// modal 닫기 */


$(document).ready(function(){
    //sub 메뉴
    $('nav li').bind('mouseover click', function(){
        var sub = $(this).find('.sub');
        if(sub.length > 0){
            sub.show();   
        }
    })

    $('nav li').mouseout(function(){
        var windowW = $(window).innerWidth();
        if(windowW > 1200){
            if($(this).find('.sub')){
                $(this).find('.sub').hide();
            }
        }
    })


    //모바일 메뉴 버튼 클릭
    $('.btn_nav').click(function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $('nav').hide();
        }else {
            $(this).addClass('open');
            $('nav').show();
        }
    });

    //tab 메뉴
    $('.tabs li a').click(function(){
        var tabIdx = $(this).attr('data-id');
        $('#'+tabIdx+'.tab').show();
        $(this).parent().parent().find('li').removeClass('on');
        $(this).parent().addClass('on');
    })

    //main slide
    if($('#main_slide').length > 0){
        mainSlideInit();
    }   

    //modal 열기
    $('*[data-modal').each(function(){
        $(this).click(function(){
            var e = $(event.target).parent();
            var modalName = e.attr('data-modal');     
            //console.log(modalName);
            $('.modal_wrap.'+ modalName).show();
            if(modalName == 'gallery_modal'){
                //gallery slide - 모달이 열린 후 슬라이드 생성
                $('#gallery_slide').slick();
            }
        })
    })
})

$(window).resize(function(){
    //main slide
    mainSlideInit();
})