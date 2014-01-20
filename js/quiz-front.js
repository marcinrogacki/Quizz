function QuizFront() {
}

// profile select
QuizFront.getPlayerBlock = function(playerId) {
  var player = Player.get(playerId);
  var block = $('#game-players .player-' + playerId);
  if (block.length == 0) {
    block = $('<div class="player player-' + playerId + '"></div>');
    var blockName = $('<span class="player-name"></span>');
    var blockImage = $('<div class="player-image"></div>');
    var blockConfirm = $('<span class="player-confirm"></span>');
    block.append(blockName, blockImage, blockConfirm);
    $('#game-players').append(block);
  }
  return $('#game-players .player-' + playerId);
}

QuizFront.setPlayerProfile = function(playerId, playerProfileId) {
  var playerBlock = QuizFront.getPlayerBlock(playerId);
  var player = Player.get(playerId);
  var playerProfile = PlayerProfile.get(playerProfileId); 

  console.log('QuizFront.setPlayerProfile', playerId, playerProfileId);
  playerBlock.find('.player-name').text( playerProfile.getName() );
  playerBlock.find('.player-image').css({ "background-image": "url(" + playerProfile.getImage() + ")"});
}

QuizFront.confirmProfile = function(playerId) {
  var playerBlock = QuizFront.getPlayerBlock(playerId);
  playerBlock.find('.player-confirm').html('&#10004;');
}

// q&a
QuizFront.updatePlayerScore = function(playerId) {
  $('.player-' + playerId + ' .score').each(function(idx, block) {
    $(block).text(Player.get(playerId).getScore());
  });
}

QuizFront.showQuizBoard = function() {
  var block = $('#game-players-mini ul');
  $.each(Player.getAll(), function(idx) {
    var playerBlock = $('<li class="player-' + idx + 
        '"><span class="name"></span><span class="score"></span></li>');
    var playerProfile = PlayerProfile.get( Player.get(idx).getProfileId() );
    playerBlock.find('.name').text( playerProfile.getName() );
    block.append(playerBlock);
    QuizFront.updatePlayerScore(idx);
  });

  $('#game-players').hide();
  $('#game-summary').hide();
  $('#game-quiz').show();
}

QuizFront.showSummaryBoard = function() {
  var block = $('#game-summary ul');
  $.each(Player.getAll(), function(idx) {
    var playerBlock = $('<li class="player-' + idx +
        '"><span class="name"></span><span class="score"></span></li>');
    var playerProfile = PlayerProfile.get( Player.get(idx).getProfileId() );
    playerBlock.find('.name').text( playerProfile.getName() );
    block.append(playerBlock);
    QuizFront.updatePlayerScore(idx);
  });

  $('#game-players').hide();
  $('#game-quiz').hide();
  $('#game-summary').show();
}

QuizFront.loadQuestion = function(question) {
  $('#game-question').html(question.getQuestion());
  $.each(question.getAnswers(), function(idx, value) {
    $('#game-answer-' + (idx+1)).text(value);
  });
}
