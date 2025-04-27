// Initialisering när sidan laddas om
window.onload = init;

// Funktion för att initialisera applikationen och hämta information
function init() {
    processData();
}

//Hämta information
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

// Användning av den asynkrona funktionen
async function processData() {
    try {
        const result = await getBreedInfo();
        console.log('Received data:', result);
        breedsInfoDisplay(result);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

// Visa information för hundraser
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
        const breedQueryName = breedName.toLowerCase().split(" ")[1];
        const imageResponse = await fetch(`https://dog.ceo/api/breed/${breedQueryName}/images/random`);
        const imageData = await imageResponse.json();
        const imgEl = document.createElement('img');
        imgEl.src = imageData.message;
        imgEl.alt = breedName;
        imgEl.width = 300;
        newSectionEl.appendChild(imgEl);

        const breedDescEl = document.createElement('p');
        const breedDescTextEl = document.createTextNode(dog.attributes.description);
        breedDescEl.appendChild(breedDescTextEl);
        newSectionEl.appendChild(breedDescEl); 
    
        // Lägg till sektionen till container
        breedSectionEl.appendChild(newSectionEl);

    });
}

/*
//Hämta information
async function getBreedImg() {
    try {
        const imageResponse = await fetch(`https://dog.ceo/api/breed/${breedNameEl}/images/random`);
        const imageData = await imageResponse.json();
        return imageData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

// Användning av den asynkrona funktionen
async function processImgData() {
    try {
        const imgResult = await getBreedImg();
        console.log('Received data:', imgResult);
        breedsImgDisplay(imgResult);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

// Visa bild för kurser
function coursesInfoDisplays() {
    const imgEl = document.createElement('img');
    imgEl.src = imageData.message;
    imgEl.alt = breedNameEl;
    imgEl.width = 200;
    newSectionEl.appendChild(imgEl);

    // Lägg till sektionen till container
    breedSectionEl.appendChild(newSectionEl);
}
*/