$(document).ready(function(){
    // 스크롤 움직이기 
    
    gallery.scrollMove('.fredhuning','.Fred');
    gallery.scrollMove('.weronika','.Weronika');
    gallery.scrollMove('.natalia','.Natalia');
    gallery.scrollMove('.jeff','.Jeff');
    gallery.scrollMove('.topBtn','.head-bar')
    
    gallery.scrollToLoad('.Weronika',2100);
    gallery.scrollToLoad('.Natalia',4900);
    gallery.scrollToLoad('.Jeff',8500);
});

function Gallery () {

    this.scrollMove = function(select,yPos){
        var a = $(document).scrollTop()
        var selector = $(select);
        selector.click(function(e){
            e.preventDefault();
            $('html,body').animate({scrollTop:$(yPos).offset().top},500);
        });
    }
    
    this.scrollToLoad = function(getClass,yPos){
        
        var didScroll;
        $(window).scroll(function(e){
            didScroll = true;
            hasScroll(getClass,yPos);
            
        });

        function hasScroll(getClass, yPos){

            var pos = $(document).scrollTop();
            if( pos > yPos ) {
                $(getClass).fadeIn(1000);            
            }
        }
    }
}


var gallery = new Gallery();


