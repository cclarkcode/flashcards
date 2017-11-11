var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');

//A data set for generic basic cards
var basicdata = [
['What is the capital of Texas?','Austin'],
['What is the capital of California?','Sacramento'],
['What is the capital of New York?','Albany'],
['What is the capital of Illinois?','Springfield'],
['What is the capital of Kansas?','Topeka'],
['What is the capital of Georgia?','Atlanta'],
['What is the capital of Ohio?','Columbus'],
['What is the capital of Washington?','Olympia'],
['What is the capital of Colorado?','Denver'],
['What is the capital of Arizona?','Phoenix'],
['What is the capital of Florida?','Tallahassee'],
['What is the capital of Tennessee?','Nashville'],
['What is the capital of Massachusetts?','Boston'],
['What is the capital of New Jersey?','Trenton'],
['What is the capital of Virginia?','Richmond'],
['What is the capital of North Carolina?','Raleigh'],
['What is the capital of Nebraska?','Omaha'],
['What is the capital of Utah?','Salt Lake City'],
['What is the capital of Idaho?','Boise'],
['What is the capital of Louisiana?','Baton Rouge']
]

//A data set for generic cloze cards
var clozedata = [
['Michael Jordan won six championships as a member of the Chicago Bulls.','six'],
['American Pharoah was the first horse to win the Triple Crown in 37 years.','Triple Crown'],
['In 2016, the Chicago Cubs won their first World Series since 1908.','Chicago Cubs'],
['The Boston Celtics have won 17 NBA championships, the most of any team.','17'],
['Barry Bonds has hit the most home runs in baseball history','Barry Bonds'],
['Wilt Chamberlain scored 100 points in a single game, the most ever in an NBA game','100'],
['Micahel Phelps is the most decorated Olympian ever, winning 23 gold medals in swimming','swimming'],
['Brazil won their 5th World Cup in Japan in 2002, the most of any country','Brazil']
]

//Run functions to generate generic cards
var basiccards = creategeneric(basicdata);
var clozecards = creategenericcloze(clozedata);
var customcards = [];

//Begin program logic;
runprogram();

//Creates generic array of basic cards
function creategeneric(cardDataArray) {
	var returnarray = [];
	for (var i = 0; i < cardDataArray.length; i++) {
		var newcard = new BasicCard(cardDataArray[i][0],cardDataArray[i][1]);
		if (newcard !== undefined) {
			returnarray.push(newcard);
		}
	}

	return returnarray;

}

//Creates generic array of cloze cards
function creategenericcloze(cardDataArray) {
	var returnarray = [];
	for (var i = 0; i < cardDataArray.length; i++) {
		var newcard = new ClozeCard(cardDataArray[i][0],cardDataArray[i][1]);
		if (newcard !== undefined) {
			returnarray.push(newcard);
		}
	}

	return returnarray;

}

function runprogram() {

	inquirer.prompt([
	{
		type: 'list',
		name: 'choice',
		message: 'What would you like to do?',
		choices: ['Create a basic flash card','Create a cloze flash card','Test yourself with existing flashcards','Quit']
	}
	]).then(function(res) {

		if (res.choice === 'Create a basic flash card') {
			createbasic();
		}
		if (res.choice === 'Create a cloze flash card') {
			createcloze();
		}
		if (res.choice === 'Test yourself with existing flashcards') {
			flashcardtest();
		}

	});

}

function createbasic() {

	inquirer.prompt([
	{
		name: 'front',
		message: 'What goes on the front of the flashcard?'
	},
	{
		name: 'back',
		message: 'What goes on the back of the flashcard?'
	}
	]).then(function(res){
		var newcard = new BasicCard(res.front,res.back);
		if (newcard.front !== undefined) {
			customcards.push(newcard);
		}
		else {
			console.log('I\'m sorry, that was not a valid card.')
		}

		runprogram();

	})
}

function createcloze() {

	inquirer.prompt([
	{
		name: 'full',
		message: 'What is the full text of the flashcard?'
	},
	{
		name: 'cloze',
		message: 'What text should be removed from the flashcard (i.e. the cloze)?'
	}
	]).then(function(res){
		var newcard = new ClozeCard(res.full,res.cloze);
		if (newcard.cloze !== undefined) {
			customcards.push(newcard);
		}
		else {
			console.log('I\'m sorry, that was not a valid card.')
		}

		runprogram();

	})
}

function flashcardtest() {

	inquirer.prompt([
	{
		type: 'list',
		name: 'testchoice',
		message: 'What set of flashcards would you like to use?',
		choices: ['Generic Basic (State Capitals)','Generic Cloze (Sports)','Custom Set']
	}
	]).then(function(res){

		if (res.testchoice === 'Generic Basic (State Capitals)') {
			runtest(basiccards,0,0);
		}
		if (res.testchoice === 'Generic Cloze (Sports)') {
			runtest(clozecards,0,0);
		}
		if (res.testchoice === 'Custom Set') {
			if (customcards.length>0) {
				runtest(customcards,0,0);
			}
		}
	})
}

function runtest(cardarray,index,correct) {

	if (index < cardarray.length) {

		if (cardarray[index].front === undefined) {
			inquirer.prompt([ 
			{
				name: 'answer',
				message: 'What is the missing text?\n' + cardarray[index].partial
			}
			]).then(function(res){
				if (res.answer === cardarray[index].cloze) {
					console.log ('Correct!'); 
					runtest(cardarray,index+1,correct+1);
				} 
				else {
					console.log('Sorry, the answer was ' + cardarray[index].cloze);
					runtest(cardarray,index+1,correct);
				}
			});
		}
		else {
			inquirer.prompt([ 
			{
				name: 'answer',
				message: cardarray[index].front
			}
			]).then(function(res){
				if (res.answer === cardarray[index].back) {
					console.log ('Correct!'); 
					runtest(cardarray,index+1,correct+1);
				} 
				else {
					console.log('Sorry, the answer was ' + cardarray[index].back);
					runtest(cardarray,index+1,correct);
				}
			});
		}


	}
	else {
		console.log('\nThat\'s it, you got ' + correct + ' out of ' + cardarray.length + ' cards right.\n');
		runprogram();
	}
}

