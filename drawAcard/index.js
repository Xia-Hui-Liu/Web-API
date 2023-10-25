document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myBtn');

    button.addEventListener('click', (event) => {
        event.preventDefault();
        const url = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';
        const displayInfo = (data) => {
            const div = document.getElementById('display');

            // create a div to hold each card
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            div.appendChild(cardDiv);

            // create a h2 element for the card
            const h2 = document.createElement('h2');
            h2.innerHTML = `${data.suit} ${data.value}`;
            cardDiv.appendChild(h2);

            // create an img element for the card
            const img = document.createElement('img');
            const imgAtt = document.createAttribute("src");
            imgAtt.value = `${data.image}`;
            cardDiv.appendChild(img).setAttributeNode(imgAtt);  
        }
        const getData = async(url) => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                } 
                const data = await res.json();
                return data;
            } catch(error){
                console.error('Error:', error);
                throw error; 
            }
        }
        getData(url)
            .then(data => {
                displayInfo(data.cards[0]);
            })
            .catch(error => {
                console.error('Error', error);
            })
    })
})