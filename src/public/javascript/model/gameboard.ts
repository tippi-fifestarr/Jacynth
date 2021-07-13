//typescript has imports vs javascript?
//clues to what data are we working with here
import { Suit, Card, Decktet } from './decktet.js';
import { PlayerID } from './player.js';

//this has private demarkation and key/value pairs before constructor
//the name BoardSpace indicates this a fillable "square"
export class BoardSpace {
  private id: string;
  //this is the Card "struct" found in decktet.ts:426 
  private card: Card | undefined;
  private playerToken: PlayerID | undefined;
  private controllingSpaceBySuit: Map<Suit, string>;

  //it looks like id: string is a clue to the format
  //probably the "type" in typescript.  
  constructor(id: string) {
    this.id = id;
    this.card = undefined;
    this.playerToken = undefined;
    this.controllingSpaceBySuit = new Map();
  }
  //the BoardSpace has an ID and starts empty ("undefined") by default.
  setCard(card: Card): boolean {
    if (this.getCard()) throw new Error('space already has card');
    this.card = card;
    return true;
  }

  setPlayerToken(playerID: PlayerID) {
    if (!this.getCard()) return false;
    if (this.getPlayerToken()) return false;
    this.playerToken = playerID;
    return true;
  }

  setControlbySuit(suit: Suit, id: string) {
    if (!this.getCard()) throw new Error('no card on space, cannot be claimed');
    this.controllingSpaceBySuit.set(suit, id);
  }

  getID() {
    return this.id;
  }

  getCard() {
    return this.card;
  }

  getPlayerToken() {
    return this.playerToken;
  }

  getControlledSuitsMap() {
    return this.controllingSpaceBySuit;
  }

  getControllingSpaceID(suit: Suit) {
    return this.controllingSpaceBySuit.get(suit);
  }

  removeCard() {
    this.card = undefined;
  }

  removePlayerToken() {
    this.playerToken = undefined;
    this.resetSuitsControlMap();
  }

  resetSuitsControlMap() {
    this.controllingSpaceBySuit = new Map();
  }
}

