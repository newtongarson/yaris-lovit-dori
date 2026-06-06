/**
 * @author Newton Garson
 * @license MIT License
 */

var Yaris = Yaris || {};

/**
 * BootState constructor
 *
 * @class Yaris.BootState
 * @constructor
 * @see Phaser.State
 */
Yaris.BootState = function() {

};

Yaris.BootState.prototype = {
    preload: function() {
        // loading assets for PreloadState
        this.game.load.image('loader-empty', './assets/sprites/loader-empty.svg');
        this.game.load.image('loader-full', './assets/sprites/loader-full.svg');
        this.game.load.image('logo-nerd', './assets/sprites/logo-nerd.svg');
    },
    create: function() {    
        // set scaling mode and resize game
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.refresh();

        this.game.state.start('Preload');
    },
    update: function() {

    }
};
