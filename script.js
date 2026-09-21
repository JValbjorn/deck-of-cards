async function createDeck() {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
  );

  const data = await response.json();
  return data.deck_id;
}

const deckId = await createDeck();
console.log(deckId);

async function drawCards(deckId, count = 1) {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`,
  );

  const data = await response.json();
  return data.cards;
}

const hand1 = document.getElementById("hand1");
const hand2 = document.getElementById("hand2");
const result = document.getElementById("result");

function displayCards(cards, hand) {
  hand.innerHTML = "";

  cards.forEach((card) => {
    const img = document.createElement("img");

    img.src = card.image;
    img.alt = `${card.value} of ${card.suit}`;

    hand.appendChild(img);
  });
}

function cardValue(value) {
  const faceCards = { JACK: 11, QUEEN: 12, KING: 13, ACE: 14 };
  return faceCards[value] ?? Number(value);
}

let count1 = 0;
let count2 = 0;

function updateCount(player) {
  if (player === 1) {
    count1++;
    document.getElementById("count1").innerHTML = count1;
  } else {
    count2++;
    document.getElementById("count2").innerHTML = count2;
  }
}

let busy = false; 

async function game() {
  if (busy) return;
  busy = true;

  const cards = await drawCards(deckId, 2);

  if (!cards || cards.length < 2) {
    if (count1 > count2) result.textContent = "Spiller 1 vandt spillet!";
    else if (count2 > count1) result.textContent = "Spiller 2 vandt spillet!";
    else result.textContent = "Spillet endte uafgjort!";
    return;
  }

  const player1 = cards[0];
  const player2 = cards[1];

  displayCards([player1], hand1);
  displayCards([player2], hand2);

  const value1 = cardValue(player1.value);
  const value2 = cardValue(player2.value);

  if (value1 > value2) {
    console.log("Player 1 wins");
    result.textContent = "Spiller 1 vinder!";
    updateCount(1);
  } else if (value2 > value1) {
    console.log("Player 2 wins");
    result.textContent = "Spiller 2 vinder!";
    updateCount(2);
  } else {
    console.log("It's a draw");
    result.textContent = "Uafgjort!";
  }

  busy = false;
}

document.getElementById("draw").addEventListener("click", game);
document.getElementById("draw2").addEventListener("click", game);
