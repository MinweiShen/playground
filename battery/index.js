'use strict';

$( window.navigator.getBattery().then(function(battery){
    var volume = $('#volume');

    battery.addEventListener('chargingchange', function(){
        if (battery.charging){
            volume.addClass('charging');
        }
        else {
            volume.removeClass('charging');
            volume.css('width', battery.level*95+'%');
        }
    });

    volume.css('width', battery.level*95+'%');
    
    if(!battery.charging) {
        volume.addClass('charging');
    }
}));