var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var wordList = require('./wordList');


var word = new Word();
var letters = [];

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
			console.log('Thanks for playing!');
			return;
		}
	});
}

function initGame(txt){
	word.resetWord();
// Select word
	word.getWord(wordList);
	console.log('[Debug] Word selected:',word);
// Create Letters
	for (var i = 0; i < word.word.length; i++) {
		letters[i] = new Letter(word.word[i]);
	}
	console.log('[Debug] Letters:', letters);
	displayWord();
}

function userGuess() {
	console.log('[Debug] Getting user input...');
	inquirer.prompt([
		{
			type: 'input',
			name: 'guess',
			message: 'Guess a letter: '
		}
	])
	.then(
		function(user){
			console.log('[Debug] User Guess: ',user.guess);
			for (var i = 0; i < letters.length; i++) {
				if (user.guess.toLowerCase() === letters[i].letter.toLowerCase()) {
					letters[i].guessed = true;
				}
			}
			displayWord();
		});
}

function displayWord() {
	var msg = '';
	var letterGuessed = false;
	var guessedcount = 0;
	console.log('[Debug] Displaying word. Guesses remaining:',word.guesses);
	
// Run through word's letters, display the guessed ones. Count
// when a letter was guessed successfully.
	for (var i = 0; i < letters.length; i++) {
		if (letters[i].guessed) {
			msg += letters[i].letter + ' ';
			guessedcount++;
		} else {
			msg += letters[i].display + ' ';
		}
	}
	console.log(':: ' + msg.trim() + ' ::');

	// check if won or lost
	if (guessedcount === letters.length) {
		console.log('Congratulations! You won.');
		word.guessed = true;
	} else  if	(word.guesses <= 0) {
		console.log('YOU LOST. HA HA');
	}
	// get user guess if guesses remaining
	if ((word.guesses > 0) && !word.guessed) {
		word.guesses--;
		userGuess();
	} else {
		playAgain();
	}	
}



// If guesses is > 0
// Prompt User and Display Letters/Placeholder
// Process letter
// If wrong, decrement guesses
// If right, display letters and prompt again
// If already guessed, just re-prompt
initGame();





