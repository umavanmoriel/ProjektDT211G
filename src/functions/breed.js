// Initialisering när sidan laddas om
window.onload = init;

/** Funktion för att initialisera applikationen och hämta information */ 
function init() {
    processData();
}

/**Hämta data om hundar från api 
 *  return {object} - returnerar en lista med hunddata
*/
async function getBreedInfo() {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds?format=json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

/** Hämtar data från funktionen getBreedInfo och visa den 
 * @return {object} - returnerar en lista med hunddata
*/
async function processData() {
    try {
        const result = await getBreedInfo();
        console.log('Received data:', result);
        breedsInfoDisplay(result);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

/** Visa data om hundar på webbsidan
 * Loop listar varje hunds namn, beskrivning, ras och bild
 * Bilder hämtas från annat api
 * @param {object} data - objekt med lista med hundar
 */
function breedsInfoDisplay(data) {
    const breedSectionEl = document.getElementById('dogs-container'); 
    // Rensa tidigare innehåll
    breedSectionEl.innerHTML = ''; 

    // Loopa genom och skapa nya list element
    data.data.forEach(async (dog) => {
        const newSectionEl = document.createElement('section');
        //Lägger till class till element
        newSectionEl.className = 'dog-container';

        const breedNameEl = document.createElement('h2');
        const breedNameTextEl = document.createTextNode(dog.attributes.name);
        breedNameEl.appendChild(breedNameTextEl);
        newSectionEl.appendChild(breedNameEl); 

        const breedName = dog.attributes.name;
        const breedQueryName = breedName.split(" ")[1] || breedName;
        const key = 'hV8TwcwxRLCeMsnZTS3IqE42Qixd1durtF-HgOyHcrA';
        const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${breedQueryName}&client_id=${key}&per_page=1`);
        const imageData = await imageResponse.json();
        const imgEl = document.createElement('img');
        imgEl.src = imageData.results[0].urls.regular;
        imgEl.alt = breedName;
        newSectionEl.appendChild(imgEl);

        const breedDescEl = document.createElement('p');
        const breedDescTextEl = document.createTextNode(dog.attributes.description);
        breedDescEl.appendChild(breedDescTextEl);
        newSectionEl.appendChild(breedDescEl); 
    
        // Lägg till sektionen till container
        breedSectionEl.appendChild(newSectionEl);

        console.log(imageData);
    });
}

