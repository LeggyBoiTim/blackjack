// [Spades, Clubs, Hearts, Diamonds]
const suits = ['\u2660', '\u2663', '\u2665', '\u2666'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
// Create a deck of cards from suits and ranks.
const createDeck = () => {
    let deck = [];
    for (let i in suits) {
        for (let j in ranks) {
            deck.push(suits[i] + ranks[j]);
        }
    }
    return deck;
}
const deck = createDeck();
const dealerHand = [];
const playerHand = [];

console.log(suits, ranks, deck);

// Return an array of shuffled cards using the Fisher-Yates shuffle.
const fisherYatesShuffle = () => {
    for (let i in deck) {
        i = Number(i);
        random = Math.floor(Math.random() * (52 - i));
        [deck[i], deck[i + random]] = [deck[i + random], deck[i]];
    }
    console.log(deck);
}

fisherYatesShuffle();