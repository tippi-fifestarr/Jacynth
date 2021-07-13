//somehow+why exporting "types" for the different suits, decktype, and Rank?
export type Suit = 'Knots' | 'Leaves' | 'Moons' | 'Suns' | 'Waves' | 'Wyrms';
export type DeckType = 'basicDeck' | 'extendedDeck';
type Rank = 'Ace' | 'Numeral' | 'Crown' | 'Pawn' | 'Court';

//this is similar (or identical) to a struct in Solidity
//how is it used?
type RawCardObj = {
  name: string;
  id: string;
  rank: Rank;
  value: string;
  suit1: Suit;
  suit2: Suit;
  suit3: Suit;
};

const RAW_CARD_OBJECTS = [
  {
    name: 'Ace of Knots',
    id: '0',
    rank: 'Ace',
    value: '1',
    suit1: 'Knots',
    suit2: '',
    suit3: ''
  },
  {
    name: 'Ace of Leaves',
    id: '1',
    rank: 'Ace',
    value: '1',
    suit1: 'Leaves',
    suit2: '',
    suit3: ''
  },
  {
    name: 'Ace of Moons',
    id: '2',
    rank: 'Ace',
    value: '1',
    suit1: 'Moons',
    suit2: '',
    suit3: ''
  },
  {
    name: 'Ace of Suns',
    id: '3',
    rank: 'Ace',
    value: '1',
    suit1: 'Suns',
    suit2: '',
    suit3: ''
  },
  {
    name: 'Ace of Waves',
    id: '4',
    rank: 'Ace',
    value: '1',
    suit1: 'Waves',
    suit2: '',
    suit3: ''
  },
  {
    name: 'Ace of Wyrms',
    id: '5',
    rank: 'Ace',
    value: '1',
    suit1: 'Wyrms',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the AUTHOR',
    id: '6',
    rank: 'Numeral',
    value: '2',
    suit1: 'Moons',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the DESERT',
    id: '7',
    rank: 'Numeral',
    value: '2',
    suit1: 'Suns',
    suit2: 'Wyrms',
    suit3: ''
  },
  {
    name: 'the ORIGIN',
    id: '8',
    rank: 'Numeral',
    value: '2',
    suit1: 'Waves',
    suit2: 'Leaves',
    suit3: ''
  },
  {
    name: 'the JOURNEY',
    id: '9',
    rank: 'Numeral',
    value: '3',
    suit1: 'Moons',
    suit2: 'Waves',
    suit3: ''
  },
  {
    name: 'the PAINTER',
    id: '10',
    rank: 'Numeral',
    value: '3',
    suit1: 'Suns',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the SAVAGE',
    id: '11',
    rank: 'Numeral',
    value: '3',
    suit1: 'Leaves',
    suit2: 'Wyrms',
    suit3: ''
  },
  {
    name: 'the BATTLE',
    id: '12',
    rank: 'Numeral',
    value: '4',
    suit1: 'Wyrms',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the MOUNTAIN',
    id: '13',
    rank: 'Numeral',
    value: '4',
    suit1: 'Moons',
    suit2: 'Suns',
    suit3: ''
  },
  {
    name: 'the SAILOR',
    id: '14',
    rank: 'Numeral',
    value: '4',
    suit1: 'Waves',
    suit2: 'Leaves',
    suit3: ''
  },
  {
    name: 'the DISCOVERY',
    id: '15',
    rank: 'Numeral',
    value: '5',
    suit1: 'Suns',
    suit2: 'Waves',
    suit3: ''
  },
  {
    name: 'the FOREST',
    id: '16',
    rank: 'Numeral',
    value: '5',
    suit1: 'Moons',
    suit2: 'Leaves',
    suit3: ''
  },
  {
    name: 'the SOLDIER',
    id: '17',
    rank: 'Numeral',
    value: '5',
    suit1: 'Wyrms',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the LUNATIC',
    id: '18',
    rank: 'Numeral',
    value: '6',
    suit1: 'Moons',
    suit2: 'Waves',
    suit3: ''
  },
  {
    name: 'the MARKET',
    id: '19',
    rank: 'Numeral',
    value: '6',
    suit1: 'Leaves',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the PENITENT',
    id: '20',
    rank: 'Numeral',
    value: '6',
    suit1: 'Suns',
    suit2: 'Wyrms',
    suit3: ''
  },
  {
    name: 'the CASTLE',
    id: '21',
    rank: 'Numeral',
    value: '7',
    suit1: 'Suns',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the CAVE',
    id: '22',
    rank: 'Numeral',
    value: '7',
    suit1: 'Waves',
    suit2: 'Wyrms',
    suit3: ''
  },
  {
    name: 'the CHANCE MEETING',
    id: '23',
    rank: 'Numeral',
    value: '7',
    suit1: 'Moons',
    suit2: 'Leaves',
    suit3: ''
  },
  {
    name: 'the BETRAYAL',
    id: '24',
    rank: 'Numeral',
    value: '8',
    suit1: 'Wyrms',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the DIPLOMAT',
    id: '25',
    rank: 'Numeral',
    value: '8',
    suit1: 'Moons',
    suit2: 'Suns',
    suit3: ''
  },
  {
    name: 'the MILL',
    id: '26',
    rank: 'Numeral',
    value: '8',
    suit1: 'Waves',
    suit2: 'Leaves',
    suit3: ''
  },
  {
    name: 'the DARKNESS',
    id: '27',
    rank: 'Numeral',
    value: '9',
    suit1: 'Waves',
    suit2: 'Wyrms',
    suit3: ''
  },
  {
    name: 'the MERCHANT',
    id: '28',
    rank: 'Numeral',
    value: '9',
    suit1: 'Leaves',
    suit2: 'Knots',
    suit3: ''
  },
  {
    name: 'the PACT',
    id: '29',
    rank: 'Numeral',
    value: '9',
    suit1: 'Moons',
    suit2: 'Suns',
    suit3: ''
  },
  {
    name: 'the WINDFALL',
    id: '30',
    rank: 'Crown',
    value: '10',
    suit1: 'Knots',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the END',
    id: '31',
    rank: 'Crown',
    value: '10',
    suit1: 'Leaves',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the HUNTRESS',
    id: '32',
    rank: 'Crown',
    value: '10',
    suit1: 'Moons',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the BARD',
    id: '33',
    rank: 'Crown',
    value: '10',
    suit1: 'Suns',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the SEA',
    id: '34',
    rank: 'Crown',
    value: '10',
    suit1: 'Waves',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the CALAMITY',
    id: '35',
    rank: 'Crown',
    value: '10',
    suit1: 'Wyrms',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the EXCUSE',
    id: '36',
    rank: 'Excuse',
    value: '0',
    suit1: '',
    suit2: '',
    suit3: ''
  },
  {
    name: 'the BORDERLAND',
    id: '37',
    rank: 'Pawn',
    value: '11',
    suit1: 'Waves',
    suit2: 'Leaves',
    suit3: 'Wyrms'
  },
  {
    name: 'the HARVEST',
    id: '38',
    rank: 'Pawn',
    value: '11',
    suit1: 'Moons',
    suit2: 'Suns',
    suit3: 'Leaves'
  },
  {
    name: 'the LIGHT KEEPER',
    id: '39',
    rank: 'Pawn',
    value: '11',
    suit1: 'Suns',
    suit2: 'Waves',
    suit3: 'Knots'
  },
  {
    name: 'the WATCHMAN',
    id: '40',
    rank: 'Pawn',
    value: '11',
    suit1: 'Moons',
    suit2: 'Wyrms',
    suit3: 'Knots'
  },
  {
    name: 'the CONSUL',
    id: '41',
    rank: 'Court',
    value: '12',
    suit1: 'Moons',
    suit2: 'Waves',
    suit3: 'Knots'
  },
  {
    name: 'the ISLAND',
    id: '42',
    rank: 'Court',
    value: '12',
    suit1: 'Suns',
    suit2: 'Waves',
    suit3: 'Wyrms'
  },
  {
    name: 'the RITE',
    id: '43',
    rank: 'Court',
    value: '12',
    suit1: 'Moons',
    suit2: 'Leaves',
    suit3: 'Wyrms'
  },
  {
    name: 'the WINDOW',
    id: '44',
    rank: 'Court',
    value: '12',
    suit1: 'Suns',
    suit2: 'Leaves',
    suit3: 'Knots'
  }
] as RawCardObj[];

