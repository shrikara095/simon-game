var gamepattern=[];
var userclickedpattern=[];
var buttoncolors=["red","blue","green","yellow"];
var started=false;
var c=1;
var level;

$(document).on("keydown",function()
{
    if(!started)
    {
        
     level="level "+c;
    
    $("#level-title").text(level);
    nextsequence();
    started=true;
   
    }
});
 $(".btn").on("click",function()    //see once
{
    var userchoosencolor=$(this).attr("id");
    userclickedpattern.push(userchoosencolor);
    playSound(userchoosencolor);
    animatePress(userchoosencolor);
    checkAnswer(userclickedpattern.length-1);
});

function nextsequence()
{
    
     userclickedpattern=[];
     level="level "+c;
     $("#level-title").text(level);
    var randno=Math.floor(Math.random()*4);
    var rdcolor=buttoncolors[randno];
gamepattern.push(rdcolor);

$("#"+rdcolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(rdcolor);
animatePress(rdcolor);
c++;
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  function animatePress(color1)
  {
    $("#"+color1).addClass("pressed");
    setTimeout(function(){
        $("#"+color1).removeClass("pressed"),100
    });
  }
  function checkAnswer(currentlevel)
{
    if (gamepattern[currentlevel] === userclickedpattern[currentlevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userclickedpattern.length === gamepattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextsequence();
          }, 1000);
  
}
    }
else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over")
    setTimeout(function()
    {
        $("body").removeClass("game-over");
    },200);
    $("h1").text("GAME-OVER,press any to restart");
    started=false;
    gamepattern=[];
    userclickedpattern=[];
    c=1;
    
}
    }