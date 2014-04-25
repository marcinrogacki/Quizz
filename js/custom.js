var fsElement = document.getElementById('game-wrap'),
fsButton = document.getElementById('fullscreen-button');

(function() {
var
fullScreenApi = {
supportsFullScreen: false,
isFullScreen: function() { return false; },
requestFullScreen: function() {},
cancelFullScreen: function() {},
fullScreenEventName: '',
prefix: ''
},
browserPrefixes = 'webkit moz o ms khtml'.split(' ');

    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
     fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
         fullScreenApi.prefix = browserPrefixes[i];

         if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
         fullScreenApi.supportsFullScreen = true;

         break;
         }
        }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
     fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

     fullScreenApi.isFullScreen = function() {
     switch (this.prefix) {
     case '':
     return document.fullScreen;
     case 'webkit':
     return document.webkitIsFullScreen;
     default:
     return document[this.prefix + 'FullScreen'];
     }
     }
     fullScreenApi.requestFullScreen = function(el) {
     return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
     }
     fullScreenApi.cancelFullScreen = function(el) {

     return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
     }
    }

    // jQuery plugin
    if (typeof jQuery != 'undefined') {
     jQuery.fn.requestFullScreen = function() {

     return this.each(function() {
     if (fullScreenApi.supportsFullScreen) {
     fullScreenApi.requestFullScreen(this);
     }
     });
     };
    }

    // export api
    window.fullScreenApi = fullScreenApi;
})();

if (fullScreenApi.supportsFullScreen) {

fsButton.addEventListener('click', function() {

    if(window.fullScreenApi.isFullScreen()) {
        // $(fsButton).removeClass('on');
        window.fullScreenApi.cancelFullScreen(fsElement);
    } else {
        // $(fsButton).addClass('on');
        window.fullScreenApi.requestFullScreen(fsElement);
    }
}, true);

}


$(function(){
    var time = 31,
        timeLeft = $(".time-left"),
        timerContainer = $(".timer-container")
        licznik = setInterval(function(){
            if(time > 20 ) {
                timerContainer.addClass("planty");
            } else if (time > 10) {
                timerContainer.addClass("midd");
            } else {
                timerContainer.addClass("low");
            }

            time = time - 1;
            timeLeft.text(time);

            if(time <= 0) {
                clearInterval(licznik);
                timerContainer.removeClass("low");
                timerContainer.removeClass("midd");
                timeLeft.text("Time's Up");
            }
        }, 1000);


});


$("document").on("onShowBoard", function() {
    alert("asdasd");

    $('.choose-category').hide();
    $('#category').hide();

    var $players = $('ul.players li');

    if ($players.length > 1) {
        $players.addClass('left');
    };
});




jQuery(function($) {
// changed .hover to .each
  $('.photo').each(function() {
    var a = Math.random() < 0.5 ? Math.random()*-10000 : Math.random()*10000;             
    $(this).css('transform', 'rotate(' + a + 'deg)');    
  });
});

