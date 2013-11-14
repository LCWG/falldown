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
    var line = new Line();
    line.makeLine();
    var key; //for the which key was pressed
    var acceleration = 6; //the speed the ball changes
    var fallDownSpeed = 1;
    var count = 0;
    var gameOver = false;


    //start the loop
    animate();


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
        this.y = 350;
        this.line = [];
        this.hole = null;
        this.space = 200;
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

        this.makeLine = function () {
            var randomHole = Math.round(Math.random()*600);
            this.line = [randomHole-this.space, randomHole];
            this.hole = randomHole
        }
    }

    function animate() {
        if (!gameOver) {
            requestAnimFrame( animate );
            draw();
        } else {
            newGame();
        }
    }

        function draw() {
            //change the x position  of the ball according to key press
            if (ball.x > 0 && ball.x < board.width) {
            //if it was left
                if (key == 'Left') {
                    ball.x = ball.x - acceleration;
                    //if it was right
                } else if (key == 'Right'){
                    ball.x = ball.x + acceleration;
                };
                } else if (ball.x <= 0) {
                ball.x=acceleration;
                }
                else if  (ball.x >= board.width) {
                ball.x = board.width-acceleration;
                };

            //change the y position of the ball

            ///if the ball it touching the line
            if (ball.y > line.y - 7 && ball.y < line.y + 7) {

                //if the ball is inbetween the hole
                if ((line.hole > ball.x) && (ball.x > line.hole - line.space)) {
                    ball.y = ball.y + fallDownSpeed;
                }
              /// otherwise your good
            }else {
                ball.y = ball.y + fallDownSpeed;
            }


            ///draw everything
            board.draw(board.width, board.height);
            line.draw();
            ball.draw(ball.x, ball.y);
            count += 1;

        }


    ///jquery respods to the keypress
    jQuery(document).keypress(function(e){

        key = e.key
        return key

        });

}


newGame();
