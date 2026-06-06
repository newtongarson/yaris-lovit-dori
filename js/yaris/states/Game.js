/**
 * @author Newton Garson
 * @license MIT License
 */

var Yaris = Yaris || {};

/**
 * GameState constructor - main game logic
 *
 * @class Yaris.GameState
 * @constructor
 * @see Phaser.State
 */
Yaris.GameState = function() {
    'use strict';

    this.audio = {};
    this.sprites = {};
    this.animations = new Array();
    this.score = new Yaris.Score(this);
    this.wolf = new Yaris.Wolf(this);
    this.trafficList = new Yaris.TrafficList(this);
    this.newTrafficTimer = 0;
    this.trafficMoveTimer = 0;
    this.animationsTimer = 0;
    this.hareShowTimer = 0;
    this.isHare = false;

};

Yaris.GameState.prototype = {
    /**
     * Setup operations for Game state
     */
    create: function() {
        this.trafficList.clear();
        this.animations = new Array();

        var spritesData = [
            ['wolf-left', 'wolf-left', 390, 264],
            ['basket-left-up', 'basket-left-up', 342, 276],
            ['basket-left-down', 'basket-left-down', 335, 347],
            ['wolf-right', 'wolf-right', 482, 266],
            ['basket-right-up', 'basket-right-up', 560, 280],
            ['basket-right-down', 'basket-right-down', 554, 346],
            ['traffic-left-up-1', 'traffic-left-1', 276, 246],
            ['traffic-left-up-2', 'traffic-left-2', 287, 257],
            ['traffic-left-up-3', 'traffic-left-3', 307, 263],
            ['traffic-left-up-4', 'traffic-left-4', 320, 270],
            ['traffic-left-up-5', 'traffic-left-5', 333, 288],
            ['traffic-left-down-1', 'traffic-left-1', 271, 317],
            ['traffic-left-down-2', 'traffic-left-2', 286, 332],
            ['traffic-left-down-3', 'traffic-left-3', 306, 339],
            ['traffic-left-down-4', 'traffic-left-4', 319, 350],
            ['traffic-left-down-5', 'traffic-left-5', 332, 362],
            ['traffic-right-up-1', 'traffic-right-1', 676, 248],
            ['traffic-right-up-2', 'traffic-right-2', 662, 254],
            ['traffic-right-up-3', 'traffic-right-3', 648, 262],
            ['traffic-right-up-4', 'traffic-right-4', 630, 273],
            ['traffic-right-up-5', 'traffic-right-5', 616, 282],
            ['traffic-right-down-1', 'traffic-right-1', 676, 320],
            ['traffic-right-down-2', 'traffic-right-2', 663, 332],
            ['traffic-right-down-3', 'traffic-right-3', 649, 335],
            ['traffic-right-down-4', 'traffic-right-4', 632, 347],
            ['traffic-right-down-5', 'traffic-right-5', 618, 357],
            ['bird-left-1', 'bird-left-1', 328, 426],
            ['bird-left-2', 'bird-left-2', 320, 392],
            ['bird-left-3', 'bird-left-3', 304, 414],
            ['bird-left-4', 'bird-left-4', 280, 414],
            ['bird-left-5', 'bird-left-5', 252, 414],
            ['bird-right-1', 'bird-right-1', 552, 420],
            ['bird-right-2', 'bird-right-2', 618, 394],
            ['bird-right-3', 'bird-right-3', 648, 410],
            ['bird-right-4', 'bird-right-4', 666, 414],
            ['bird-right-5', 'bird-right-5', 698, 414],
            ['bird-life-1', 'bird-life', 600, 220],
            ['bird-life-2', 'bird-life', 550, 220],
            ['bird-life-3', 'bird-life', 500, 220],
            ['bell-0', 'bell-0', 398, 174],
            ['bell-1', 'bell-1', 398, 214],
            ['hare', 'hare', 313, 165]
        ];

        for (var i = 0; i < spritesData.length; i++) {
            this.sprites[spritesData[i][0]] =
                    this.game.add.sprite(
                            spritesData[i][2],
                            spritesData[i][3],
                            spritesData[i][1]
                            );
            this.sprites[spritesData[i][0]].kill();
        }

        var audioData = [
            'basket',
            'traffic-crash',
            'traffic-left-up',
            'traffic-left-down',
            'traffic-right-up',
            'traffic-right-down'
        ];

        for (var i = 0; i < audioData.length; i++) {
            this.audio[audioData[i]] = this.game.add.audio(audioData[i]);
        }

        this.score.savedText = this.game.add.text(600, 180, "0", {
            font: "36px lets_go_digitalregular",
            fill: "#000000",
            align: "right"
        });
        this.score.resetScore();

        this.wolf.render();

        var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        left.onDown.add(this.wolf.moveWolfLeft, this.wolf);
        right.onDown.add(this.wolf.moveWolfRight, this.wolf);
        up.onDown.add(this.wolf.moveBasketUp, this.wolf);
        down.onDown.add(this.wolf.moveBasketDown, this.wolf);

        this.game.add.button(60, 472, 'button-left-down', this.actionButtonLeftDown, this);
        this.game.add.button(60, 360, 'button-left-up', this.actionButtonLeftUp, this);
        this.game.add.button(786, 472, 'button-right-down', this.actionButtonRightDown, this);
        this.game.add.button(786, 360, 'button-right-up', this.actionButtonRightUp, this);

        this.newTrafficTimer = this.game.time.now + 1000;
        this.trafficMoveTimer = this.game.time.now + 1300;
        this.animationsTimer = this.game.time.now + 2500;
        this.hareShowTimer = this.game.time.now + 5000;

    },
    /**
     * Update game state
     */
    update: function() {
        if (this.game.time.now > this.newTrafficTimer) {
            var added = this.trafficList.addNewTraffic();
            var factor = this.factor();
            this.newTrafficTimer = this.game.time.now
                    + (1250 - (1250 * factor))
                    + ((added) ? this.trafficList.length * (250 - (250 * factor)) : 0);
        }

        if (this.game.time.now > this.trafficMoveTimer) {
            var moved = this.trafficList.moveNextTraffic();
            this.trafficMoveTimer = this.game.time.now
                    + ((moved) ? ((1000 - (1000 * this.factor())) / this.trafficList.length + 1) : 0);
        }

        if ((this.animations.length > 0)
                && (this.game.time.now > this.animationsTimer)) {
            for (var i = 0; i < this.animations.length; i++) {
                this.animations[i].move();
                this.animationsTimer = this.game.time.now + 600;
            }
        }

        if (this.game.time.now > this.hareShowTimer) {

            this.animations.push(new Yaris.Hare(this));
            this.hareShowTimer = this.game.time.now + 15000 + 10000 * (Math.random());

        }

    },
    /**
     * Function for end game and start menu state
     */
    endGame: function() {
        this.game.input.keyboard.clearCaptures()

        this.newTrafficTimer = this.game.time.now + 10000;
        this.trafficMoveTimer = this.game.time.now + 10000;
        this.birdMoveTimer = this.game.time.now + 10000;

        Yaris.score = this.score.savedTraffic;

        this.game.state.start('Menu');
    },
    actionButtonLeftDown: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketDown();
    },
    actionButtonLeftUp: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketUp();
    },
    actionButtonRightDown: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketDown();
    },
    actionButtonRightUp: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketUp();
    },
    /**
     * Calculate game difficulty factor
     */
    factor: function() {
        return (this.score.level < 143) ? (Math.log(this.score.level + 1) / 5) : 0.99;
    }
};
