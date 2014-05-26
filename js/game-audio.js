function GameAudio() {
}

GameAudio.list = {
    'game:open-question' : [
        1, 'brilliant', 'comeonthen', 'drop', 'fire',
        'incoming', 'takecover', 'watchthis'
    ],
    'game:close-question' : [
    ],
    'game:no-question' : [
        1, 'ohdear', 'victory'
    ],
    'game:idle' : [
        1, 'hurry', 'boring'
    ],
    'player:profile-confirm-all' : [
        1, 'excellent', 'runaway'
    ],
    'player:answer-correct' : [
        0.5, 'amazing', 'bungee', 'excellent', 'fatality',
        'flawless', 'laugh', 'ooff1', 'ooff2', 'perfect',
        'revenge' 
    ],
    'player:answer-incorrect' : [
        0.5, 'bummer', 'grenade', 'justyouwait', 'leavemealone',
        'missed', 'nooo', 'oinutter', 'oinutter',
        'ooff3', 'oops', 'ouch', 'ow1', 'ow2', 'ow3',
        'stupid', 'traitor'
    ]
};
GameAudio.urlPrefix = 'snd/';
GameAudio.urlSuffix = '.wav';
//GameAudio.urlPrefix = 'http://translate.google.com/translate_tts?tl=en&q=';
//GameAudio.urlSuffix = '';

GameAudio.playEvent = function(eventName) {
    if (typeof GameAudio.list[eventName] == 'undefined') {
        return;
    }
    var sndArray = GameAudio.list[eventName];
    if (sndArray.length < 2) {
        return;
    }
    var probability = sndArray.slice(0, 1);
    if (Math.random() > probability) {
        return;
    }
    var snd = sndArray[Math.floor(Math.random() * (sndArray.length-1))+1];
    var sndUrl = GameAudio.urlPrefix + snd + GameAudio.urlSuffix;
    console.log('playing audio', sndUrl);
    new Audio(sndUrl).play();
}
