
var tileWidth = 100;
var tileHeight = 83;
var halfTile = 42
var leftLimit = 0;
var rightLimit= 400;
var mid = 200;
var upLimit = 0;
var downLimit = 374;
var bugWidth = 60;
var score = 0;

// This method creates a random location value that is needed 
// for the y value of the enemy bug.
function randomLoc() {
    var loc = Math.floor((Math.random() * 4)+2);
    var y = (tileHeight * (loc -2)) + halfTile;
    switch (loc) {
        case 2: 
            return y;
            break;
        case 3: 
            return y;
            break;
        case 4: 
            return y;
            break;
        case 5: 
            return y;
            break;
    }
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = randomLoc();
    this.speed = Math.floor((Math.random() * 4)+1);
};

Enemy.prototype.reset = function() {
    this.x = 0;
    this.y = randomLoc();
    var loc = Math.floor((Math.random() * 4)+2);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + 100 * dt * this.speed;
    if (this.x > rightLimit)
        this.reset();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = mid;
    this.y = upLimit - halfTile +1;
};

// This method will update the player sprite on the website.  It also checks if 
// the player is occupying the same space as a enemy bug and checks if the other 
// side of the street has been reached.  
Player.prototype.update = function(dt) {
    for (i=0; i<allEnemies.length; i++){
        if (allEnemies[i].y === player.y && allEnemies[i].x > player.x - bugWidth 
            && allEnemies[i].x < player.x + bugWidth) {
            alert( "Score: " + score);
            alert("Game Over");
            score = 0;
            this.reset();
        }
    }

    if ( player.y >= downLimit - halfTile){
        score += 100;
        alert("You Win!");
        alert("Score: " + score);
        this.reset();
        score = 0;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This method will handle the input received from the keyboard.  It lets the 
// player move in a loop through the sides while not letting the player move off 
// the screen at the top and bottom.
Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'left':
            if (player.x == leftLimit) 
                player.x = rightLimit;
            else
                player.x -= tileWidth;
            score += 10;
            break;
        case 'up':
            if (player.y > upLimit) {
                player.y -= tileHeight;
                score += 10;
            }
            break;
        case 'right':
            if (player.x == rightLimit) 
                player.x = leftLimit;
            else
                player.x += tileWidth;
            score += 10;
            break;
        case 'down':  
            if (player.y < downLimit) {
                player.y += tileHeight;
                score += 10;
            } 
            break;
    }
};

//This method resets the game without initializing another player.
Player.prototype.reset = function() {
    this.x = mid;
    this.y = upLimit - halfTile +1;
    for (i =0; i< allEnemies.length; i++)
        allEnemies[i].reset();
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player;

var allEnemies = [];
allEnemies[0] = new Enemy;
allEnemies[1] = new Enemy;
allEnemies[2] = new Enemy;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
