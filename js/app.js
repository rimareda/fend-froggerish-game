//establishes the enemy
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 63; //alignment
    this.speed = speed;
    this.sprite = 'images/obi-wan.png';
    this.move = 101;
    this.boundary = this.move * 7;
    this.resetPos = -this.move;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if(this.x < this.boundary){
        this.x += this.speed * dt;
    }
    else {
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class with starting position, movement specifications
class Hero {
    constructor() {
        this.sprite = 'images/anakin.png';
        this.moveX = 101;
        this.moveY = 83;
        this.startX = this.moveX * 3;
        this.startY = (this.moveY * 5) + 63;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {
        //handles movement corresponding to the event listener near the end
        switch(input) {
            case 'left':
                if (this.x > 0){
                    this.x -= this.moveX;
                }
                break;
            case 'up':
                if (this.y > this.moveY){
                    this.y -= this.moveY;
                }
                break;
            case 'right':
                if (this.x < this.moveX * 6){
                    this.x += this.moveX;
                }
                break;
            case 'down':
                if (this.y < this.moveY * 5){
                    this.y += this.moveY; 
                }
                break;
        }
    }

    update() {
        //checks for collision
        for(let enemy of allEnemies) {
            
            if (this.y === enemy.y && (enemy.x + enemy.move > this.x && enemy.x < this.x + this.moveX/2)) {
                this.reset();
            }
        } 
        //when you've won...
        if (this.y === 63) {
        this.victory = true;
        this.sprite = 'images/vader.png';
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
        }
    }

    reset() {
        //resets the player, back to "start"
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = 'images/anakin.png';
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }
}

const player = new Hero();
const obi1 = new Enemy(-101, 83, 300);
const obi2 = new Enemy(-101, 166, 250);
const obi3 = new Enemy(-404, 166, 250);
const obi4 = new Enemy(-101, 249, 150);
const obi5 = new Enemy(-505, 249, 150);
const allEnemies = [];
allEnemies.push(obi1, obi2, obi3, obi4, obi5);


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
