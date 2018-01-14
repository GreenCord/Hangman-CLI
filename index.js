var inquirer = require('inquirer');
var Game = require('./game');

var game = new Game('player');

console.log('\033c');
game.displayText('Welcome to Hangman - THE GAME(TM)!','=');

inquirer.prompt([
	{
		type: 'input',
		name: 'username',
		message: '>>> Enter your name: '
	}
]).then(function(user){
	if (user.username != '') {
		game.username = user.username;
	}
	game.initGame();
});







