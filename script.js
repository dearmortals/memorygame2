

    // Set up global variables for use throughout code
    var matches = 0;                // Variables for basic scoring
    var tries = 0;
    var cardsOpen = 0;              // Number of cards open (turned over)
    var cardsDisplay = ["",""];     // Array for holding the two cards that are flipped over
    var arr = [];                   // General array for holding all cards

    // Start a new game
    //   Reset values, hide (or show) relevant elments
    function newGame() {
      // Set or reset game variables
      matches = 0;
      tries = 0;
      cardsOpen = 0;
      document.getElementById("gameover").style.visibility = "hidden";
      document.getElementById("help").style.visibility = "hidden";

      // Shuffle cards and update the scoring window
      shuffleCards();
      updateScore();

      // Set or reset the cards on the playboard
      var cards = document.getElementsByClassName("card");
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.visibility = "visible";
      }
    }

    // Do when a card is clicked
    function clickCard(card) {
      // Disallow clicks on a card that's already open
      if (card.src.indexOf("BuzzFeed.png") == -1 && cardsOpen == 1) { return; }
      cardsOpen++;                  // Increment cardsOpen variable
      if (cardsOpen < 3) {          // Do if cardsOpen is <=2
        cardsDisplay[cardsOpen] = card.id;
        card.src = card.alt;        // Get hidden source number of card from alt tag, show image on card
        if (cardsOpen == 2) {       // Two cards are now open
          tries++;
          // If cards match, hide them, and reset play for the next two cards
          if (document.getElementById(cardsDisplay[1]).alt == document.getElementById(cardsDisplay[2]).alt) {
              document.getElementById(cardsDisplay[1]).style.visibility = "hidden";
              document.getElementById(cardsDisplay[2]).style.visibility = "hidden";
              cardsOpen = 0;
              cardsDisplay.fill("");
              matches++;
              updateScore();
          }
        }
      } else {                      // Revert to showing back of card if cardsOpen > 2
        for (var i = 1; i < cardsDisplay.length; i++) {
          if (cardsDisplay[i] != "") {
            var card = document.getElementById(cardsDisplay[i]);
            card.src = "./assets/buzzfeed.png";
          }
        }
        cardsOpen = 0;
        cardsDisplay.fill("");
      }
      updateScore();
    }

    // Update the score window with tries, matches, and GAME OVER text
    function updateScore() {
      document.getElementById("tries").innerText = tries;
      document.getElementById("matches").innerText = matches;
      if (matches == 6) {
        document.getElementById("gameover").style.visibility = "visible";
      }
    }

    // Create a deck of cards in an array, and shuffle them to present a random set each play
    function shuffleCards() {
      var starting = 1;
      while(starting < 13) {          // Create array with numbers 1-25
        arr.push(starting++);
      }
      shuffle(arr);                   // Do an initial shuffle
      arr.splice(0, 6);              // Trim off all but the last half of numbers
      shuffle(arr);                   // Do another shuffle
      arr.splice(7, 20);              // Remove all but the first 6 elements
      arr = arr.concat(arr);          // Make second set of 6 elements (12 elements total)
      shuffle(arr);                   // Shuffle the combined sets of numbers twice for a good mix-up
      shuffle(arr);
      var cards = document.getElementsByClassName("card");
      for (var i = 0; i < cards.length; i++) {
        // Set all cards to show back of card
        cards[i].src = "./assets/BuzzFeed.png";
        // Assign full filename to alt tag of randomized card number
        document.getElementById("card" + (i+1)).alt = "./assets/doggo" + arr[i] + ".jpg";
      }
    }

    // Generic array shuffle function
    function shuffle(array) {
      // stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
