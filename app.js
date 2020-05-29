var speed = 'medium';

$(document).ready(function() {

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
      $(".cursivename").css("width","3rem");
      $(".cursivename").css("margin","0.3rem 0rem 0rem 1rem");
      $(".nav").css("font-size","0.7rem");
      $(".collapseclass").css("margin-top","0rem");
      $(".navbar-toggler").css("margin-top","0rem");
      $(".navbar").css("align-items","center");
      $(".navbar").css("height","3rem");
    } else {
      $(".cursivename").css("width","11rem");
      $(".cursivename").css("margin","1rem 0rem 0rem 1rem");
      $(".nav").css("font-size","0.9rem");
      $(".collapseclass").css("margin-top","1rem");
      $(".navbar-toggler").css("margin-top","1rem");
      $(".navbar").css("align-items","start");
      $(".navbar").css("height","auto");
    }
  }


  $("#traditionallink").on("click", function() {
    var el = $(this);
    el.text() == el.data("text-swap")
      ? el.text(el.data("text-original"))
      : el.text(el.data("text-swap"));
    $("#trad_show").slideToggle();
  });

  $('html, body').fadeIn(speed, function() {
        $('a[href], button[href]').click(function(event) {
            var url = $(this).attr('href');
            if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
            event.preventDefault();
            $('html, body').fadeOut(speed, function() {
                window.location = url;
            });
        });
    });

  var words = document.getElementsByClassName('word');
  var wordArray = [];
  var currentWord = 0;

  words[currentWord].style.opacity = 1;
  for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
  }

  function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    for (var i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
      nw[i].className = 'letter behind';
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
  }

  function animateLetterOut(cw, i) {
    setTimeout(function() {
          cw[i].className = 'letter out';
    }, i*80);
  }

  function animateLetterIn(nw, i) {
    setTimeout(function() {
          nw[i].className = 'letter in';
    }, 340+(i*80));
  }

  function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
      var letter = document.createElement('span');
      letter.className = 'letter';
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    wordArray.push(letters);
  }

  // changeWord();
  if (currentWord == 0) {
    setTimeout(3000);
  }
  setInterval(changeWord, 2500);

});
