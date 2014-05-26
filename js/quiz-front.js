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
  playerBlock.find('.player-image').parent().addClass('confirm');
}

// q&a
QuizFront.updatePlayerScore = function(playerId) {
  $('.player-' + playerId).each(function(idx, player) {
    var playerObject = Player.get(playerId);
    if (null != Question.getCurrent()) {
        var correctId = Question.getCurrent().getCorrect();
        if (!playerObject.canAnswer(Question.getCurrentId())) {
            $(player).find('.avatar img').addClass('faded');
            if (playerObject.getLastAnswer() == correctId) {
                $(player).find('.avatar span').html('&#xf058;');
            } else {
                $(player).find('.avatar span').html('&#xf057;');
            }
        }
    }
    $(player).find('.score').text(playerObject.getScore());
  });
}

QuizFront.cleanupPlayersScore = function() {
  $('.players .player').each(function(idx, player) {
    $(player).find('.avatar span').html('');
    $(player).find('.avatar img').removeClass('faded');
  });
}

QuizFront.showQuizBoard = function() {
  var block = $('#game-players-mini ul');
  $.each(Player.getAll(), function(idx) {
    var playerBlock = $('<li class="player player-' + idx + 
        '"><div class="info-player"><div class="name"></div><div class="score points"></div></div><div class="avatar"><div class="image"><img src="" /><span></span></div></div></li>');
    var playerProfile = PlayerProfile.get( Player.get(idx).getProfileId() );
    playerBlock.find('.name').text( playerProfile.getName() );
    playerBlock.find('.avatar img').attr( 'src', playerProfile.getImage() );
    block.append(playerBlock);
    QuizFront.updatePlayerScore(idx);

    // hide choose categories
    $('.choose-category').slideUp();
    $('#category').slideUp();

    // float left players when is more than 4
    var $players = $('ul.players li');

    if ($players.length > 4) {
        $players.addClass('left');
    };
  });

  $('#game-players').hide();
  $('#game-summary').hide();
  $('#game-quiz').show();
}

QuizFront.showSummaryBoard = function() {
  var block = $('#game-summary table.scores tbody');
  $.each(Player.getAll(), function(idx) {
    var playerBlock = $('<tr class="player player-' + idx +
        '"><td class="avatar"><div class="image"><img src="" /></div></td><td class="name"></td><td class="score points"></td></tr>');
    var playerProfile = PlayerProfile.get( Player.get(idx).getProfileId() );
    playerBlock.find('.name').text( playerProfile.getName() );
    playerBlock.find('td.avatar img').attr( 'src', playerProfile.getImage() );
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
    $('#game-answer-' + (idx+1)).html(value);
  });
}
