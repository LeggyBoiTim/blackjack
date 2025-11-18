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
        this.hasAce = false;
        this.hasBlackjack = false;
        this.name = name;
        this.handDisplay = handDisplay;
        this.scoreDisplay = scoreDisplay;
    }
    // Add card to the player's hand.
    addCardToHand() {
        this.hand.push(deck.pop());
    }
    // Calculate the player's score, and keeps track of blackjack.
    calculateScore() {
        this.score = 0;
        for (let card of this.hand) {
            let rank = card.charAt(card.length - 1);
            if (rank === '0' || rank === 'J' || rank === 'Q' || rank === 'K') {
                this.score += 10;
            } else if (rank === 'A') {
                this.score += 11;
                this.hasAce = true;
            } else {
                this.score += Number(rank);
            }
        }
        if (this.hasAce && this.score > 21) {
            this.score -= 10;
        } else if (this.hasAce && this.score === 21) {
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

const dealer = new Player('Dealer', dealerHandRow, dealerScoreRow);
const player = new Player('Player', playerHandRow, playerScoreRow);

// Create a deck of cards from the suits and ranks.
const createDeck = () => {
    for (let i in suits) {
        for (let j in ranks) {
            deck.push(suits[i] + ranks[j]);
        }
    }
}

// Shuffles the deck using the Fisher-Yates shuffle.
const fisherYatesShuffle = () => {
    for (let i in deck) {
        random = Math.floor(Math.random() * (52 - i));
        [deck[i], deck[Number(i) + random]] = [deck[Number(i) + random], deck[i]];
    }
}

// Checks the current state of the game. Returns true if the game has ended in some way.
const gameCheck = () => {
    
}

// Checks whether the dealer or player has won.
const gameEnd = () => {
    if (dealer.score > player.score) {

    } else if (dealer.score < player.score) {

    } else {

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
    gameCheck();
}

// Make the dealer draw cards until a win condition is met.
const dealerTurn = () => {
    dealer.addCardToHand();
    dealer.calculateScore();
    dealer.updateHandDisplay();
    dealer.updateScoreDisplay();
    gameCheck();
}

// Make the player hit.
const hit = () => {
    player.addCardToHand();
    player.calculateScore();
    player.updateHandDisplay();
    player.updateScoreDisplay();
    gameCheck();
}

// Make the player pass.
const pass = () => {
    dealer.handDisplay.children[1].classList.remove('hidden');
    dealer.scoreDisplay.classList.remove('hidden');
    gameCheck();
    dealerTurn();
}

createDeck();
fisherYatesShuffle();
console.log(suits, ranks, deck);