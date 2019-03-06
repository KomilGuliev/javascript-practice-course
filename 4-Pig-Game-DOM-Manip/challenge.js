/*
CHALLENGE NEW RULES:
1. A player looses his ENTIRE score whe he rolls two 6 in a row. After that, it's the next players's
turn. (Hint: Always save the previous dice roll in a separate variables)
2. Add an input field to the HTML where players can set the winning score, so that they can change predefined
score of 100. (Hint: you read that value with the .value propery in JavaScript.
This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so what there two dices now. The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look ath the CSS.)

*/


/////////////////////////////////////////////////////////////////////////////
//Pig Game created without objects


/*************************************************
var scores, roundScore, activePlayer, gamePlaying, lastDice = [], winnerScore;
init();

document.querySelector('.save-winner-score').addEventListener('click', function(event) {
	var winInput = document.querySelector('#winner-score');
	var wScore = winInput.value;
	if(wScore) {
		winnerScore = wScore;
	} else {
		winnerScore = 100;
	}
	winInput.disabled = true;
	event.target.style.display = 'none';
})

document.querySelector('.btn-roll').addEventListener('click', function() {

	if(gamePlaying) {
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		var dice = dice1 + dice2;

		var diceDOM1 = document.querySelector('.dice-1');
		var diceDOM2 = document.querySelector('.dice-2');
		diceDOM1.style.display = 'block';
		diceDOM2.style.display = 'block';
		diceDOM1.src = 'img/dice-' + dice1 + '.png';
		diceDOM2.src = 'img/dice-' + dice2 + '.png';
		if(dice === 6 && lastDice[0] === 6 && lastDice[1] === 6) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
			lastDice = 0;
		} else if(dice1 !== 1 && dice2 !== 1) {
			roundScore+= dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			
			nextPlayer();

		}
		lastDice[0] = dice1;
		lastDice[1] = dice2;
 	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	
	if(gamePlaying) {
		scores[activePlayer] += roundScore;
	
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		if(scores[activePlayer] >= winnerScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.dice-2').style.display = 'none';
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

	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';
}


function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.save-winner-score').style.display = 'block';
	document.querySelector('#winner-score').disabled = false;

	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

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

*********************************************************/


//////////////////////////////////////////////////////////////////////
//Pig Game by Object

/*
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
			this.scoreUI.textContent = this.score.toString();
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

		this.winInput.disabled = false;
		this.saveScoreBtn.style.display = 'block';

		//console.log(this.players);

		this.activePlayer = this.players[0];
		this.activePlayer.setActive();
		this.activePlayerIndex = 0;

		this.gamePlaying = true;
		this.diceDOM1.style.display = 'none';
		this.diceDOM2.style.display = 'none';
		console.log('Initialized');
	},
	winnerScore: 50,
	isSetScore: false,
	saveScoreBtn: document.querySelector('.save-winner-score'),
	winInput: document.querySelector('#winner-score'),
	players: [],
	lastDice: [0,0],
	diceDOM1: document.querySelector('.dice-1'),
	diceDOM2: document.querySelector('.dice-2'),
	updateDice: function(dice1, dice2) {
		this.diceDOM1.style.display = 'block';
		this.diceDOM1.src = 'img/dice-' + dice1 + '.png';

		this.diceDOM2.style.display = 'block';
		this.diceDOM2.src = 'img/dice-' + dice2 + '.png';
	},
	setDefaultWinScore: function() {
		this.winInput.value = 50;
		this.winnerScore = 50;
		this.winInput.disabled = true;
		this.saveScoreBtn.style.display = 'none';
	},
	rollTheDice: function() {
		if(!this.isSetScore) {
			this.setDefaultWinScore();
		}

		if(this.gamePlaying) {
			var dice1 = this.activePlayer.rollDice(), dice2 = this.activePlayer.rollDice();
			var dice = dice1 + dice2;
			//console.log(dice);
			this.updateDice(dice1, dice2);
			if(dice === 6 && (this.lastDice[0] === 6 || this.lastDice[1] === 6)) {
				this.activePlayer.setScore(0);
				this.nextPlayer();
				this.lastDice = 0;
			} else if(dice1 !== 1 & dice2 !== 1) {
				this.roundScore += dice;
				this.activePlayer.setCurrentUI(this.roundScore);
			} else {
				this.nextPlayer();
			}
		}
		this.lastDice = dice;
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

		//console.log(this.activePlayer);
		this.players[0].toggleActive();
		this.players[1].toggleActive();

		this.roundScore = 0;
		this.diceDOM1.style.display = 'none';
		this.diceDOM2.style.display = 'none';
	},
	holdPlayer: function() {
		if(this.gamePlaying) {
			this.activePlayer.setScore(this.roundScore);
			if(this.activePlayer.score >= this.winnerScore) {
				this.activePlayer.setWinner();
				this.activePlayer.toggleActive();
				this.gamePlaying = false;
			} else {
				this.nextPlayer();
			}
		}
	},
	setWinnerScore: function() {
		var winInput = this.winInput;
		var score = winInput.value;
		if(score) {
			this.winnerScore = score;
		} 
		winInput.disabled = true;
		this.saveScoreBtn.style.display = 'none';
		this.isSetScore = true;
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
document.querySelector('.save-winner-score').addEventListener('click', function () {
	GameController.setWinnerScore();
});

**********************************************/