export class GameBoard {
  private boardSize: number;
  private spaces: Map<string, BoardSpace>;
  private remainingSpaces: number;
  constructor(boardSize: number) {
    this.boardSize = boardSize;
    this.remainingSpaces = boardSize * boardSize;
    this.spaces = new Map();
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const newID = `x${x}y${y}`;
        const newSpace = new BoardSpace(newID);
        this.spaces.set(newID, newSpace);
      }
    }
  }

  getBoardSize() {
    return this.boardSize;
  }

  getSpace = (spaceID: string) => {
    if (this.spaces.get(spaceID) !== undefined) {
      return this.spaces.get(spaceID);
    }
  };

  getAllSpaces() {
    return this.spaces;
  }

  getCard(spaceID: string) {
    return this.spaces.get(spaceID)?.getCard();
  }

  getPlayerToken(spaceID: string) {
    return this.spaces.get(spaceID)?.getPlayerToken();
  }

  getControllingSpace(spaceID: string, suit: Suit) {
    return this.spaces.get(spaceID)?.getControllingSpaceID(suit);
  }

  getRemainingSpacesNumber(): number {
    return this.remainingSpaces;
  }

  //when setting down the car, check the space is empty and if the space.setCard can set the card?
  setCard(spaceID: string, card: Card): boolean {
    const space = this.getSpace(spaceID);
    if (!space) return false;
    //not sure what this is?
    if (!space.setCard(card)) return false;
    //update remainingSpaces and resolve the influence calculation
    this.remainingSpaces--;
    this.resolveInflunceForEntireBoard();
    return true;
  }

  getAdjacentSpaces(spaceID: string): BoardSpace[] {
    const x = parseInt(spaceID[1]);
    const y = parseInt(spaceID[3]);
    const results = [] as BoardSpace[];
    const adjArr = [
      [x - 1, y],
      [x, y - 1],
      [x + 1, y],
      [x, y + 1]
    ];

    adjArr.forEach((coord) => {
      const x = coord[0];
      const y = coord[1];
      if (x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize) {
        const space = this.spaces.get(`x${coord[0]}y${coord[1]}`);
        if (space) results.push(space);
      }
    });
    return results;
  }

  getDiagonalSpaces(spaceID: string) {
    const x = parseInt(spaceID[1]);
    const y = parseInt(spaceID[3]);
    const diagArr = [
      [x - 1, y - 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x + 1, y + 1]
    ];
    const resultsArr = [];
    for (const coord of diagArr) {
      const space = this.spaces.get(`x${coord[0]}y${coord[1]}`);
      if (space) resultsArr.push(space);
    }
    return resultsArr;
  }

  // To be available, a space must be empty
  // and adjacent to an already played card
  isPlayableSpace(spaceID: string): boolean {
    const space = this.spaces.get(spaceID);
    if (!space) return false;
    if (space.getCard()) return false;

    const adjArr = this.getAdjacentSpaces(spaceID);
    for (let idx = 0; idx < adjArr.length; idx++) {
      if (adjArr[idx].getCard()) {
        return true;
      }
    }
    return false;
  }

  //looks like it only checks isPlayableSpace when this happens
  //can't see when this gets called in this doc (so it must be externally facing)
  getAvailableSpaces = (): BoardSpace[] => {
    const results = [] as BoardSpace[];
    this.spaces.forEach((space) => {
      const id = space.getID();
      if (this.isPlayableSpace(id)) {
        results.push(space);
      }
    });
    //return results
    return results;
  };

  //results = [] as BoardSpace. any explain in the docs?
  //start with a single spaceID and a suit to check the districtness?
  getDistrict(spaceID: string, suit: Suit): BoardSpace[] {
    //a district is an Array of BoardSpace(s)
    //results is the answer to the question/method
    const results = [] as BoardSpace[];
    const currentSpace = this.getSpace(spaceID);
    //empty something i dunno
    if (!currentSpace) return results;
    //run getCard on the currentSpace
    const currentCard = currentSpace.getCard();
    if (!currentCard || !currentCard.hasSuit(suit)) return results;

    results.push(currentSpace);

    const searchConnectedTiles = (spaceID: string, suit: Suit) => {
      this.getAdjacentSpaces(spaceID).forEach((space) => {
        if (!results.includes(space)) {
          const card = space.getCard();
          if (card) {
            if (card.getAllSuits().includes(suit)) {
              results.push(space);
              searchConnectedTiles(space.getID(), suit);
            }
          }
        }
      });
    };
    searchConnectedTiles(spaceID, suit);
    return results;
  }

  //key function concept
  resolveInfluence = (boardSpace: BoardSpace) => {
    const card = boardSpace.getCard();
    if (!card) throw new Error('no card on space');
    const suits = card.getAllSuits();
    suits.forEach((suit) => {
      const district = this.getDistrict(boardSpace.getID(), suit);
      let spacesWithTokens = district.filter((space) => space.getPlayerToken());
      if (spacesWithTokens.length > 0) {
        spacesWithTokens = spacesWithTokens.sort((spaceA, spaceB) => {
          const cardA = spaceA.getCard();
          const cardB = spaceB.getCard();
          if (!cardA || !cardB)
            throw new Error('no card on space during resolveInfluence');
          const cardAValue = cardA.getValue();
          const cardBValue = cardB.getValue();
          return cardBValue - cardAValue;
        });
        const controllingSpace = spacesWithTokens[0];
        district.forEach((space) => {
          space.setControlbySuit(suit, controllingSpace.getID());
        });
      }
    });
  };

  resolveInflunceForEntireBoard = () => {
    this.spaces.forEach((space) => {
      space.resetSuitsControlMap();
    });
    this.spaces.forEach((space) => {
      if (space.getCard()) {
        this.resolveInfluence(space);
      }
    });
  };

  removeCardAndResolveBoard = (spaceID: string) => {
    const space = this.spaces.get(spaceID);
    if (space) {
      space.removeCard();
      space.resetSuitsControlMap();
    }
    this.remainingSpaces++;
    this.resolveInflunceForEntireBoard();
  };

  removePlayerTokenAndResolveBoard = (spaceID: string) => {
    this.spaces.get(spaceID)?.removePlayerToken();
    this.resolveInflunceForEntireBoard();
  };

  // get all spaces which a player can place a token on.
  // A valid space must have a card, must not have a token already,
  // and must not be part of another players district in any suit.
  getAvailableTokenSpaces = (playerID: PlayerID): BoardSpace[] => {
    // for each space on the board
    const results = [] as BoardSpace[];
    for (const [, space] of this.spaces) {
      // if no card or already has token, move to next space
      if (!space.getCard() || space.getPlayerToken()) continue;
      const controlSuits = space.getControlledSuitsMap();
      // if controlledsuitsMap is empty, it's definitely available.
      if (controlSuits.size === 0) {
        results.push(space);
        continue;
      } else {
        // check if the controlling space belongs to another player for each suit.
        let ownedByOtherPlayer = false;
        for (const [, controllingId] of controlSuits) {
          const spaceToCheckOwnerOf = this.getSpace(controllingId);
          if (!spaceToCheckOwnerOf)
            throw new Error('reference to nonexistant space');
          if (spaceToCheckOwnerOf.getPlayerToken() !== playerID) {
            ownedByOtherPlayer = true;
            break;
          }
        }
        // if it doesn't belong to any other player, add it to the results
        if (!ownedByOtherPlayer) results.push(space);
      }
    }
    return results;
  };

  setPlayerToken = (spaceID: string, playerID: PlayerID): boolean => {
    const currentSpace = this.getSpace(spaceID);
    if (!currentSpace) throw new Error('attempt to claim nonexistant space');
    const currentCard = currentSpace.getCard();
    if (!currentCard) throw new Error('cannot claim empty space');
    if (currentSpace.getPlayerToken()) return false;

    // check if space is on the list of available token spaces
    const availableSpaces = this.getAvailableTokenSpaces(playerID);
    if (!availableSpaces.includes(currentSpace)) {
      console.log('space to place token: ', currentSpace);
      console.log('playeriD: ', playerID);
      console.log('board: ', this.spaces);
      throw new Error('cannot place token on controlled space');
    }

    // if no marker and not controlled by another player, place
    // marker and claim all districts
    currentSpace.setPlayerToken(playerID);
    this.resolveInflunceForEntireBoard();
    return true;
  };

  getPlayerScore = (playerID: string): number => {
    let score = 0;
    this.spaces.forEach((space) => {
      if (space.getCard()) {
        space.getControlledSuitsMap().forEach((controllingSpaceID) => {
          const controllingSpace = this.spaces.get(controllingSpaceID);
          const controllingPlayerID = controllingSpace?.getPlayerToken();
          if (controllingPlayerID === playerID) score += 1;
        });
      }
    });
    return score;
  };

  getSpacesControlledByToken = (spaceID: string) => {
    const resultsTuples = [] as [string, string][];
    for (const [id, space] of this.spaces) {
      const card = space.getCard();
      if (!card) continue;

      const controlMap = space.getControlledSuitsMap();

      for (const [suit, controllingSpaceID] of controlMap) {
        if (controllingSpaceID === spaceID) {
          resultsTuples.push([space.getID(), suit]);
        }
      }
    }
    return resultsTuples;
  };
}
