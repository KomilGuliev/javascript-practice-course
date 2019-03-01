/*
GAME RULES:

- The game has 2 players. playing in rounds
- In each turn, player rolls a dice as many times as he whishes.
Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his rouds score gets lost. After that, 
it is the next player's turn
- The player can choose to 'Hold', which means that his roud score get added to his GLOABL score .
After that, it is the next player turn.
- The first player to reach 100 points on GLOBAL score wins the game

*/


/////////////////////////////////////////////////////////////////////////////
//Pig Game created without objects


/**************************************************
var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {

	if(gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;

		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'img/dice-' + dice + '.png';

		if(dice !== 1) {
			roundScore+= dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			
			nextPlayer();

		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	
	if(gamePlaying) {
		scores[activePlayer] += roundScore;
	
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		if(scores[activePlayer] >= 20) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.dice').style.display = 'none';
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', function() {
	init();
});

function nextPlayer() {
	activePlayer = activePlayer === 0 ? 1 : 0;
	roundScore = 0;

	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}


function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
}
***************************************/



//////////////////////////////////////////////////////////////////////
//Pig Game by Object

/************************************

function newPlayer(name, number) {
	return {
		name: name,
		number: number,
		playerNameUI: document.querySelector('#name-' + number),
		scoreUI: document.querySelector('#score-' + number),
		currentUI: document.querySelector('#current-' + number),
		playerPanel: document.querySelector('.player-' + number + '-panel'),
		toggleActive: function() {
			this.playerPanel.classList.toggle('active');
		},
		setActive: function () {
			this.playerPanel.classList.add('active');
		},
		setCurrentUI: function(roundScore) {
			this.currentUI.textContent = roundScore;
		},
		setWinner: function() {
			this.playerPanel.classList.add('winner');
			this.playerNameUI.textContent = 'Winner!';
		},
		setScore: function(roundScore) {
			this.score += roundScore;
			this.scoreUI.textContent = this.score;
		},
		rollDice: function() {
			return Math.floor(Math.random() * 6) + 1;
			
		},
		init: function() {
			this.score = 0;
			this.scoreUI.textContent = '0';
			this.currentUI.textContent = '0';
			this.playerNameUI.textContent = this.name;
			this.playerPanel.classList.remove('winner');

		}
	}
}

var GameController = {
	init: function() {
		this.roundScore = 0;

		this.players[0] = newPlayer('John',0);
		this.players[1] = newPlayer('Komil',1);

		this.players[0].init();
		this.players[1].init();

		//console.log(this.players);

		this.activePlayer = this.players[0];
		this.activePlayer.setActive();
		this.activePlayerIndex = 0;

		this.gamePlaying = true;
		this.diceDOM.style.display = 'none';
		console.log('Initialized');
	},
	players: [],
	diceDOM: document.querySelector('.dice'),
	updateDice: function(dice) {
		this.diceDOM.style.display = 'block';
		this.diceDOM.src = 'img/dice-' + dice + '.png';
	},
	rollTheDice: function() {
		console.log(this);
		console.log(this.gamePlaying);
		if(this.gamePlaying) {
			var dice = this.activePlayer.rollDice();
			console.log(dice);
			this.updateDice(dice);
			if(dice !== 1) {
				this.roundScore += dice;
				this.activePlayer.setCurrentUI(this.roundScore);
			} else {
				this.nextPlayer();
			}
		}
	},
	nextPlayer: function() {
		var activePlayer = this.activePlayer;
		//console.log(activePlayer);
		if(this.activePlayerIndex === 0) {
			activePlayer.setCurrentUI('0');
			this.activePlayerIndex = 1;
			this.activePlayer = this.players[1];
		} else {
			activePlayer.setCurrentUI('0');
			this.activePlayerIndex = 0;
			this.activePlayer = this.players[0];
		}

		console.log(this.activePlayer);
		this.players[0].toggleActive();
		this.players[1].toggleActive();

		this.roundScore = 0;
		this.diceDOM.style.display = 'none';
	},
	holdPlayer: function() {
		if(this.gamePlaying) {
			this.activePlayer.setScore(this.roundScore);
			if(this.activePlayer.score >= 20) {
				this.activePlayer.setWinner();
				this.activePlayer.toggleActive();
				this.gamePlaying = false;
			} else {
				this.nextPlayer();
			}
		}
	}

};

GameController.init();
//GameController.rollTheDice();

document.querySelector('.btn-new').addEventListener('click', function() {
	GameController.init();
});
document.querySelector('.btn-roll').addEventListener('click', function() {
	GameController.rollTheDice();
});
document.querySelector('.btn-hold').addEventListener('click', function () {
	GameController.holdPlayer();
});

*************************************/