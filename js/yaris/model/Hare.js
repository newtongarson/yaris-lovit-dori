/**
 * @author Newton Garson
 * @license MIT License
 */
var Yaris = Yaris || {};

/**
 * Hare constructor
 * 
 * @class Yaris.Hare
 * @constructor
 * @param {Yaris.GameState} state - a reference to the currently running game state.
 */
Yaris.Hare = function(state) {
    'use strict';
    
    this.state = state;
    this.dingCount = 0;

    this.state.sprites['hare'].reset(
            this.state.sprites['hare'].x,
            this.state.sprites['hare'].y
            );
    this.state.sprites['bell-' + this.dingCount].reset(
            this.state.sprites['bell-' + this.dingCount].x,
            this.state.sprites['bell-' + this.dingCount].y
            );
    
    this.state.isHare = true;
};

Yaris.Hare.prototype = {
    move: function() {
        'use strict';
        
        this.state.sprites['bell-' + (this.dingCount % 2)].kill();

        if (this.dingCount < 7) {
            this.dingCount++;

            this.state.sprites['bell-' + (this.dingCount % 2)].reset(
                    this.state.sprites['bell-' + (this.dingCount % 2)].x,
                    this.state.sprites['bell-' + (this.dingCount % 2)].y
                    );
        } else {
            this.hide();
        }
    },
    hide: function() {
        this.state.sprites['hare'].kill();
        this.state.animations.splice(this.state.animations.indexOf(this), 1);
        this.state.isHare = false;
    }
};
