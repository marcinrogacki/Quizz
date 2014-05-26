function Question(question, answers, correctId) {

  this.question = question;
  this.answers = answers;
  this.correctId = correctId;

  this.getQuestion = function() {
    return this.question;
  }

  this.getAnswers = function() {
    return this.answers;
  }

  this.getCorrect = function() {
    return this.correctId;
  }
}

Question.list = [];
Question.current = 0;

Question.getCurrentId = function() {
  return Question.current;
}

Question.getFirst = function() {
  Question.current = 0;
  $.event.trigger({
    'type' : 'game:open-question',
  });
  return Question.getCurrent();
}

Question.getNext = function() {
  Question.current++;
  $.event.trigger({
    'type' : (Question.current < Question.list.length ? 
        'game:open-question' : 'game:no-question')
  });
  return Question.getCurrent();
}

Question.getCurrent = function() {
  if (Question.current >= Question.list.length) {
    return null;
  }
  return Question.list[Question.current];
}

Question.add = function(question) {
  Question.list.push(question);
}


