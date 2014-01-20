function Game() {

  this.state = Game.STATE_INIT;

  this.players = {};
  this.question = null;  

  this.addPlayer = function(player, buzzerId) {
  
    this.players[buzzerId] = player;
    player.bindBuzzer(buzzerId);
    player.setScore(0);
  }

  this.setQuestion = function(question) {

    this.question = question;
  }

  this.getQuestion = function() {

    return this.question;
  }

  this.setState = function(state) {

    this.state = state;
    $.event.trigger({
      'type' : 'game:state-change',
      'state' : this.getState()
    });
  }

  this.getState = function() {

    return this.state;
  }

}

Game.STATE_INIT = 0;
Game.STATE_JOINING = 1;
Game.STATE_QUESTION = 2;
Game.STATE_ANSWERING = 3;
Game.STATE_ANSWER = 4;
Game.STATE_IDLE = -1;
