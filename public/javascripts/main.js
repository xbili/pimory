var App = {};

App.pi = '';

App.count = -1;

App.score = 0;

App.currentPi = '';

App.getPi = function() {
  $.ajax({
    url: '/pi-answer',
  })
  .done(function(data) {
    App.pi = data;
  });
};

App.verifyPi = function(entry) {
  var correct = false;

  this.count++
  // Checks if the pi value entered is correct
  if (entry === this.pi[this.count]) {
    // Adds whitespace where needed
    if (this.count % 15 === 0 && this.count !== 0) {
      this.currentPi += '<br>';
    } else if (this.count % 5 === 0 && this.count !== 0) {
      this.currentPi += ' ';
    }

    this.currentPi += entry;
    correct = true;
    console.log('Correct Entry');
  } else {
    this.count--;
    console.log('Wrong entry');
  }

  return correct;
};

App.updatePiIndicator = function() {
  $(".js-pi-indicator").html(this.currentPi);
};

App.updateScore = function() {
  if (this.count < 15) {
    this.score += 10;
  } else if (this.count < 50) {
    this.score += 25;
  } else if (this.count < 150) {
    this.score += 50;
  }
};

App.updateScoreIndicator = function() {
  App.updateScore();
  $('.js-score-indicator').text(this.score);
};

App.keyListener = function() {
  var value = '';

  $(".grid").on('click', function() {
    value = $(this).text();

    if (App.verifyPi(value)) {
      App.updatePiIndicator();
      App.updateScoreIndicator();
    }
  });

  $(document).keypress(function(e) {
    if (e.which < 48 || e.which > 57) return;

    value = String.fromCharCode(e.which);

    if (App.verifyPi(value)) {
      App.updatePiIndicator();
      App.updateScore();
      App.updateScoreIndicator();
    }
  });
};

App.main = function() {
  this.getPi();
  this.keyListener();
};

$(document).ready(function() {
  App.main();
});
