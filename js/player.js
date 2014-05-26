function Player() {

  this.playerId = ++Player.globalId;
  this.profileId = null;
  this.profileConfirmed = false;
  this.buzzerId = null;
  this.game = null;
  this.score = 0;

  this.lastQuestion = -1;
  this.lastAnswer = -1;

  this.getId = function() {
    return this.playerId;
  }

  this.bindBuzzer = function(buzzerId) {
    this.buzzerId = buzzerId;
  }

  this.bindGame = function(game) {
    this.game = game;
  }

  this.getGame = function() {
    return this.game;
  }

  this.addScore = function(value) {
    return this.setScore(value, true);
  }

  this.setScore = function(value, add) {
    add = add || false;
    if (add) {
      this.score += value;
    } else {
      this.score = value;
    }
    return this.score;
  }

  this.getScore = function() {
    return this.score;
  }

  this.setLastAnswer = function(questionId, answerId) {

    this.lastQuestion = questionId;
    this.lastAnswer = answerId;
  }

  this.getLastQuestion = function() {
    return this.lastQuestion;
  }

  this.getLastAnswer = function() {
    return this.lastAnswer;
  }

  this.canAnswer = function(questionId) {
    return this.getLastQuestion() != questionId;
  }

  this.setProfileId = function(profileId) {
    this.profileId = profileId;
  }

  this.getProfileId = function() {
    if (this.profileId === null) {
      return 0;
    }
    return this.profileId;
  }

  this.setProfileConfirmed = function(value) {
    this.profileConfirmed = value;
  }

  this.hasProfile = function() {
    return null !== this.getProfileId() && this.profileConfirmed;
  }

}

Player.globalId = 0;
Player.count = 0;
Player.list = {};

Player.add = function(player) {
  Player.list[player.playerId] = player;
  Player.count++;
}

Player.get = function(playerId) {
  return Player.list[playerId] || null;
}

Player.getAll = function() {
  return Player.list;
}

Player.findByBuzzerId = function(buzzerId) {
  var playerId = null;
  var player;
  $.each(Player.list, function(idx) {
    player = Player.get(idx);
    if (null !== player && player.buzzerId == buzzerId) {
      playerId = player.playerId;
      return false;
    }
  });
  if (null === playerId) {
    return null;
  }
  return Player.get(playerId);
}

Player.allAnswered = function() {
  var result = true;
  var player;
  $.each(Player.list, function(idx) {
    player = Player.get(idx);
    if (player.getLastQuestion() != Question.getCurrentId()) {
      result = false;
      return false;
    }
  });
  return result;
}

Player.allConfirmed = function() {
  var result = true;
  var player;
  $.each(Player.list, function(idx) {
    player = Player.get(idx);
    if (!player.hasProfile()) {
      result = false;
      return false;
    }
  });
  return result;
}
