var doc = document;
var searchBox = doc.getElementById('search');
var submitBtn = doc.getElementById('send');
var kwak = doc.getElementById('kwak');


submitBtn.addEventListener('click',function(){

    if (searchBox.value === '소개') {
        kwak.style.opacity = 1;
    } else {
        kwak.style.opacity = 0;
    }
    
});


