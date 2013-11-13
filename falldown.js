    window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
var canvas, context, toggle;

<<<<<<< HEAD

    animate();
=======
init();
animate();
>>>>>>> parent of 16bac91... wip

function init() {
    canvas = document.getElementById("falldown")
    context = canvas.getContext( '2d' );

}

function animate() {
    requestAnimFrame( animate );
    draw();

}

function draw() {
<<<<<<< HEAD
    var first;

    if (first == undefined) {
        var ball = new Ball();
        var board = new Board();
        var key = false
        var canvas = document.getElementById("falldown")
        var context = canvas.getContext( '2d' );
        first = false;
    }

    if (ball == undefined) {
        ball = new Ball();
    }
    if (board == undefined) {
        board = new Board();
    }
=======
    var key; //for the which key was pressed
    var count;
    var acceleration = 1; //the speed the ball changes
    var ballX; //Starting X position
    var ballY;  //Starting Y position
    var ballDy = -1;
    var boardX = 600;  //game board width
    var boardY = 600;  //game board height
    var lineArray; //set the potential line to empty array;
    var newLine = [];

    function makeBoard(ballX, ballY, newLine, lineArray) {
        ///call this only once per loop to draw the canvas

        //the board
        context.clearRect(0, 0, boardX, boardY);
        context.fillStyle = "lightGrey";
        context.beginPath();
        context.rect(0, 0, boardX, boardY);
        context.closePath();
        context.fill();

        //the ball
        context.fillStyle = "black";
        context.beginPath();
        context.arc(ballX, ballY, 5, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        //draw the line
        for (var i=0; i< newLine.length; i++) {
            if (line[i] == 0 ) {
                //then don't draw anything
            } else {
                context.fillStyle = "black"
                context.beginPath();
                context.rect(0, 0, 0, 0);


            }
        };
    };


    ///jquery get the keypress
    jQuery(document).on('keypress', function(e){

        switch (e.which) {
            // Left arrow.
            case 37:
                //set global variable key to left
                key = 'left'
                break;

            // Right arrow
            case 39:
                //set global variable key to right
                key = 'right'
                break;

        };
    });

    //if ballX and ballY haven't been set, set them
    if (!(ballX || ballY)) {
        ballX = 300;
        ballY = 300;
    }

    //change the x position  of the ball according to key press
    if (ballX > 0 && ballX < boardX) {
    //if it was left
        if (key == 'left') {
            ballX = ballX - acceleration;
            //if it was right
        } else if (key == 'right'){
                ballX = ballX + acceleration;
            };
        } else if (ballX <= 0) {
            ballX=acceleration;
        }
        else if  (ballX >= boardX) {
            ballX = boardX-acceleration;
        };

    //change the y position of the ball
<<<<<<< HEAD
    ball.y = ball.y + 1;

    //draw the ball
    context.fillStyle = "black";
    context.beginPath();
    context.arc(ball.x, ball.y, 5, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    //draw the board
    context.fillStyle = "lightGrey";
    context.beginPath();
    context.rect(0, 0, board.x, board.y);
    context.closePath();
    context.fill();

    ///the objects
    function Ball () {
        this.x = 300;
        this.y = 300;
    }

    function Board () {
        this.x = 600;
        this.y = 600;
    }

    function line() {
        this.draw = function () {
            var line;
            for (var i=0; i<20; i++){
                random = Math.random()
                //create a array with 1 and 0's 0's will be holes  1's line
                if (random < 0.85) {
                    line.push(1);
                }else {
                    line.push(0);
                };
=======
    ballY = ballY + ballDy;

    //create an object literal that has function to create and add new lines
    function createLine() {
        var line;
        for (var i=0; i<20; i++){
            random = Math.random()
            //create a array with 1 and 0's 0's will be holes  1's line
            if (random < 0.85) {
                line.push(1);
            }else {
                line.push(0);
>>>>>>> parent of 16bac91... wip
            };
        };
        return line
    }

<<<<<<< HEAD

=======
    //call this at the end to draw the board
    makeBoard(ballX, ballY, newLine, lineArray);
>>>>>>> parent of 16bac91... wip
};
