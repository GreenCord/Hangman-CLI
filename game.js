var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var wordList = require('./wordList');


var gameWord = new Word();
var letters = [];
var guessedcount = 0;

var dbg = process.argv[2];

function playAgain(){
	inquirer.prompt([
		{
			type: 'list',
			name: 'again',
			message: 'Play again?',
			choices: ['Yes','No']
		}
	]).then(function(user){
		if (user.again === 'Yes') {
			initGame();
		} else {
			console.log('\033c');
			displayText('Thanks for playing!!!','=');
			return;
		}
	});
}

function displayText(txt,char) {
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
}

function initGame(){
// Reset word, select new word, create letters
	gameWord.resetWord();
	gameWord.getWord(wordList);
	letters = [];
	for (var i = 0; i < gameWord.word.length; i++) {
		letters[i] = new Letter(gameWord.word[i]);
	}
	displayWord('Guess a letter: ');
}

function userGuess(message) {
	// Get user's letter to guess
	inquirer.prompt([
		{
			type: 'input',
			name: 'guess',
			message: message
		}
	])
	.then(
		function(user){
			guessedcount = 0;
			var existingmatch = false;
			var txt = '';
			// check guess against previously guessed letters
			for (var i = 0; i < gameWord.lettersguessed.length; i++) {
				if (user.guess.toLowerCase() === gameWord.lettersguessed[i].toLowerCase()) {
					existingmatch = true;
				}
			}

			// check guess against all letters, mark guessed as true for matches
			for (var j = 0; j < letters.length; j++) {
				if (user.guess.toLowerCase() === letters[j].letter.toLowerCase()) {
					letters[j].guessed = true;
					guessedcount++;
				} // end if
			} // end for

			if (existingmatch) {
				txt = 'You already guessed that letter. Guess another letter: ';
			} else if (guessedcount === 0) {
				txt = 'Letter not found. Uh oh. \nGuess a letter: ';
				gameWord.guesses--;
				gameWord.lettersguessed.push(user.guess);
			} else {
				txt = 'Guess a letter: ';
			}
			displayWord(txt);
	});
}

function getTrue(){
	var int = 0;
	for (var i = 0; i < letters.length; i++) {
		if (letters[i].guessed) {
			int++;
		}
	}
	return int;
}

function displayWord(txt) {
	var msg = 'Word to Guess: ';
	console.log('\033c');
	displayText('Hangman - THE GAME','=');

// RENDER THE POOR, POOR HANGED MAN
	gameWord.renderMan(gameWord.guesses);

// Run through word's letters, display the guessed ones.
	for (var i = 0; i < letters.length; i++) {
		if (letters[i].guessed) {
			msg += letters[i].letter + ' ';
		} else {
			msg += letters[i].display + ' ';
		}
	}
	displayText('' + msg.trim(),'-');

// Display guesses remaining and the letters guessed so far
	msg = 'Guesses remaining: ' + gameWord.guesses;
	if (gameWord.lettersguessed.length > 0) {
		msg += ' | Letters guessed: ' + gameWord.lettersguessed;
	}
	displayText(msg+'\n');

// check if won or lost
	if (getTrue() === letters.length) {
		displayText('Congratulations! You won.','=');
		gameWord.guessed = true;
	} else  if	(gameWord.guesses <= 0) {
		displayText('YOU LOST. HA HA','=');
	}

// get user guess if guesses remaining, or else the game is over, ask to play again
	if ((gameWord.guesses > 0) && !gameWord.guessed) {
		gameWord.first = false;
		userGuess(txt);
	} else {
		playAgain();
	}	
}

initGame();





