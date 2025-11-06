const dealButton = document.getElementById('dealButton');
const passButton = document.getElementById('passButton');

const dealerHandRow = document.getElementById('dealerHand');
const playerHandRow = document.getElementById('playerHand');
const dealerScoreDisplay = document.getElementById('dealerScore');
const playerScoreDisplay = document.getElementById('playerScore');

const suits = ['\u2660', '\u2663', '\u2665', '\u2666']; // [Spades, Clubs, Hearts, Diamonds]
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const deck = [];
const dealerHand = [];
const playerHand = [];

let dealerScore = 0;
let playerScore = 0;
let playerHasAce = false;

console.log(suits, ranks);

// Create a deck of cards from suits and ranks.
const createDeck = () => {
    for (let i in suits) {
        for (let j in ranks) {
            deck.push(suits[i] + ranks[j]);
        }
    }
}

// Return an array of shuffled cards using the Fisher-Yates shuffle.
const fisherYatesShuffle = () => {
    for (let i in deck) {
        random = Math.floor(Math.random() * (52 - i));
        [deck[i], deck[Number(i) + random]] = [deck[Number(i) + random], deck[i]];
    }
}

// Add a card to a given hand.
// hand: expects either dealerHand or playerHand.
const addCardToHand = (hand) => {
    card = deck.pop();
    hand.push(card);
    let newDiv = document.createElement('div');
    newDiv.className = 'card';
    newDiv.innerHTML = card;
    hand === dealerHand ? dealerHandRow.appendChild(newDiv) : playerHandRow.appendChild(newDiv);

}

// Sets playerHasAce to true if the player's hand has an ace.
const aceCheck = () => {
    for (let i in playerHand) {
        if (playerHand[i].charAt(playerHand[i].length - 1) === 'A') {
            playerHasAce = true;
            break;
        }
    }
}

// ---Doesn't work---
// Calculates the score of a given hand, keeping aces in mind.
const calcScore = (hand) => {
    hand === dealerHand ? dealerScore = 0 : playerScore = 0;
    for (let i in hand) {
        let rank = hand[i].charAt(hand[i].length - 1)
        if (rank === '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9') {
            hand === dealerHand ? dealerScore += Number(rank) : playerScore += Number(rank);
        } else if (rank === '0' || 'J' || 'Q' || 'K') {
            hand === dealerHand ? dealerScore += 10 : playerScore += 10;
        } else if (rank === 'A') {
            hand === dealerHand ? dealerScore += 11 : playerScore += 11;
        }
    }
    hand === dealerHand ? dealerScoreDisplay.innerHTML = `Dealer's Score: ${dealerScore}` : playerScoreDisplay.innerHTML = `Player's Score: ${playerScore}`;
}

// Deal both the dealer and the player the two starting cards each.
const deal = () => {
    for (let i = 0; i < 2; i++) {
        addCardToHand(dealerHand);
        addCardToHand(playerHand);
        aceCheck();
    }
    calcScore(dealerHand);
    calcScore(playerHand);
    dealerHandRow.children[1].id = 'dealerCard';
    dealButton.innerHTML = 'Hit';
    dealButton.setAttribute('onclick', 'hit()');
}

// Deal the player a card.
const hit = () => {
    addCardToHand(playerHand);
    aceCheck();
    calcScore(dealerHand);
    calcScore(playerHand);
}

const pass = () => {

}

createDeck();
fisherYatesShuffle();