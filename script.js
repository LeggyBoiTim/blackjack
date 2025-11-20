const dealButton = document.getElementById('dealButton');
const passButton = document.getElementById('passButton');

const dealerHandRow = document.getElementById('dealerHand');
const playerHandRow = document.getElementById('playerHand');
const dealerScoreRow = document.getElementById('dealerScore');
const playerScoreRow = document.getElementById('playerScore');

const suits = ['\u2660', '\u2663', '\u2665', '\u2666']; // [Spades, Clubs, Hearts, Diamonds]
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const deck = [];

// Player class, used for both the dealer and the player.
class Player {
    constructor(name, handDisplay, scoreDisplay) {
        this.hand = [];
        this.score = 0;
        this.aceCount = 0;
        this.hasBlackjack = false;
        this.name = name;
        this.handDisplay = handDisplay;
        this.scoreDisplay = scoreDisplay;
    }

    // Add card to the player's hand.
    addCardToHand() {
        this.hand.push(deck.pop());
    }

    // Calculate the player's score, and keeps track of aces and blackjack.
    calculateScore() {
        this.score = 0;
        this.aceCount = 0;
        
        for (let card of this.hand) {
            let rank = card.charAt(card.length - 1);
            if (rank === '0' || rank === 'J' || rank === 'Q' || rank === 'K') {
                this.score += 10;
            } else if (rank === 'A') {
                this.score += 11;
                this.aceCount += 1;
            } else {
                this.score += Number(rank);
            }
        }

        while (this.score > 21 && this.aceCount > 0) {
            this.score -= 10;
            this.aceCount -= 1;
        }
        
        if (this.aceCount > 0 && this.score === 21 && this.hand.length === 2) {
            this.hasBlackjack = true;
        }
    }

    // Update the hand display.
    updateHandDisplay() {
        while (this.handDisplay.firstChild) {
            this.handDisplay.removeChild(this.handDisplay.firstChild);
        }
        
        for (let card of this.hand) {
            let newDiv = document.createElement('div');
            newDiv.className = 'card';
            newDiv.innerHTML = card;
            this.handDisplay.appendChild(newDiv);
        }
    }

    // Update the score display.
    updateScoreDisplay() {
        this.scoreDisplay.innerHTML = `${this.name}'s Score: ${this.score}`;
    }
}

// Create a deck of cards from the suits and ranks.
const createDeck = () => {
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push(suit + rank);
        }
    }
}

// Shuffles the deck using the Fisher-Yates shuffle.
const fisherYatesShuffle = () => {
    for (let i in deck) {
        let random = Math.floor(Math.random() * (deck.length - i));
        [deck[i], deck[Number(i) + random]] = [deck[Number(i) + random], deck[i]];
    }
}

const gameEnd = () => {
    dealer.handDisplay.children[1].classList.remove('hidden');
    dealer.scoreDisplay.classList.remove('hidden');
    passButton.disabled = true;
    dealButton.innerHTML = 'New Game'
    dealButton.setAttribute('onclick', 'location.reload()');
}

// Sets the game to the player having won.
const gameWin = () => {
    player.scoreDisplay.innerHTML = `${player.name}'s Score: ${player.score} Player won!`
    gameEnd();
}

// Sets the game to the player having lost.
const gameLose = () => {
    player.scoreDisplay.innerHTML = `${player.name}'s Score: ${player.score} Player lost!`
    gameEnd();
}

// Sets the game to a tie.
const gameTie = () => {
    player.scoreDisplay.innerHTML = `${player.name}'s Score: ${player.score} Tie!`
    gameEnd();
}

// Make the dealer draw cards until a win condition is met.
const dealerTurn = () => {
    while (dealer.score < 17) {
        dealer.addCardToHand();
        dealer.calculateScore();
        dealer.updateHandDisplay();
        dealer.updateScoreDisplay();
    }
    
    if (dealer.score > 21) {
        gameWin();
    } else if (dealer.score > player.score) {
        gameLose();
    } else if (dealer.score === player.score) {
        gameTie();
    } else {
        gameWin();
    }
}

// Deal both the dealer and the player the two starting cards each.
const deal = () => {
    for (let i = 0; i < 2; i++) {
        dealer.addCardToHand();
        player.addCardToHand();
    }
    
    dealer.calculateScore();
    player.calculateScore();
    
    dealer.updateHandDisplay();
    player.updateHandDisplay();
    
    dealer.updateScoreDisplay();
    player.updateScoreDisplay();
    dealer.handDisplay.children[1].classList.add('hidden');
    dealer.scoreDisplay.classList.add('hidden');
    dealButton.innerHTML = 'Hit';
    dealButton.setAttribute('onclick', 'hit()');
    passButton.disabled = false;
    if (player.hasBlackjack && dealer.hasBlackjack) {
        gameTie();
    } else if (dealer.hasBlackjack) {
        gameLose();
    } else if (player.hasBlackjack) {
        gameWin();
    }
}

// Make the player hit.
const hit = () => {
    player.addCardToHand();
    player.calculateScore();
    player.updateHandDisplay();
    player.updateScoreDisplay();
    if (player.score > 21) {
        gameLose();
    } else if (player.score === 21) {
        pass();
    }
}

// Make the player pass.
const pass = () => {
    dealer.handDisplay.children[1].classList.remove('hidden');
    dealer.scoreDisplay.classList.remove('hidden');
    dealerTurn();
}

const dealer = new Player('Dealer', dealerHandRow, dealerScoreRow);
const player = new Player('Player', playerHandRow, playerScoreRow);

createDeck();
fisherYatesShuffle();
console.log(suits, ranks, deck);