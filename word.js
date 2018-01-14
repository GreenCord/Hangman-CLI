var inquirer = require('inquirer');
var Letter = require('./letter');

function Word() {
	// No word when first created.
	this.word = '';

	// Set number of guesses for this word to 5 by default.
	this.guesses = 5;
	this.guessed = false;
	this.first = true;
}


Word.prototype.randomNumber = function(int){
	var max = Math.floor(int);
	var rnd = Math.floor(Math.random() * max);
	return rnd;
};

Word.prototype.getWord = function(arr){
// Get the index of the word to select from the array passed in.
	var arrLength = arr.length;
	var wordNum = this.randomNumber(arrLength);
// Set the object's word to the random word
	this.word = arr[wordNum];
};

Word.prototype.resetWord = function(){
	this.word = '';
	this.guesses = 5;
	this.guessed = false;
};

module.exports = Word;