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
  //Modificar tablero
  let data = document.getElementById("game");
  data.style.opacity = 1;

  //Ocultar boton
  document.getElementById("Start").style.display = "none";
  // Mostrar boton
  document.getElementById("Again").style.display = "inline";

  //Barajar cards
  cards.sort(function () {
    return Math.random() - 0.5;
  });
  //Asignamos los datos a las celdas de la tabla
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

  //Seleccionamos la segunda carta
  if (play1 !== "") {
    //Son iguales las cards
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
