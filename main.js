// @ts-nocheck
// Liste de mots ou phrases possibles
const messages = [
  "HELLO",
  "WORLD",
  "JULES",
  "CESAR",
  "ENCRYPT",
  "DECRYPT",
  "SECRET",
  "PUZZLE",
  "GAME",
  "FUN",
];

let currentShift = 0;
let currentMessage = "";

// Génère un indice d'encodage aléatoire entre 1 et 26
function generateRandomShift() {
  currentShift = Math.floor(Math.random() * 26) + 1;
  document.getElementById("shift").value = currentShift;
}

// Encode un message en fonction de l'indice d'encodage
function encodeMessage(message, shift) {
  return message
    .split("")
    .map((char) => {
      if (char.match(/[A-Z]/)) {
        let charCode = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
        return String.fromCharCode(charCode);
      } else {
        return char;
      }
    })
    .join("");
}

// Révèle la solution correcte
function revealSolution() {
  document.getElementById(
    "solutionText"
  ).textContent = `Réponse correcte : ${currentMessage}`;
  document.getElementById("solutionBox").style.display = "block";
}

// Initialise un nouveau jeu
function initializeGame() {
  document.getElementById("solutionBox").style.display = "none";
  currentMessage = messages[Math.floor(Math.random() * messages.length)];
  generateRandomShift();
  const encodedMessage = encodeMessage(currentMessage, currentShift);
  document.getElementById("codedMessage").textContent = encodedMessage;
}

// Vérifie la réponse de l'utilisateur
document.getElementById("submitButton").addEventListener("click", () => {
  const userAnswer = document
    .getElementById("decodedMessage")
    .value.trim()
    .toUpperCase();
  if (userAnswer === currentMessage) {
    alert("Bravo ! Vous avez trouvé la bonne réponse.");
    initializeGame();
  } else {
    alert("Dommage, essayez encore !");
  }
});

// Révèle la solution lorsque le bouton "Solution" est cliqué
document
  .getElementById("solutionButton")
  .addEventListener("click", revealSolution);

// Démarre le jeu lors du chargement de la page
window.onload = initializeGame;
