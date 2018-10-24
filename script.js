// Assignment: Deck of Cards
// Create a Card class. A card should have the following functionality:

// Each Card should have a suit ("Hearts", "Clubs", "Diamonds", "Spades")
// Each Card should have a string value (eg, "Ace", "Two", ...., "Queen", "King")
// Each Card should have a numerical value (1-13)
// Each Card should have a show method (log the card's information to the console)
// Create a Deck class. A deck should have the following functionality:

// The Deck should contain the 52 standard Cards
// The Deck should be able to shuffle
// The Deck should be able to reset
// The Deck should be able to deal a random Card
// Deal should return the Card that was dealt and remove it from the Deck
// Now create a Player class. A Player should have the following functionality:

// The Player should have a name
// The Player should have a hand (an array of cards taken from a Deck)
// The Player should be able to take a Card (use the deck.deal method)
// The Player should be able to discard a Card

class Card {
    constructor(suit, value, point){
        this.suit = suit;  // => "Hearts, Clubs, Diamonds, Spades";
        this.value = value; // => "Ace, Two, Queen, King";
        this.point = point; // => 1 -11
    }
    info(){
        return this;
    }
}

class Deck {
    constructor(){
        // super(suit, value, point);
        this.base = [];
        this.buildDeck();
    }
    // build a typical deck of card => had to google this as I had no idea...
    buildDeck(){
        for(let i = 1; i < 14; i++){
            for(let j = 0; j < 4; j++){
                let value = '';
                let suit = '';
                let point = i;
                if(j == 0){
                    suit = 'Heart';
                }
                if(j == 1){
                    suit = 'Diamond';
                }
                if(j == 2){
                    suit = 'Club';
                }
                if(j == 3){
                    suit = 'Spade';
                }
                value = i.toString();
                if(i == 1){
                    value = 'Ace';
                    point = 1;
                }
                if(i == 11){
                    value = 'Jack';
                    point = 10;
                }
                if(i == 12){
                    value = 'Queen';
                    point = 10;
                }
                if(i == 13){
                    value = 'King';
                    point = 10;
                }
                this.base.push(new Card(suit, value, point));
            }
        }
    }
    // reset the deck
    reset(){
        this.base = [];  // set this.base back to an empty array
        this.buildDeck;  // rebuild deck with this.base emptied
    }

    // shuffle the deck
    shuffle(){
        let shuffledDeck = [];
        let activeCard = 0;
        // get a random value for the card
        while(activeCard < 52){
            // determind a random value and assign to randomNumber
            let randomNumber = Math.floor(Math.random() * 52);
            if(shuffledDeck[randomNumber] == null){
                shuffledDeck[randomNumber] = this.base[activeCard];
                activeCard++
            }
        }
    }
    // deal card
    dealCard(){
        let lastCardInDeck = this.base.length - 1;
        if(lastCardInDeck == 0){
            this.reset();   // reset the deck if the last card is dealt
            this.shuffle(); // then shuffle the deck
        }

        let cardToDeal = new Card();
        cardToDeal = this.base[lastCardInDeck];
        this.base.pop();
        return cardToDeal;
    }
}

class Player {
    constructor(name){
        this.name = name;
        this.hand = [];     // initialize an empty array for hand
        this.score = 0;     // set the score to 0
    }

    discardCard(index){
        this.hand.splice(index, 1);
    }

    discardHand(){
        this.hand = [];
    }

    addCard(card){
        this.hand.push(card);
    }
    
    revealHand(){
        console.log(`${this.hand}`);
    }

    getHandTotal(){
        let totalPoints = 0;
        for(let i = 0; i < this.hand.length; i++){
            if(this.hand[i].value == 'Ace'){
                if(totalPoints + 11 <= 21){
                    totalPoints += 11;
                } else {
                    totalPoints += 1;
                }
            } else {
                totalPoints += this.hand[i].point;
            }
        }
        return totalPoints;
    }
}

const firstDeck = new Deck();
firstDeck.shuffle();

var card1 = firstDeck.dealCard();

// create some players
const player1 = new Player('Jeremy');
const player2 = new Player('Anika');

player1.revealHand();

//Display Results
console.log("----------------------------------------------------------")
console.log(`Final Score: ${player1.name} - ${player1.score} : ${player2.name} - ${player2.score}`);
