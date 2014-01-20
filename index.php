<?php

  //$ip = $_SERVER['SERVER_ADDR'];
  $ip = '192.168.1.133';

?><html>
<head>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="<?php echo "http://$ip:90/socket.io/socket.io.js"; ?>"></script>
    <script src="js/player.js"></script>
    <script src="js/profile.js"></script>
    <script src="js/buzzer.js"></script>
    <script src="js/question.js"></script>
    <script src="js/game.js"></script>
    <script>
      var BASE_IP = '<?php echo $ip; ?>';
    </script>
    <style type="text/css">
        body {
          font-family: 'Lucida Console', Monaco, monospace; 
          font-size: 18pt 
        }

        #game-players .player-name {
          display: block;
          text-align: center;
          padding: 5px 0;
        }
        #game-players .player-image {
          width: 160px;
          height: 160px;
        }
        #game-players .player-confirm {
          display: block;
          text-align: center;
          font-size: 26pt;
        }
        #game-players div.player {
          float: left;
          margin: 30px;
        }

        .answer-1 { border-color: blue; }
        .answer-2 { border-color: orange; }
        .answer-3 { border-color: green; }
        .answer-4 { border-color: yellow; }

        #game-answers {
          width: 70%;
          margin: 40px 0;
        }
        #game-answers ul {
          list-style-type: none;
        }
        #game-answers li {
          border-width: 2px;
          border-style: solid;
          border-radius: 10px;
          padding: 5px 10px;
          margin: 30px 0;
        }
        #game-players-mini {
          width: 20%;
          float: right;
        }
        #game-players-mini ul {
          list-style-type: none;
        }
        #game-players-mini li .score {
          padding: 0 20px;
        }

        #game-summary li .score {
          padding: 0 20px;
        }

    </style>
</head>
<body>
	category id (backend = 1, frontend = 2): <input id="category" type="text" value="1" />
    <div id="game-players"></div>
    <div id="game-quiz" style="display: none">
      <div id="game-players-mini">
        <ul></ul>
      </div>
      <div id="game-question"></div>
      <div id="game-answers">
        <ul>
          <li id="game-answer-1" class="answer-1"></li>
          <li id="game-answer-2" class="answer-2"></li>
          <li id="game-answer-3" class="answer-3"></li>
          <li id="game-answer-4" class="answer-4"></li>
        </ul>
      </div>

      <div id="game-answers-references">
	<ul>
          <li id="game-answer-reference-1" class="answer-reference-1"><a href="#">reference link</a></li>
          <li id="game-answer-reference-1" class="answer-reference-1"><a href="#">reference link</a></li>
	</ul>
     </div>
    </div>
    <div id="game-summary" style="display: none">
      END<br />
      <ul></ul>
    </div>

    <script src="js/quiz.js"></script>
    <script src="js/quiz-front.js"></script>
    <script type="text/javascript">
      var quiz = new Quiz();

      var socket = io.connect('http://' + BASE_IP + ':90');
      socket.on('click', function(data) {
        //console.log(data);
        quiz.onBuzzerClick(data.buzzer, data.button, data.state);
      });

      // game
      $(document).on('game:state-change', function(data) {
        console.log('game:state-change', data);
      });
      $(document).on('game:open-question', function(data) {
        console.log('game:open-question', data);
      });
      $(document).on('game:close-question', function(data) {
        console.log('game:close-question', data);
      });


      // game state - joining
      $(document).on('player:join', function(data) {
        console.log('player:join', data);
        var playerId = data.playerId;
        QuizFront.setPlayerProfile(playerId, 0); 
      });

      $(document).on('player:profile-up', function(data) {
        console.log('player:profile-up', data);
        var playerId = data.playerId;
        var playerProfileId = Player.get(playerId).getProfileId();
        if (++playerProfileId >= PlayerProfile.size()) {
          playerProfileId = 0;
        }
        Player.get(playerId).setProfileId(playerProfileId);
        QuizFront.setPlayerProfile(playerId, playerProfileId);
      });
      $(document).on('player:profile-down', function(data) {
        console.log('player:profile-down', data);
        var playerId = data.playerId;
        var playerProfileId = Player.get(playerId).getProfileId();
        if (--playerProfileId < 0) {
          playerProfileId = PlayerProfile.size() - 1;
        }
        Player.get(playerId).setProfileId(playerProfileId);
        QuizFront.setPlayerProfile(playerId, playerProfileId);
      });
      $(document).on('player:profile-confirm', function(data) {
        console.log('player:profile-confirm', data);
        var player = Player.get(data.playerId);
        QuizFront.confirmProfile(data.playerId);
      });
      $(document).on('player:profile-cancel', function(data) {
        console.log('player:profile-cancel', data);
      });
      $(document).on('player:profile-confirm-all', function(data) {
        console.log('player:profile-confirm-all', data);
	var category = $('#category').val();
	var url = "http://quiz.mrogacki.nexwai.pl/question/api/random/secret/RFUZ1ZbYv0mrot8DfxieDLeitytMgueQ/category/" + category;
	console.log('marcin');
	console.log(url);
	$.ajax({
	  url: url,
	}).done(function(response) {
		var questionData = response.data;
		$(questionData).each(function(key, val) {
			var q = new Question(
			  val.question.question,
			  val.answers,
			  val.valid
			);
			Question.add(q);
		});
		quiz.getGame().setState(Game.STATE_ANSWERING);
		QuizFront.showQuizBoard();
		var question = Question.getFirst();
		quiz.getGame().setQuestion(question);
		QuizFront.loadQuestion(question);
	});
      });

      // game state - answering
      $(document).on('player:answer', function(data) {
        console.log('player:answer', data);
        var question = quiz.getGame().getQuestion();
        console.log('player:answer', 'correct', question.getCorrect(), 'answer', data.answerId);
        if (data.answerId == question.getCorrect()) {
          Player.get(data.playerId).setScore(100, true);
          QuizFront.updatePlayerScore(data.playerId);
        }
      });
      $(document).on('game:open-question', function(data) {
        console.log('game:open-question', data);
        quiz.getGame().setQuestion(Question.getCurrent());
        QuizFront.loadQuestion( Question.getCurrent() );
      });
      $(document).on('game:close-question', function(data) {
        console.log('game:close-question', data);
        Question.getNext();
      });
      $(document).on('game:no-question', function(data) {
        console.log('game:no-question', data);
        quiz.getGame().setState(Game.STATE_IDLE);
        QuizFront.showSummaryBoard();
      });

      //
      quiz.getGame().setState(Game.STATE_JOINING);
    </script>
</body>
</html>
