/**
 * @author Newton Garson
 * @license MIT License
 */
var Yaris = Yaris || {};

/**
 * Wolf constructor - YARIS character
 * 
 * @class Yaris.Wolf
 * @constructor
 * @param {Yaris.GameState} state - a reference to the currently running game state.
 * @param {boolean} basketPosition - starter position of basket.
 * @param {boolean} wolfPosition - starter position of wolf.
 */
Yaris.Wolf = function(state, basketPosition, wolfPosition) {
    'use strict';

    if (typeof basketPosition == 'undefined') {
        basketPosition = false;
    }
    if (typeof wolfPosition == 'undefined') {
        wolfPosition = false;
    }

    this.state = state;
    this.basketPosition = basketPosition;
    this.wolfPosition = wolfPosition;

};

Yaris.Wolf.prototype = {
    /**
     * Display wolf on screen
     */
    render: function() {
        'use strict';
        
        var wolfStringPosition = (this.wolfPosition ? 'right' : 'left');
        var basketStringPosition = (this.basketPosition ? 'up' : 'down');
        
        this.state.sprites['wolf-' + wolfStringPosition].reset(
                this.state.sprites['wolf-' + wolfStringPosition].x,
                this.state.sprites['wolf-' + wolfStringPosition].y
                );
        
        this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].reset(
                this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].x,
                this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].y
                );
    },
    /**
     * Move wolf left
     */
    moveWolfLeft: function() {
        'use strict';
        
        if (this.wolfPosition) {

            this.move('wolf-right', 'wolf-left');

            if (this.basketPosition) {
                this.move('basket-right-up', 'basket-left-up');
            } else {
                this.move('basket-right-down', 'basket-left-down');
            }

            this.wolfPosition = false;

        }
    },
    /**
     * Move wolf right
     */
    moveWolfRight: function() {
        'use strict';
        
        if (!this.wolfPosition) {

            this.move('wolf-left', 'wolf-right');

            if (this.basketPosition) {
                this.move('basket-left-up', 'basket-right-up');
            } else {
                this.move('basket-left-down', 'basket-right-down');
            }

            this.wolfPosition = true;

        }
    },
    /**
     * Move basket up
     */
    moveBasketUp: function() {
        'use strict';
        
        if (!this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-down', 'basket-right-up');
            } else {
                this.move('basket-left-down', 'basket-left-up');
            }

            this.basketPosition = true;
        }
    },
    /**
     * Move basket down
     */
    moveBasketDown: function() {
        'use strict';
        
        if (this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-up', 'basket-right-down');
            } else {
                this.move('basket-left-up', 'basket-left-down');
            }

            this.basketPosition = false;
        }
    },
    /**
     * Move sprite from/to
     */
    move: function(spriteToKill, spriteToReset) {
        'use strict';
        
        this.state.sprites[spriteToKill].kill();
        this.state.sprites[spriteToReset].reset(
                this.state.sprites[spriteToReset].x,
                this.state.sprites[spriteToReset].y
                );
    },
    /**
     * Get basket position
     */
    getBasketPosition: function() {
        return this.basketPosition;
    },
    /**
     * Get wolf position
     */
    getWolfPosition: function() {
        return this.wolfPosition;
    }

};
