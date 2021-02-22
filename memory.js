/*Variables*/
let cards = [
  { name: "1", selection: false },
  { name: "2", selection: false },
  { name: "3", selection: false },
  { name: "4", selection: false },
  { name: "5", selection: false },
  { name: "6", selection: false },
  { name: "7", selection: false },
  { name: "8", selection: false },
  { name: "1", selection: false },
  { name: "2", selection: false },
  { name: "3", selection: false },
  { name: "4", selection: false },
  { name: "5", selection: false },
  { name: "6", selection: false },
  { name: "7", selection: false },
  { name: "8", selection: false }
];
let tries = 0;
let play1 = (play2 = "");
let idJ1 = (idJ2 = "");
let numTokens = 16;

window.onload = function () {
  document.getElementById("Start").addEventListener("click", startGame);
  document.getElementById("Again").addEventListener("click", playAgain)
  document.getElementById("Again").style.display = "none";
  for (let i = 0; i < numTokens; i++) {
    document.getElementById(i.toString()).addEventListener("click", rotateCard);
  }
};

//Functions of the game

function startGame() {
  //Modify the table
  let data = document.getElementById("game");
  data.style.opacity = 1;

  //Hide Button
  document.getElementById("Start").style.display = "none";
  // Show Restart button
  document.getElementById("Again").style.display = "inline";

  //sort cards
  cards.sort(function () {
    return Math.random() - 0.5;
  });
  //
  for (let i = 0; i < numTokens; i++) {
    let card = cards[i].name;
    let data = document.getElementById(i.toString());
    data.dataset.valor = card;
  }
}

function playAgain() {
  document.location.href = "";
  startGame();
}


function rotateCard() {
  let event = window.event;
  play2 = event.target.dataset.valor;
  idJ2 = event.target.id;

  //Selecting second card
  if (play1 !== "") {
    //Are the cards the same
    if (
      play1 === play2 &&
      cards[parseInt(idJ2)].selection != true &&
      cards[parseInt(idJ1)].selection != true
    ) {
      cards[parseInt(idJ2)].selection = true;
      cards[parseInt(idJ1)].selection = true;

      changeColor(idJ2, "plum", play2);
      cleanVariables();
      check();
    } else if (idJ1 != idJ2) {
      setTimeout(function () {
        changeColor(idJ1, "lightpink", "?");
        changeColor(idJ2, "lightpink", "?");
        cleanVariables();
      }, 500);
      changeColor(idJ2, "plum", play2);
    }
  } else if (play2 !== "void") {
    changeColor(idJ2, "plum", play2);
    play1 = play2;
    idJ1 = idJ2;
  }
}

function changeColor(position, color, number) {
  document.getElementById(position.toString()).style.backgroundColor = color;
  document.getElementById(position.toString()).innerHTML = number;
}

function cleanVariables() {
  play1 = play2 = "";
  idJ1 = idJ2 = "";
}

function check() {
  let correct = 0;
  for (let i = 0; i < numTokens; i++) {
    if (cards[i].selection == true) {
      correct++;
    }
  }
  if (correct == numTokens) {
    alert("Congrats!!! You WON!");
  }
}
