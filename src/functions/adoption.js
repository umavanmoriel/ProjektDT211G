window.onload = init;

// Funktion för att initialisera applikationen och hämta information
function init() {
    processDogData();
}

//Hämta information
async function getDogInfo() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/umavanmoriel/ProjektDT211Gapi/refs/heads/main/dog-adoption.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

// Användning av den asynkrona funktionen
async function processDogData() {
    try {
        const result = await getDogInfo();
        console.log('Received data:', result);
        DogsInfoDisplay(result);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

// Visa information för hundar som ska adopteras
function DogsInfoDisplay(data) {
    const dogsSectionEl = document.getElementById('adoptionDogs-container'); 
    // Rensa tidigare innehåll
    dogsSectionEl.innerHTML = ''; 

    // Loopa genom och skapa nya list element
    data.forEach(dog => {
        const newSectionEl = document.createElement('section');
        //Lägger till class till element
        newSectionEl.className = 'dog-container';

        const dogNameEl = document.createElement('h2');
        const dogNameTextEl = document.createTextNode(dog.name);
        dogNameEl.appendChild(dogNameTextEl);
        newSectionEl.appendChild(dogNameEl); 

        const dogDescEl = document.createElement('p');
        const dogDescTextEl = document.createTextNode(dog.description);
        dogDescEl.appendChild(dogDescTextEl);
        newSectionEl.appendChild(dogDescEl); 

        const dogBreedEl = document.createElement('p');
        const dogBreedTextEl = document.createTextNode(dog.breed);
        dogBreedEl.appendChild(dogBreedTextEl);
        newSectionEl.appendChild(dogBreedEl);

        const dogAgeEl = document.createElement('p');
        const dogAgeTextEl = document.createTextNode(dog.age);
        dogAgeEl.appendChild(dogAgeTextEl);
        newSectionEl.appendChild(dogAgeEl); 
    
        // Lägg till sektionen till container
        dogsSectionEl.appendChild(newSectionEl);

    });
}
