function Quiz() {

  var game = new Game();

  this.onBuzzerClick = function(buzzerId, buttonId, buttonState) {

    if (!buttonState) {
      return;
    }
    var state = game.getState();
    var player = Player.findByBuzzerId(buzzerId);
    console.log('player', player, state);
    switch (state) {

      case Game.STATE_INIT:
        break;

      case Game.STATE_JOINING:
        // new player
        if (buttonId == Buzzer.BTN_BUZZ && null === player) {
          var player = new Player();
          player.bindBuzzer(buzzerId);
          Player.add(player);
          game.addPlayer(player, buzzerId);
          $.event.trigger({
            'type' : 'player:join',
            'playerId' : player.getId(),
            'buzzerId' : buzzerId
          });
        } else
        // profile change
        if (player !== null && !player.hasProfile()) {
          if (buttonId == Buzzer.BTN_UP || buttonId == Buzzer.BTN_DOWN) {
            $.event.trigger({
              'type' : 'player:profile-' + (buttonId == Buzzer.BTN_UP ? 'up' : 'down'),
              'playerId' : player.getId(),
              'buzzerId' : buzzerId
            });
          } else if (buttonId == Buzzer.BTN_BUZZ) {
            player.setProfileConfirmed(true);
            $.event.trigger({
              'type' : 'player:profile-confirm',
              'playerId' : player.getId(),
              'buzzerId' : buzzerId
            });
            if (Player.allConfirmed()) {
              $.event.trigger({
                'type' : 'player:profile-confirm-all',
              });
            }
          }
        } else if (player !== null && player.hasProfile() && buttonId == Buzzer.BTN_YELLOW) {
          player.setProfileId(null);
          player.setProfileConfirmed(false);
          $.event.trigger({
            'type' : 'player:profile-cancel',
            'playerId' : player.getId(),
            'buzzerId' : buzzerId
          });
        }
        break;

      case Game.STATE_ANSWERING:
        var questionId = Question.getCurrentId();
        var answerId = Buzzer.getButtonSequence(buttonId);
        if (null === player || answerId < 0 || !player.canAnswer(questionId)) {
          break;
        }
        player.setLastAnswer(questionId, answerId);
        $.event.trigger({
          'type' : 'player:answer',
          'playerId' : player.getId(),
          'buzzerId' : buzzerId,
          'answerId' : answerId
        });
        if (Player.allAnswered()) {
          $.event.trigger({
            'type' : 'game:close-question',
          });
        }
        break;
    }
  }

  this.getGame = function() {

    return game;
  }
}
