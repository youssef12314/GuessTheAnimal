const tree = {
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

    // Event listener for 'Ja' knappen
    yesButton.addEventListener("click", function() {
        if (node.yes !== null) {
            displayQuestion(node.yes);
        } else {
            // Computeren har gættet dyret
            questionElement.textContent = "Jeg gættede dyret!";
            // Tilføj logik til at starte Del II
        }
    });

    // Event listener for 'Nej' knappen
    noButton.addEventListener("click", function() {
        if (node.no !== null) {
            displayQuestion(node.no);
        } else {
            // Computeren kunne ikke gætte dyret
            questionElement.textContent = "Jeg kunne ikke gætte dyret.";
            // Kald funktionen learnFromMistake
            learnFromMistake();
        }
    });
}

// Funktion til at håndtere brugerens input, når computeren ikke kan gætte dyret
function learnFromMistake() {
    const correctAnimal = prompt("Hvilket dyr var der tale om?");
    if (correctAnimal === null || correctAnimal.trim() === "") {
        alert("Du skal angive et gyldigt dyr.");
        return;
    }
    const newQuestion = prompt("Hvilket spørgsmål kunne stilles efter det sidste for at identificere dyret korrekt?");
    if (newQuestion === null || newQuestion.trim() === "") {
        alert("Du skal angive et gyldigt spørgsmål.");
        return;
    }
    // Opdater træstrukturen baseret på brugerens input
    currentNode.question = newQuestion;
    currentNode.yes = { question: "Er det en " + correctAnimal + "?", yes: null, no: null };
    currentNode.no = { ...currentNode };

    console.log("Træstrukturen er blevet opdateret:");
    console.log(tree);
}

// Start spillet
startGame();