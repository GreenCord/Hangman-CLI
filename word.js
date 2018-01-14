function Word() {
	console.log('I Worded.');
	// No word when first created.
	this.word = '';

	// Set number of guesses for this word to 5 by default.
	this.guesses = 5;
}


Word.prototype.randomNumber = function(int){
	var max = Math.floor(int);
	var rnd = Math.floor(Math.random() * max);
	return rnd;
};

Word.prototype.getWord = function(arr){
	console.log('Getting word from:',arr);
	var arrLength = arr.length;
	console.log('Array length:',arrLength);
	// Get the index of the word to select from the array passed in.
	var wordNum = this.randomNumber(arrLength);
	console.log('Index of word:',wordNum);
	// Set the object to the word
	this.word = arr[wordNum];
	console.log('Word selected:',arr[wordNum]);
	console.log('Word assigned to instance:',this.word);
};

Word.prototype.debugWord = function(){
	console.log('Debugging [Display Word]: ',this.word);
};

module.exports = Word;