var inquirer = require('inquirer');
var Letter = require('./letter');

function Word() {
	// No word when first created.
	this.word = '';

	// Set number of guesses for this word to 7 by default.
	this.guesses = 7;
	this.guessed = false;
	this.first = true;
	this.lettersguessed = [];
}


Word.prototype.randomNumber = function(int){
	var max = Math.floor(int);
	var rnd = Math.floor(Math.random() * max);
	return rnd;
};

Word.prototype.getWord = function(arr){
// Get the index of the word to select from the array passed in.
	console.log('[Debug] Getting word...');
	var arrLength = arr.length;
	var wordNum = this.randomNumber(arrLength);
// Set the object's word to the random word
	this.word = arr[wordNum];
	console.log('[Debug] Got word:',this.word);
};

Word.prototype.resetWord = function(){
	this.word = '';
	this.guesses = 7;
	this.guessed = false;
	this.first = true;
	this.lettersguessed = [];
};

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