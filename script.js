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

const hand = document.getElementById("hand");

function displayCards(cards) {
  hand.innerHTML = "";

  cards.forEach((card) => {
    const img = document.createElement("img");

    img.src = card.image;
    img.alt = `${card.value} of ${card.suit}`;

    img.style.width = "120px";
    img.style.margin = "5px";

    hand.appendChild(img);
  });
}

const cards = await drawCards(deckId, 1);

displayCards(cards);

console.log(cards);

document.getElementById("draw").addEventListener("click", async () => {
  const cards = await drawCards(deckId, 1);

  displayCards(cards);
});

