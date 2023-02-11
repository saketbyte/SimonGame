// Declare and initialise all variables here.

var r_num;
var r_colour;
var colour_array = ["red", "blue", "green", "yellow"];
// Past pattern which has to be traced
var game_pattern = [];
// Current pattern being traced along past pattern if correct.
var user_pattern = [];

// Untill the game has started:
var started = false;
// Level initialisation.
var level = 0;

// Press any key event listener to start the game.
$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      // Called once only when the first time a keyboard key is pressed.
      nextSequence();
      // Changing the state of the game to started.
      started = true;
    }

  });

  // When there is any click on any of the button.
  $(".btn").click(function() {

    var user_colour = $(this).attr("id");
    user_pattern.push(user_colour);  

    makeSound(user_colour);
    animation(user_colour);
    // Solved a bug - do not check beforehand if game has not been started and user was just messing with mouse clicks. XD
    if(started)
    checkAnswer(user_pattern.length-1);
  });

  function checkAnswer(currentLevel) {

    if (game_pattern[currentLevel] === user_pattern[currentLevel]) {
      if (user_pattern.length === game_pattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
      makeSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart.");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}




function nextSequence()
{
    user_pattern = [];
    level++;
    $("#level-title").text("Level " + level);
    r_num = Math.floor(Math.random()*4);
    r_colour = colour_array[r_num];
    game_pattern.push(r_colour);

   animation(r_colour);
   makeSound(r_colour);

}


function makeSound(colour)
{   
        var sound = new Audio("sounds/"+colour+".mp3");
        sound.play();
}

function animation(colour)
{
    $("#" + colour).addClass("pressed");

    setTimeout(function () {
      $("#" + colour).removeClass("pressed");
    }, 100);
}



function startOver() {
    level = 0;
    game_pattern = [];
    user_pattern = []

    started = false;
  }




