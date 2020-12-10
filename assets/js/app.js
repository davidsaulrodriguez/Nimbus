$(function() {
    const forecastImage = $('.card-image img');
    console.log(forecastImage);
    const iconcode = '01d';

    
    // window.onresize = function(){
    //     if (window.width <= 600) {
    //         var iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;
    //         replaceImage(forecastImage);
    //     } else if (window.width > 600) {
    //         var iconurl = `http://openweathermap.org/img/w/${iconcode}@2x.png`;
    //         replaceImage(forecastImage);
    //     } else if (window.width > 992) {
    //         var iconurl = `http://openweathermap.org/img/w/${iconcode}@4x.png`;
    //         replaceImage(forecastImage);
    //     }
    // };
    
    function replaceImage(imgs) {
        for (let i = 0; i < forecastImage.length; i++) {
            let iconurl = forecastImage[i];
            console.log(iconurl)
        }
    }

    replaceImage()

    $('.sidenav').sidenav();
    $('.modal').modal();
    $('#login').modal();
});