//type /class Card, constructed on top of the RawCardObj
export class Card {
  private name: string;
  private id: string;
  private rank: Rank;
  private value: number;
  private suits: Suit[];

  constructor(argObj: RawCardObj) {
    this.name = argObj.name;
    this.id = argObj.id;
    this.rank = argObj.rank;
    this.value = Number(argObj.value);
    this.suits = [];
    [argObj.suit1, argObj.suit2, argObj.suit3].forEach((suit) => {
      if (suit) this.suits.push(suit);
    });
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getRank() {
    return this.rank;
  }

  getValue() {
    return this.value;
  }

  getAllSuits() {
    return this.suits;
  }

  hasSuit(suit: Suit) {
    return this.suits.includes(suit);
  }
}

export class Decktet {
  //type for the this.cards is an array of Card types 
  private cards: Card[];
  private referenceDeck: Map<string, Card>;

  constructor(deckType: DeckType) {
    this.cards = [];
    this.referenceDeck = new Map();

    if (deckType === 'basicDeck') {
      for (const obj of RAW_CARD_OBJECTS) {
        if (['Ace', 'Numeral', 'Crown'].includes(obj.rank)) {
          const card = new Card(obj);
          this.cards.push(card);
          this.referenceDeck.set(card.getId(), card);
        }
      }
    } else {
      for (const obj of RAW_CARD_OBJECTS) {
        const card = new Card(obj);
        this.cards.push(card);
      }
    }
    this.shuffle();
  }

  drawCard() {
    return this.cards.pop();
  }

  getRemainingCards() {
    return this.cards.length;
  }

  shuffle() {
    for (let idx = this.getRemainingCards() - 1; idx > 0; idx--) {
      const newIndex = Math.floor(Math.random() * (idx + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[idx];
      this.cards[idx] = oldValue;
    }
  }

  getCardByID(cardID: string): Card | undefined {
    return this.referenceDeck.get(cardID);
  }

  getReferenceDeck() {
    return this.referenceDeck;
  }
}
