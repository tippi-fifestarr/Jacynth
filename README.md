# Play Jacynth Online: The Multiplayer Decktet Card Strategy Board Game 
The game is played on a 6x6 grid. 
On each turn, a player places a tile to the grid. 
After doing this they may optionally place an influence token onto a tile on the board.
Placing a token on a tile creates a district which consists of all connected tiles that share the same suit as the card the token was placed on. 
It’s possible for a conflict of control to arise between two players tokens in which 1 player will lose control of their territory, making careful play important. 
At the end of the game the winner is the player in control of the most territory.

Thanks to [tippi fifestarr](https://docs.google.com/document/d/1gSOh652o_VuaMIhpcPCb6gOQvqDzA_c-RrF42cpAr0E/edit?usp=sharing) and [boardgamegeeks](https://boardgamegeek.com/thread/2680837/web-adaptation-jacynth) community for their support and brilliance.

This is an implementation of the card game [Jacynth](http://wiki.decktet.com/game:jacynth) from the [Decktet](https://www.decktet.com/). 

You can play the game [here](https://jacynth.herokuapp.com/)!

You can read about the creation of the app [here](https://dylan-cairns.github.io/Jacynth/).

Features:
- Written in Typescript
- MVC based design
  - Model - application data managment
  - View - visually represent the model
  - Controller - links user <=> system
- Express.js backend
- Singleplayer against "competent" rule-based AI
- Multiplayer enabled by Socket.io
- Mobile-first responsive design
- HTML 5 Drag and Drop interface with polyfill for mobile browsers

Desktop:
<p float="middle">
  <img src="screenshots/Screen Shot 2021-07-07 at 13.32.06.png" width="500" /> 
</p>
Mobile:
<p float="middle">
  <img src="screenshots/Screen Shot 2021-07-07 at 13.31.52.png" width="300" />
</p>

How to update or run (and grok) this code on your computer:
0: clone or fork the repo
1: look at the files for ~15 minutes

  - the files are in /dist/public/assets
  - gigantic styles.css in "/pubic/css
  - notice the difference between public/javascript/controller.js and controller.ts
  - realize this is a perfect case study to understand MVC based design
  - what are the benefits of this wacky structure?
  - did you need to write all that stuff, or was the whole public/javascripts generated from the typescripts?
  - in the controller ts, we are importing from the '../model/decktet.js'; '../model/player.js';
  - and { MultiPlayerView, SinglePlayerView, View } from '../view/view.js';
  - so looks like just a massive blunk of dunks.  gonna take whole pomodoros, might want to watch an explainer video about MVC first
  - and maybe something about typescript?
  - but first, continue spending time on these files

2: zoom in on decktet.js + decktet.ts

  - this is the code that is responsible for the model of the decktet and all its functions
  - left a bunch of comments in there
  - a huge object (hand-coded?) "cards", some functions to assemble a deck and "shuffle" them
  - 
3: read about the creation of the app for 5 minutes?

  - great description of what is the game [here](https://dylan-cairns.github.io/Jacynth/).
  - Coding the logic : The game board : "Initially I started with a 2d array. But I realized that I can get the benefits of a 2d array by using xy coordinates as the ID in a JavaScript Map() , but that it would be much simpler to iterate over." 
    - what?
    - 
4: next step, zoom in on "gameboard.js"

5: A district is any contiguous collection of cards which share the same suit. Recursion was an obvious choice for this problem. 
  - why?


nested iterations losing context? refactor to an arrow function!

6: key Concepts

  - decktet + card
  - gameboard (x y array somehow? checking for available spaces, results, space, resolve influence, district )
  - player
  - model
  - view


7: added socket.on('messageReceived') into player.ts on line 173

8: Views: (home.pug update titles)

9: running this code on local computer

  - npm install
  - npm run start
  - notice the socket.io console.log (a user connected, join room-0)
  - 
10: search all files for "join room" find it in server.js/.ts

11: new key concept: SERVER

  - server deals cards to players, server transpits a card ID, the client use to find the card from its own local copy.
  - 
