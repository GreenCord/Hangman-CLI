var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var wordList = require('./wordList');


function Game(){
	this.wins = 0;
	this.losses = 0;
	this.gameWord = new Word();
	this.letters = [];
	this.guessedcount = 0;
}

Game.prototype.displayText = function(txt,char){
	if (char === '-') {
		console.log('----------------------------------------');
		console.log('     ' + txt);
		console.log('----------------------------------------');
	} else if (char === '=') {
		console.log('========================================');
		console.log('     ' + txt);
		console.log('========================================');
	} else {
		console.log('     ' + txt);
	}
};

Game.prototype.initGame = function(){
	this.gameWord.resetWord();
	this.gameWord.getWord(wordList);
	this.letters = [];
	this.guessedcount = 0;
	for (var i = 0; i < this.gameWord.word.length; i++) {
		this.letters[i] = new Letter(this.gameWord.word[i]);
	}
	this.displayWord('Guess a letter: ');
};

Game.prototype.getTrue = function() {
	var int = 0;
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].guessed) {
			int++;
		}
	}
	return int;
};

Game.prototype.userGuess = function(message) {
	console.log('[TODO] Get user guess.');
};

Game.prototype.displayWord = function(txt){
// clear the screen and display header
	console.log('\033c');
	this.displayText('Hangman - THE GAME','=');

// RENDER THE POOR, POOR HANGED MAN
	this.gameWord.renderMan(this.gameWord.guesses);

// Display word: Run through word's letters, display the guessed ones.
	var msg = 'Word to Guess: ';
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].guessed) {
			msg += this.letters[i].letter + ' ';
		} else {
			msg += this.letters[i].display + ' ';
		}
	}
	this.displayText('' + msg.trim(),'-');

// Display guesses remaining and the letters guessed so far
	msg = 'Guesses remaining: ' + this.gameWord.guesses;
	if (this.gameWord.lettersguessed.length > 0) {
		msg += ' | Letters guessed: ' + this.gameWord.lettersguessed;
	}
	this.displayText(msg+'\n');

// check if won or lost
	if (this.getTrue() === this.letters.length) {
		this.displayText('Congratulations! You won.','=');
		this.wins++;
		this.gameWord.guessed = true;
	} else if	(this.gameWord.guesses <= 0) {
		this.displayText('YOU LOST. HA HA','=');
		this.losses++;
	}

// get user guess if guesses remaining, or else the game is over, ask to play again
	if ((this.gameWord.guesses > 0) && !this.gameWord.guessed) {
		this.gameWord.first = false;
		this.userGuess(txt);
	} else {
		if (this.playAgain()) {
			initGame();
		} else {
			console.log('\033c');
			this.displayText('Thanks for playing!!!','=');
			this.displayText('You won ' + this.wins + ' games, and lost ' + this.losses + ' games.','-');
		}
	}	
};

Game.prototype.playAgain = function(gameobj){
	inquirer.prompt([
		{
			type: 'list',
			name: 'again',
			message: 'Play again?',
			choices: ['Yes','No']
		}
	]).then(function(user){
		if (user.again === 'Yes') {
			gameobj.initGame();
		} else {
			return false;
		}
	});
};

module.exports = Game;