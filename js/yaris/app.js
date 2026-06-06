/* 
 * @projectDescription Yaris - Traffic Catching HTML5 Game
 * @version 1.0.0
 * @author Newton Garson
 * @license MIT License
 * 
 */

var Yaris = Yaris || {};

(function() {
    "use strict";
    
    window.onload = function() {

        // Creating Phaser Game object
        Yaris.game = new Phaser.Game(960, 640, Phaser.AUTO, 'board', null, true, true);

        // Adding States to Game
        Yaris.game.state.add('Boot', Yaris.BootState);
        Yaris.game.state.add('Preload', Yaris.PreloadState);
        Yaris.game.state.add('Menu', Yaris.MenuState);
        Yaris.game.state.add('Game', Yaris.GameState);

        // Starting whole game with Boot State
        Yaris.game.state.start('Boot');

    };
})();
