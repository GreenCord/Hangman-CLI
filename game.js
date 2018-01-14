var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var wordList = require('./wordList');

// Game constructor: Track wins, losses, the game word, the word's letters, and the guessedcount variable.
function Game(username){
	this.username = username
	this.wins = 0;
	this.losses = 0;
	this.gameWord = new Word();
	this.letters = [];
	this.guessedcount = 0;
}


// ----------------------------------------------------------------------------
// Method: displayText(txt,char)
// ----------------------------------------------------------------------------
// Description: Displays txt on screen with various decoration lines, if
//              a - or = char is passed in.
// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
// Method: initGame
// ----------------------------------------------------------------------------
// Description: Resets everything in the instance of the game object, and
//              starts the game over again with a new word.
// ----------------------------------------------------------------------------

Game.prototype.initGame = function(){
	this.gameWord.resetWord();
	this.gameWord.getWord(wordList);
	this.letters = [];
	this.guessedcount = 0;
	for (var i = 0; i < this.gameWord.word.length; i++) {
		this.letters[i] = new Letter(this.gameWord.word[i]);
	}
	this.displayWord('Hey ' + this.username + ', guess a letter: ');
};


// ----------------------------------------------------------------------------
// Method: getTrue
// ----------------------------------------------------------------------------
// Description: Returns the int count of how many letters have been guessed.
// ----------------------------------------------------------------------------

Game.prototype.getTrue = function() {
	var int = 0;
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].guessed) {
			int++;
		}
	}
	return int;
};

// ----------------------------------------------------------------------------
// Method: userGuess
// ----------------------------------------------------------------------------
// Description: Inquirer prompt to collect the user's guessed letter.
//              Checks if user's letter has already been guessed,
//              or whether the letter matches any in the word letters.
//              Depending on the outcome, will send the message txt to
//              displayWord. For the next round.
// ----------------------------------------------------------------------------

Game.prototype.userGuess = function(gameobj, message) {
	// Get user's letter to guess
	inquirer.prompt([
		{
			type: 'input',
			name: 'guess',
			message: message,
			validate: function(value){
				var isok = value.match(/^[a-zA-Z]+$/);
				if (value.length === 1) {
					if (isok) {
						return true;
					}
				}
				return 'Please enter one letter';
			}
		}
	])
	.then(
		function(user){
			gameobj.guessedcount = 0;
			var existingmatch = false;
			var txt = '';
			// check guess against previously guessed letters
			for (var i = 0; i < gameobj.gameWord.lettersguessed.length; i++) {
				if (user.guess.toLowerCase() === gameobj.gameWord.lettersguessed[i].toLowerCase()) {
					existingmatch = true;
				}
			}

			// check guess against all letters, mark guessed as true for matches
			for (var j = 0; j < gameobj.letters.length; j++) {
				if (user.guess.toLowerCase() === gameobj.letters[j].letter.toLowerCase()) {
					gameobj.letters[j].guessed = true;
					gameobj.guessedcount++;
				} // end if
			} // end for

			if (existingmatch) {
				txt = 'Hey ' + gameobj.username + '! You already guessed that letter. Guess another letter: ';
			} else if (gameobj.guessedcount === 0) {
				txt = 'Uh oh... that letter wasn\'t found, ' + gameobj.username + '. \nGuess a new letter: ';
				gameobj.gameWord.guesses--;
				gameobj.gameWord.lettersguessed.push(user.guess);
			} else {
				txt = 'Guess a letter: ';
				gameobj.gameWord.lettersguessed.push(user.guess);
			}
			gameobj.displayWord(txt);
	});
};

// ----------------------------------------------------------------------------
// Method: displayWord
// ----------------------------------------------------------------------------
// Description: Resets the display, prints the header, the hangman, and
//              calculates the current status of the letters guessed in the
//              word. Displays the remaining number of guesses, and the 
//              letters currently guessed.
//              Checks whether the game has been won (all letters guessed) or
//              game has been lost (no guesses remaining) and sets conditions.
//              Game logic determins whether to:
//              - Get a new user guess (guesses remaining, game not won)
//              - Prompt to play again (game won or lost)
//                  - If game is won, init the game to play new word
//                  - If game is lost, end game and print score.
// ----------------------------------------------------------------------------

Game.prototype.displayWord = function(txt){
// clear the screen and display header
	console.log('\033c');
	this.displayText('Hangman - THE GAME(TM)','=');

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
		msg += '\n     Letters guessed: ' + this.gameWord.lettersguessed;
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
		this.userGuess(this,txt);
	} else {
		this.playAgain(this);
	}	
};

// ----------------------------------------------------------------------------
// Method: playAgain
// ----------------------------------------------------------------------------
// Description: Inquirer prompt to play again.
// ----------------------------------------------------------------------------
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
			console.log('\033c');
			gameobj.displayText('Thanks for playing!!!','=');
			gameobj.displayText('You won ' + gameobj.wins + ' games, and lost ' + gameobj.losses + ' games.','-');
		}
	});
};

module.exports = Game;