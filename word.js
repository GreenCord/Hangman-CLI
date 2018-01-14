var inquirer = require('inquirer');
var Letter = require('./letter');


// Word constructor, creates a new word to play with.
function Word() {
	// No word when first created.
	this.word = '';

	// Set number of guesses for this word to 7 by default.
	this.guesses = 7;
	this.guessed = false;
	this.first = true;
	this.lettersguessed = [];
}

// ----------------------------------------------------------------------------
// Method: randomNumber(int)
// ----------------------------------------------------------------------------
// Description: Returns a number between 0 and int, exclusive.
//              This allows to choose a random index number for an array.
// ----------------------------------------------------------------------------
Word.prototype.randomNumber = function(int){
	var max = Math.floor(int);
	var rnd = Math.floor(Math.random() * max);
	return rnd;
};

// ----------------------------------------------------------------------------
// Method: getWord(arr)
// ----------------------------------------------------------------------------
// Description: Selects a random word from an array passed into the function.
// ----------------------------------------------------------------------------
Word.prototype.getWord = function(arr){
// Get the index of the word to select from the array passed in.
	console.log('[Debug] Getting word...');
	var arrLength = arr.length;
	var wordNum = this.randomNumber(arrLength);
// Set the object's word to the random word
	this.word = arr[wordNum];
	console.log('[Debug] Got word:',this.word);
};

// ----------------------------------------------------------------------------
// Method: resetWord
// ----------------------------------------------------------------------------
// Description: Reset the current instance of the Word to original values.
// ----------------------------------------------------------------------------
Word.prototype.resetWord = function(){
	this.word = '';
	this.guesses = 7;
	this.guessed = false;
	this.first = true;
	this.lettersguessed = [];
};

// ----------------------------------------------------------------------------
// Method: renderMan
// ----------------------------------------------------------------------------
// Description: The hangman object.
// ----------------------------------------------------------------------------
Word.prototype.renderMan = function(int){
	switch (int) {
		
		case (7):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('     ----------');
		break;

		case (6):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |    @');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('     ----------');
		break;

		case (5):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |    @');
		console.log('      |    |');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('     ----------');
		break;

		case (4):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |    @');
		console.log('      |   /|');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('     ----------');
		break;

		case (3):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |    @');
		console.log('      |   /|\\');
		console.log('      |');
		console.log('      |');
		console.log('      |');
		console.log('     ----------');
		break;

		case (2):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |    @');
		console.log('      |   /|\\');
		console.log('      |    |');
		console.log('      |');
		console.log('      |');
		console.log('     ----------');
		break;

		case (1):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |    @');
		console.log('      |   /|\\');
		console.log('      |    |');
		console.log('      |   /');
		console.log('      |');
		console.log('     ----------');
		break;

		case (0):
		console.log('       ____');
		console.log('      /    |');
		console.log('      |    @');
		console.log('      |   /|\\');
		console.log('      |    |');
		console.log('      |   / \\');
		console.log('      |');
		console.log('     ----------');
		break;

		default: 
		console.log('WAT HAPPEN DIS BROKE');
	}
};

module.exports = Word;