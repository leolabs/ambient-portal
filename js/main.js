console.log("Welcome to Portal 2 Ambient sounds!");

var blips = [],
    bg = [],
    blipCount = 32,
    bgCount = 7,
    loadedBlips = 0,
    blipDelay = 10000,
    started = false,
    blipVol = 100,
    bgVol = 40,
    volMul = 0.8,
    rndBgIndex = Math.floor(Math.random() * bgCount) + 1;

var visualDelays = {
    1:  [52, 163],
    2:  [101, 188],
    3:  [72],
    4:  [45, 625],
    5:  [68, 776],
    6:  [44],
    7:  [20],
    8:  [88, 328],
    9:  [45],
    10: [34],
    11: [101, 446],
    12: [58, 402, 526],
    13: [123, 360],
    14: [287, 532],
    15: [80, 541],
    16: [56, 770],
    17: [60, 372, 727],
    18: [42, 302],
    19: [90, 382],
    20: [41, 304],
    21: [37, 216],
    22: [19],
    23: [60, 344],
    24: [31, 115],
    25: [18, 290],
    26: [40, 316],
    27: [26],
    28: [195, 466],
    29: [20],
    30: [48, 331],
    31: [20],
    32: [36, 314]
};

$(window).load(function(){
    console.log("Everything else has loaded, now let's load the sounds...");

    for(var i = 1; i <= blipCount; i++){
        blips[i] = new buzz.sound("snd/blips_" + pad(i), {
            formats: [ "mp3", "ogg" ]
        });

        blips[i].num = i;
        blips[i].load();
        blips[i].setVolume(blipVol * volMul);

        blips[i].bind("canplay", function(e) {
            if(loadedBlips < blipCount){
                loadedBlips = this.num;
                var loaded = loadedBlips / blipCount * 100;
                $("#initProgress").css({"width": loaded + "%"});
            }
        });
    }

    for(var j = 1; j <= bgCount; j++){
        bg[j] = new buzz.sound("snd/lp_" + pad(j), {
            formats: [ "mp3", "ogg" ]
        });

        bg[j].load();
        bg[j].loop();
        bg[j].setVolume(bgVol * volMul);
        bg[j].num = j;
    }

    bg[rndBgIndex].bind("canplaythrough", function(e) {
        if(!started){
            started = true;
            $("#welcomeWindow").fadeOut();
            bg[rndBgIndex].play();
            playRandomBlip();
        }
    });
});

$(document).ready(function(){
    $("#blipSlider").change(function(){
        var val = $(this).val();

        blipDelay = val * 1000;
        var maxVal = parseInt(val) + 2;

        $("#blipDisplay").text("2-" + maxVal + " sec.");
    });

    $("#volumeSlider").change(function(){
        var val = $(this).val();
        volMul = val / 100;

        for(var i = 1; i <= blipCount; i++){
            blips[i].setVolume(blipVol * volMul);
        }

        for(var j = 1; j <= bgCount; j++){
            bg[j].setVolume(bgVol * volMul);
        }

        $("#volumeDisplay").text(val + " %");
    });

    $("#bgSlider").change(function(){
        var val = $(this).val();
        bgVol = val;

        for(var j = 1; j <= bgCount; j++){
            bg[j].setVolume(bgVol * volMul);
        }

        $("#bgDisplay").text(val + " %");
    });

    $("#aboutWindowBtn").click(function(){
        $("#aboutWindow").fadeIn();
    });

    $("#hideAboutBtn").click(function(){
        $("#aboutWindow").fadeOut();
    });
});

function playRandomBlip(){
    var rnd = Math.floor(Math.random() * blipCount) + 1;
    var rndTime = Math.floor(Math.random() * blipDelay) + 2000;

    blips[rnd].play();
    console.log("Playing blip no. " + rnd + " plus " + (rndTime/1000) + " seconds delay.");

    visual(rnd);

    setTimeout(function(){playRandomBlip()}, rndTime);
}
