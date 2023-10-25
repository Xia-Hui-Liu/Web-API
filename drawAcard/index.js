
document.getElementById('myBtn').addEventListener('click', async function() {
    // get deck id
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    const deckId = data.deck_id;
    // use deck id to draw cards
    const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);
    const drawData = await drawResponse.json();
    const drawnCards = drawData.cards;

    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';

    drawnCards.forEach(card => {
        const cardElement = document.createElement('img');
        cardElement.classList.add('card');
        cardElement.src = card.image;
        cardElement.alt = `${card.value} of ${card.suit}`;
        cardsContainer.appendChild(cardElement);
    });
});
