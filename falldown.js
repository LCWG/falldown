///A simple ball game written in javascript
///try not to touch the top of the screen, see how many levels you can get to

///global level varaible that is set on page load
    var level=1;
    var win = false;


window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function newGame () {

   //initialize variables
    var canvas = document.getElementById("falldown");
    var context = canvas.getContext( '2d' );
    var ball = new Ball();
    var board = new Board();
    var lines = [new Line()];
    var key; //for the which key was pressed
    var acceleration = 6; //the speed the ball changes
    var fallDownSpeed = 1;
    var lineUpSpeed= 1;
    var newLineCreation = 100;
    var count = 1;
    var speed = 500 +(300 * level);
    var gameOver = false;
    var win = false;

    //start the loop
    animate();

    function animate() {
        if (!gameOver) {
            requestAnimFrame( animate );
            draw();
        } else {
            //// update the scoreboard
            alert("GAME OVER!! Your Score was:" + count)
            var score=document.createElement("LI");
            var scoreText=document.createTextNode('Score: ' + count);
            score.appendChild(scoreText);
            document.getElementById('scoreboard').appendChild(score);

            ///change the level up or down depending on win
            level = (win) ? level + 1 : level - 1

            /// print the level
            levelDiv = document.getElementById('level')
            var div=document.createElement("DIV");
            var levelText=document.createTextNode('Level: ' + level);
            levelDiv.removeChild(levelDiv.childNodes[0]);
            div.appendChild(levelText);
            levelDiv.appendChild(div);



        }
    }


    ///my Objects
    function Ball () {
        this.x = 300;
        this.y = 300;
        this.draw = function (x, y) {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(x, y, 5, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }
    }

    function Board () {
        this.width = 600;
        this.height = 600;
        this.draw = function (width, height) {
            context.fillStyle = "lightGrey";
            context.beginPath();
            context.rect(0, 0, width, height);
            context.closePath();
            context.fill();
        }
    }


    function Line() {
        this.y = 600;
        this.line = []; //empty line array waiting for a line to be made
        this.makeLine = function () {
            //sets variables within the line called on object creation
            var randomHole = Math.round(Math.random()*600);
            this.line = [randomHole-this.space, randomHole];
            this.hole = randomHole
        }
        this.hole = null;
        this.space = 40;
        this.makeLine(); //make the line
        this.isBallOnLine = function() {
            if ((ball.y -1 < this.y) && (ball.y + 7 > this.y)) {
                return true
            } else {
                return false
            }
        }
        this.isBallOverHole= function () {
            if ((line.hole > ball.x) && (ball.x > line.hole - line.space)){
                return true
            } else {
                return false
            }
        }
        this.draw = function () {
            context.beginPath();
            context.moveTo(0,this.y);
            context.lineTo(this.line[0], this.y);
            context.lineWidth = 5;
            context.strokeStyle = '#ff0000';
            context.stroke();

            context.beginPath();
            context.moveTo(this.line[1],this.y);
            context.lineTo(600, this.y);
            context.lineWidth = 5;
            context.strokeStyle = '#ff0000';
            context.stroke();
        };


    }



        function draw() {
//            //change the x position  of the ball according to key press
//            if (ball.x > 0 && ball.x < board.width) {
//            //if it was left
//                if (key == 'Left') {
//                    ball.x = ball.x - acceleration;
//                    //if it was right
//                } else if (key == 'Right'){
//                    ball.x = ball.x + acceleration;
//                };
//                } else if (ball.x <= 0) {
//                    ball.x=acceleration;
//                }
//                else if  (ball.x >= board.width) {
//                    ball.x = board.width-acceleration;
//                };

            //change the y position of the ball
            //need to check every line on the way
            for (var i = 0;i<lines.length+1;i++){
               /// if the ball wasn't moved at all
                 if (i==lines.length){
                    ball.y = ball.y + fallDownSpeed
                    break;
                }
                line = lines[i];
                ///if the ball is on top of the line
                if (line.isBallOnLine() ) {
                    //then if the ball is between the hole
                    if (line.isBallOverHole() ) {
                        ball.y = ball.y + fallDownSpeed;
                        break;
                    } else {
                        ball.y = ball.y - lineUpSpeed;
                        break;
                    }
                }
            }
            if (ball.y > 600) {
                ball.y =600
            }

            //change the position of the all the lines
            //I put it in a seperate for loop
            for (var i = 0;i<lines.length;i++){
                line = lines[i];
                line.y -= lineUpSpeed;
            }


            //add new lines depending on count
            if (count % newLineCreation == 0){
                lines.push(new Line())
            }


            ///draw the board first
            board.draw(board.width, board.height);

            /// then the lines
            for (var i = 0; i<lines.length; i++) {
                lines[i].draw();
            }

            //and the ball
            ball.draw(ball.x, ball.y);

            //increase the speed of the game as long as you haven't beaten the level
            if (count%100 == 0 && count < speed){
                fallDownSpeed = lineUpSpeed = fallDownSpeed*1.15
               // acceleration = acceleration*1.1  this was for the keyboard press
                newLineCreation = Math.round(newLineCreation*0.9)
            } else if (count%100 == 0) {
                fallDownSpeed = lineUpSpeed = fallDownSpeed*1.1;
                newLineCreation = Math.round(newLineCreation*0.9)
                win = true;
            }

            count = count + 1;

            if (ball.y <=0)   {
                gameOver = true
            }

        }


    ///resond to mousemove
    document.addEventListener('mousemove', function (e) {
        if (e.pageX > 0) {
            if (e.pageX < 600) {
                ball.x = e.pageX
            }else {
                ball.x = 600}
        }else {
            ball.x = 0}

    }, false);
}
