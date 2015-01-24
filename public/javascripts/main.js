var App = {};

App.pi = '';

App.count = -1;

App.score = 0;

App.currentPi = '';

App.challengeMode = false;

App.life = 3;

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
    var that = this;

    // Shakes the keypad, for lulz
    $('.grid-container').effect('shake', {times: 2}, 250);

    // Deduct life
    if (this.challengeMode) {
      this.life--; 
      $('.js-life').text(that.life);
    }
    this.count--;
    console.log('Wrong entry');
  }

  return correct;
};

App.updatePiIndicator = function() {
  $(".js-pi-indicator").html(this.currentPi);
  // Scrolls the container to the bottom when it overflows
  $(".js-pi-container").animate({ scrollTop: $(".js-pi-container")[0].scrollHeight}, 1000);
};

App.updateScore = function() {
  this.score++;
};

App.updateScoreIndicator = function() {
  App.updateScore();
  $('.js-score-indicator').text(this.score);
};

App.keyListener = function() {
  var value = '';

  $(".grid").on('click', function() {
    if (isNaN($(this).text())) return;

    value = $(this).text();

    if (App.verifyPi(value)) {
      App.updatePiIndicator();
      App.updateScoreIndicator();
    } else {
      App.checkGameOver();
    }
  });

  $(document).keypress(function(e) {
    if (e.which < 48 || e.which > 57) return;

    value = String.fromCharCode(e.which);

    if (App.verifyPi(value)) {
      App.updatePiIndicator();
      App.updateScoreIndicator();
    } else {
      App.checkGameOver();
    }
  });

  $('.js-challenge').click(function() {
    if (!App.challengeMode) {
      App.reset();
      App.challengeMode = true;
      $('.life-container').fadeIn();
    } else {
      App.reset();
      App.challengeMode = false;
    }
  });

  $('.js-reset-game').click(function() {
    App.reset();
  });
};

App.swapKeyLayoutListener = function() {
  var changed = false;
  $('.js-swap-layout').click(function() {
    if (!changed) {
      $('.grid-row').first().children('.grid').each(function(index) {
        $(this).find('h1').text(index + 7);
      });
      $('.grid-row:nth-last-child(2)').children('.grid').each(function(index) {
        $(this).find('h1').text(index + 1);
      });
      changed = true;
    } else {
      $('.grid-row').first().children('.grid').each(function(index) {
        $(this).find('h1').text(index + 1);
      });
      $('.grid-row:nth-last-child(2)').children('.grid').each(function(index) {
        $(this).find('h1').text(index + 7);
      });
      changed = false;
    }
  });
};

App.checkGameOver = function() {
  if (this.life === 0) App.showDeathScreen();
};

App.showDeathScreen = function() {
  $('.death-screen').fadeIn(2000);
};

App.reset = function() {
  this.count = -1;
  this.score = 0;
  this.currentPi = '';
  this.challengeMode = false;
  this.life = 3;
  $('.death-screen').hide();
  $('.js-life').text(this.life);
  $('.life-container').hide();
  $('.js-score-indicator').text(this.score);
  $('.js-pi-indicator').text(this.currentPi);
};

App.main = function() {
  this.getPi();
  this.keyListener();
  this.swapKeyLayoutListener();
};

$(document).ready(function() {
  App.main();
});
