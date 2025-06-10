// Initialisering när sidan laddas om
window.onload = init;

/** Funktion för att initialisera applikationen och hämta information */ 
function init() {
    processImageData();
}

/**Hämta bilder med hundar från api 
 *  return {object} - returnerar en lista medn bilder
*/
async function getImagesInfo() {
    try {
        const imageResponse = await fetch(`https://dog.ceo/api/breeds/image/random/20`);
        const imageData = await imageResponse.json();
        return imageData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

/** Hämtar data från funktionen getImagesInfo och visa den 
 * @return {object} - returnerar en lista med bilder
*/
async function processImageData() {
    try {
        const imgResult = await getImagesInfo();
        console.log('Received data:', imgResult);
        imagesDisplay(imgResult);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

/** Visa bilder med hundar på webbsidan
 * Bilder hämtas från annat api med hjälp av "message"-nyckel
 * @param {object} data - objekt med lista med hundbilders URL
 */
function imagesDisplay(data) {
    const imageSectionEl = document.getElementById('images-container'); 
    // Rensa tidigare innehåll
    imageSectionEl.innerHTML = ''; 
    data.message.forEach( image=> {
        const imgEl = document.createElement('img');
        imgEl.src = image;
        imgEl.width = 200;
        imageSectionEl.appendChild(imgEl);
    });
}