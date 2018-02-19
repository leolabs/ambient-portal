// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function placeDrop(){
    var drop = $("<div></div>").appendTo("body");
    var x = Math.random() * ($("body").width() - 500) + 250,
        y = Math.random() * ($("body").height() - 500) + 250,
        size = Math.random() * 400 + 100,
        color = Math.floor(Math.random() * 100);

    drop.css({
        "top": y + "px",
        "left": x + "px",
        "width": size + "px",
        "height": size + "px",
        "background": "#" + color + color + color
    });

    drop.addClass("drop");

    setTimeout(function(){
        drop.remove();
    }, 5000)
}

function visual(ind){
    for(var i = 0; i < visualDelays[ind].length; i++){
        setTimeout(function(){placeDrop()}, visualDelays[ind][i]);
    }
}