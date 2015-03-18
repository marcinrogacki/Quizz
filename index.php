<html>
<head>
<title>Nexway Quizz</title>
    <!-- Styles -->
    <link rel="stylesheet/less" type="text/css" href="less/main.less">

    <script>less = {}; less.env = 'development';</script>
    <script src="js/less-1.5.0.min.js" type="text/javascript"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="js/player.js"></script>
    <script src="js/profile.js"></script>
    <script src="js/buzzer.js"></script>
    <script src="js/question.js"></script>
    <script src="js/game.js"></script>
    <script src="js/game-audio.js"></script>
    <script>
      var BASE_IP = '127.0.0.1';
    </script>

    <link rel="stylesheet" type="text/css" href="css/font-awesome.css">

    <link href='https://fonts.googleapis.com/css?family=Capriola' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Basic&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

    <style type="text/css">
        #game-players .player-name {
          display: block;
          text-align: center;
          padding: 1em 0;
        }

        #game-players .player-confirm {
          display: block;
          text-align: center;
          font-size: 26pt;
        }

        .answer-1 { border-color: blue; }
        .answer-2 { border-color: orange; }
        .answer-3 { border-color: green; }
        .answer-4 { border-color: yellow; }

        ul.answers li { font-size: 14pt; }
        .question     { font-size: 14pt; }

        .choose-category, #category { display: none; }

    </style>
</head>
<body id="game-wrap">

  <div class="container em-based">
    <section>

        <div class="choose-category">Category id (backend = 1, frontend = 2):</div>
        <input id="category" class="form-control" type="text" value="1" />
        <div id="game-players" class="choose-player"></div>
        <div id="game-quiz" style="display: none">
          <div class="question-container">
            <div class="question">
              <span id="game-question" class="text"></span>
            </div>
          </div>
          <div class="content">
            <div id="game-answers" class="wrapper-answers">
              <ul class="answers">
                <li id="game-answer-1" class="answer-1 blue"></li>
                <li id="game-answer-2" class="answer-2 orange"></li>
                <li id="game-answer-3" class="answer-3 green"></li>
                <li id="game-answer-4" class="answer-4 yellow"></li>
              </ul>
            </div>
            <div id="game-players-mini" class="wrapper-players">
              <ul class="players"></ul>
            </div>
          </div>

          <!-- <div id="game-answers-references">
            <ul>
              <li id="game-answer-reference-1" class="answer-reference-1"><a href="#">reference link</a></li>
              <li id="game-answer-reference-1" class="answer-reference-1"><a href="#">reference link</a></li>
            </ul>
         </div>-->
        </div>
        <div id="game-summary" style="display: none">
          <h2 class="complate">QUIZZ COMPLETE! <span class="try">Try again</span></h2>
          <table class="table table-bordered scores">
            <tbody>
            </tbody>
          </table>
        </div>

    </section>
  </div>

    <script src="js/quiz.js"></script>
    <script src="js/quiz-front.js"></script>
    <script type="text/javascript">
      var quiz = new Quiz();

      var server = require('http').createServer();
      var io = require('socket.io')(server);
      socket.on('click', function(data) {
        quiz.onBuzzerClick(data.buzzer, data.button, data.state);
      });

      // game + audio + debug
      $(document).on('game:state-change', function(data) {
        console.log('game:state-change', data);
      });
      $(document).on('game:open-question', function(data) {
        console.log('game:open-question', data);
        GameAudio.playEvent('game:open-question');
      });
      $(document).on('game:close-question', function(data) {
        console.log('game:close-question', data);
        GameAudio.playEvent('game:close-question');
      });
      $(document).on('game:no-question', function(data) {
        GameAudio.playEvent('game:no-question');
      });
      $(document).on('player:profile-confirm-all', function(data) {
        GameAudio.playEvent('player:profile-confirm-all');
      });
      $(document).on('player:answer-correct', function(data) {
        console.log('player:answer-correct', data);
        GameAudio.playEvent('player:answer-correct');
      });
      $(document).on('player:answer-incorrect', function(data) {
        console.log('player:answer-incorrect', data);
        GameAudio.playEvent('player:answer-incorrect');
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
//        var url = 'http://192.168.1.188/quiz-backend/q.php';
        $.ajax({
            url: url,
        }).done(function(response) {
            var questionData = response.data;
            console.log(questionData);
            //questionData = questionData.slice(-1);
            $(questionData).each(function(key, val) {
                var q = new Question(
                    val.question.question,
                    val.answers,
                    val.valid
                );
                Question.add(q);
            });
            quiz.getGame().setState(Game.STATE_ANSWERING);
            setTimeout(function() {
                QuizFront.showQuizBoard();
                var question = Question.getFirst();
                quiz.getGame().setQuestion(question);
                QuizFront.loadQuestion(question);
            }, 2500);
        });
      });

      // game state - answering
      $(document).on('player:answer', function(data) {
        console.log('player:answer', data);
        var question = quiz.getGame().getQuestion();
        console.log('player:answer', 'correct', question.getCorrect(), 'answer', data.answerId);
        if (data.answerId == question.getCorrect()) {
          Player.get(data.playerId).setScore(100, true);
        }
        QuizFront.updatePlayerScore(data.playerId);
      });
      $(document).on('game:open-question', function(data) {
        console.log('game:open-question', data);
        quiz.getGame().setQuestion(Question.getCurrent());
        QuizFront.loadQuestion( Question.getCurrent() );
      });
      $(document).on('game:close-question', function(data) {
        console.log('game:close-question', data);
        var correctNumber = Question.getCurrent().getCorrect() * 1 + 1;
        var correct = $('#game-answer-' + correctNumber.toString());
        console.log(correct, correctNumber);
        correct.addClass('correct');
        setTimeout(function() {
            correct.removeClass('correct');
            QuizFront.cleanupPlayersScore();
            Question.getNext();
        }, 5000);
      });
      $(document).on('game:no-question', function(data) {
        console.log('game:no-question', data);
        quiz.getGame().setState(Game.STATE_IDLE);
        QuizFront.showSummaryBoard();
      });

      //
      quiz.getGame().setState(Game.STATE_JOINING);
    </script>
    <script src="js/custom.js" type="text/javascript"></script>
</body>
</html>
