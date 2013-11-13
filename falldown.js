    window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();


animate();



function animate() {
    requestAnimFrame( animate );
    draw();
}

function draw() {
    var first;

    if (first == undefined) {
        var ball = new Ball();
        var board = new Board();
        var key = false
        var canvas = document.getElementById("falldown")
        var context = canvas.getContext( '2d' );
        var first = false;
    }

    if (ball == undefined) {
        ball = new Ball();
    }
    if (board == undefined) {
        board = new Board();
    }

    //listen for keypress
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

    //change the x position  of the ball according to key press
    if (ball.x > 0 && ball.x < board.x) {
        //if it was left
        if (key == 'left') {
            ball.x = ball.x - 1;
            //if it was right
        } else if (key == 'right'){
            ball.x = ball.x + 1;
        };
    } else if (ball.x <= 0) {
        ball.x=1;
    }
    else if  (ball.x >= board.x) {
        ball.x = borad.x-1;
    };

    //change the y position of the ball
    ball.y = ball.y + 1;

    ball.draw(context);
    board.draw();


    ///the objects
    function Ball () {
        this.x = 300;
        this.y = 300;
        this.draw = function(context) {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        };
    }

    function Board () {
        this.x = 600;
        this.y = 600;
        this.draw = function() {
            context.clearRect(0, 0, this.x, this.y);
            context.fillStyle = "lightGrey";
            context.beginPath();
            context.rect(0, 0, this.x, this.y);
            context.closePath();
            context.fill();
        }
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
            };
            return line
        }
    }



};




