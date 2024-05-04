let tree = {
    question: "Er det en pattedyr?",
    yes: {
        question: "har det fire ben?",
        yes: {
            question: "Har det pels?",
            yes: {
                question: "Er det en hund?",
                yes: null,
                no: null
            },
            no: {
                question: "Er det en fugl?",
                yes: null,
                no: null
            }
        },
        no: {
            question: "Er det en fisk?",
            yes: null,
            no: null
        }
    },
    no: {
        question: "Er det et krybdyr?",
        yes: {
            question: "Er det en slange?",
            yes: null,
            no: null
        },
        no: null
    }
};

let currentNode = tree;

function startGame() {
    displayQuestion(tree);
}

function displayQuestion(node) {
    const questionElement = document.getElementById("question");
    questionElement.textContent = node.question;

    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    // Remove previous event listeners
    yesButton.removeEventListener("click", handleYesClick);
    noButton.removeEventListener("click", handleNoClick);

    // Define the event handler functions
    function handleYesClick() {
        if (node.yes !== null) {
            currentNode = node.yes;
            displayQuestion(node.yes);
        } else {
            questionElement.textContent = "Jeg gættede dyret!";
        }
    }

    function handleNoClick() {
        if (node.no !== null) {
            currentNode = node.no;
            displayQuestion(node.no);
        } else {
            // Computeren kunne ikke gætte dyret
            questionElement.textContent = "Jeg kunne ikke gætte dyret.";
            // Kald funktionen learnFromMistake
            learnFromMistake();
        }
    }

    // Add the event listeners
    yesButton.addEventListener("click", handleYesClick);
    noButton.addEventListener("click", handleNoClick);
}
// Funktion til at håndtere brugerens input, når computeren ikke kan gætte dyret
function learnFromMistake() {
    const correctAnimal = prompt("Hvilket dyr var der tale om?");
    if (correctAnimal === null) return; // Stop the execution if the user hasn't provided an input
    console.log(correctAnimal); // Log the input

    const newQuestion = prompt("Hvilket spørgsmål kunne stilles efter det sidste for at identificere dyret korrekt?");
    if (newQuestion === null) return; // Stop the execution if the user hasn't provided an input
    console.log(newQuestion); // Log the input

    const oldQuestion = currentNode.question;

    const newAnimalNode = { question: "Er det en " + correctAnimal + "?", yes: null, no: null };


    // Opdater træstrukturen baseret på brugerens input
    currentNode.question = newQuestion;
    currentNode.yes = newAnimalNode;
    currentNode.no = { question: oldQuestion, yes: null, no: null };

    console.log("Træstrukturen er blevet opdateret:");
    console.log(tree);
}
const originalTree = JSON.parse(JSON.stringify(tree));

const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", function() {
    tree = JSON.parse(JSON.stringify(originalTree));
    currentNode = tree;
    startGame();
});

// Start spillet
startGame();
