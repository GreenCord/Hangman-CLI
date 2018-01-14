var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var wordList = require('./wordList');

function playGame(){
// Select Word
	var word = new Word();
	console.log('New word:',word);

	console.log('Word List:',wordList);
	word.getWord(wordList);
	word.debugWord();
}


// Create Letters
// If guesses is > 0
// Prompt User and Display Letters/Placeholder
// Process letter
// If wrong, decrement guesses
// If right, display letters and prompt again
// If already guessed, just re-prompt

playGame();