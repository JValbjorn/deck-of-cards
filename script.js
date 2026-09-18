function drawCard(flip) {
  card = document.getElementById("draw-card");
  card.addEventListener("click", () => {
    card.classList.toggle("fliped");
  });
  console.log(card);
}

drawCard();
