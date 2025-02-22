import { GameBoard } from './gameboard.js';
import { Card, Decktet, DeckType } from './decktet.js';
import {
  PlayerID,
  Player_MultiPlayer,
  Player_SinglePlayer,
  Player_ComputerPlayer,
  SendCardPlaytoViewCB
} from './player.js';
import { io, Socket } from 'socket.io-client';

export type GameType = 'multiPlayer' | 'singlePlayer' | 'solitaire';
export type Layout = 'razeway' | 'towers' | 'oldcity' | 'solitaire';

const SOLITAIRE_BOARD_DIMENSIONS = 4;
const TWOPLAYER_BOARD_DIMENSIONS = 6;
export const BOARD_LAYOUTS = {
  razeway: ['x0y0', 'x1y1', 'x2y2', 'x3y3', 'x4y4', 'x5y5'],
  towers: ['x1y1', 'x4y1', 'x1y4', 'x4y4'],
  oldcity: ['x2y0', 'x4y1', 'x0y2', 'x5y3', 'x1y4', 'x3y5'],
  solitaire: ['x0y0', 'x0y3', 'x0y3', 'x3y3']
};

export class GameModel {
  board: GameBoard;
  deck: Decktet;
  sendCardPlaytoView: SendCardPlaytoViewCB | undefined;

  constructor(deckType: DeckType) {
    this.board = new GameBoard(TWOPLAYER_BOARD_DIMENSIONS);
    this.deck = new Decktet(deckType);
  }

  bindSendCardPlayToView(sendCardPlaytoView: SendCardPlaytoViewCB) {
    this.sendCardPlaytoView = sendCardPlaytoView;
  }
}

export class SinglePlayerGameModel extends GameModel {
  currPlyr: Player_SinglePlayer;
  opposPlyr: Player_ComputerPlayer;
  constructor(deckType: DeckType) {
    super(deckType);

    this.currPlyr = new Player_SinglePlayer('Player 1', this.board, this.deck);
    this.opposPlyr = new Player_ComputerPlayer(
      'Computer',
      this.board,
      this.deck,
      'Player 1',
      this.currPlyr.getInfluenceTokensNo,
      this.currPlyr.placeToken,
      this.currPlyr.undoPlaceToken
    );
  }

  public startGame(layout: Layout) {
    this.createLayout(this.board, this.deck, layout);
    this.currPlyr.drawStartingHand();
    this.opposPlyr.drawStartingHand();
  }

  private createLayout(board: GameBoard, deck: Decktet, layout: Layout) {
    const handleInitialPlacementCB = (spaceID: string) => {
      const card = deck.drawCard()!;
      const space = this.board.getSpace(spaceID)!;
      board.setCard(spaceID, card);
      if (this.sendCardPlaytoView) this.sendCardPlaytoView(card, space);
    };

    const layourArr = BOARD_LAYOUTS[layout];
    layourArr.forEach((spaceID) => handleInitialPlacementCB(spaceID));
  }
}

export class MultiplayerGameModel extends GameModel {
  socket: Socket;
  currPlyr: Player_MultiPlayer;
  opposPlyr: Player_MultiPlayer;
  constructor(deckType: DeckType, socket: Socket, currPlyrID: PlayerID) {
    super(deckType);
    this.socket = socket;

    socket.on('recieveLayoutCard', (cardID, spaceID) => {
      const space = this.board.getSpace(spaceID);
      if (!cardID || !space) return;
      const card = this.deck.getCardByID(cardID);
      if (!card) return;
      this.board.setCard(spaceID, card);
      if (this.sendCardPlaytoView) this.sendCardPlaytoView(card, space);
    });

    this.currPlyr = new Player_MultiPlayer(
      currPlyrID,
      this.board,
      this.deck,
      this.socket
    );

    const opposingPlyr = currPlyrID === 'Player 1' ? 'Player 2' : 'Player 1';

    this.opposPlyr = new Player_MultiPlayer(
      opposingPlyr,
      this.board,
      this.deck,
      this.socket
    );
  }

  public createLayout = (layout: Layout) => {
    const layoutArr = BOARD_LAYOUTS[layout];
    this.socket.emit('createStartingLayout', layoutArr);
    this.socket.emit('playerReady', 'Player 2');
  };
}
