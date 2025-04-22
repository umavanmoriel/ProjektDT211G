// Initialisering när sidan laddas om
window.onload = init;

// Funktion för att initialisera applikationen och hämta information
function init() {
    processData();
}

//Hämta kurser
async function getCoursesInfo() {
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
        const result = await getCoursesInfo();
        console.log('Received data:', result);
        coursesInfoDisplay(result);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

// Visa information för kurser
function coursesInfoDisplay(data) {
    const coursesListEl = document.getElementById('adoption-container'); 
    // Rensa tidigare innehåll
    coursesListEl.innerHTML = ''; 

    // Loopa genom och skapa nya list element
    data.data.forEach(dog => {
        const newRowEl = document.createElement('section');

        const courseCodeEl = document.createElement('h2');
        const courseCodeTextEl = document.createTextNode(dog.attributes.name);
        courseCodeEl.appendChild(courseCodeTextEl);
        newRowEl.appendChild(courseCodeEl); 

        const courseNameEl = document.createElement('p');
        const courseNameTextEl = document.createTextNode(dog.attributes.description);
        courseNameEl.appendChild(courseNameTextEl);
        newRowEl.appendChild(courseNameEl); 

        coursesListEl.appendChild(newRowEl);
    });
}
