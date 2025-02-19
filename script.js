const emojis = ["🥀", "🥀", "💐", "💐", "😍", "😍", "😂", "😂", "🚘", "🚘", "🏎️", "🏎️"];
let shuffledEmojis = emojis.sort(() => Math.random() - 0.5); // Better shuffle

let selectedCards = [];
let matchedPairs = 0;

const gameContainer = document.querySelector(".game");

// Create cards
shuffledEmojis.forEach((emoji) => {
    let card = document.createElement("div");
    card.classList.add("item");
    card.innerHTML = `<span class="emoji">${emoji}</span>`;
    
    // Hide emoji initially
    card.querySelector(".emoji").style.visibility = "hidden";

    card.addEventListener("click", function () {
        if (selectedCards.length < 2 && !selectedCards.includes(this) && !this.classList.contains("boxMatch")) {
            flipCard(this);
        }
    });

    gameContainer.appendChild(card);
});

// Flip Card
function flipCard(card) {
    card.querySelector(".emoji").style.visibility = "visible"; // Show emoji
    card.classList.add("boxOpen");
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        checkMatch();
    }
}

// Check if two opened cards match
function checkMatch() {
    let [card1, card2] = selectedCards;

    if (card1.innerHTML === card2.innerHTML) {
        card1.classList.add("boxMatch");
        card2.classList.add("boxMatch");
        matchedPairs += 2;

        if (matchedPairs === emojis.length) {
            setTimeout(() => alert("🎉 You Win! 🎉"), 300);
        }
    } else {
        setTimeout(() => {
            card1.querySelector(".emoji").style.visibility = "hidden";
            card2.querySelector(".emoji").style.visibility = "hidden";
            card1.classList.remove("boxOpen");
            card2.classList.remove("boxOpen");
        }, 800);
    }

    selectedCards = []; // Reset selected cards
}
