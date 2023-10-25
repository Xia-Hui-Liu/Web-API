document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let userInput = document.getElementById("textInput").value;
        let url = `https://www.swapi.tech/api/people/?name=${userInput}`;

        // function to display date in the textarea
        const displayInfo = (data) => {
            try {
                let resultText = document.getElementById("resultText");

                const infoStrings = [];

                infoStrings.push(`Description: ${data[0].description}`);

                for (const [key, value] of Object.entries(data[0].properties)) {
                    infoStrings.push(`${key}: ${value}`);
                }
                const infoString = infoStrings.join('\n');
                resultText.value = infoString;
            } catch(error){
                console.error('Error:', error);
                throw error; 
            }
        }

        // function to get data from star wars api
        const getData = async(url) => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                } 
                const data = res.json();
                return data;
            } catch(error){
                console.error('Error:', error);
                throw error; 
            }
        };
          
        getData(url)
            .then(data => displayInfo(data.result))
            .catch(error => {
                console.error('Error', error);
            })
    })
})

