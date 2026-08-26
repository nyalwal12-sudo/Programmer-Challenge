// Global variable
let courseData = [];

// Loads CSV when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCSVData();
    setupEventListeners();
});

// Fetches information from the CSV file, converts it to JSON, and parses it into an array of objects
function loadCSVData() {
    //FETCH CSV FILE
    fetch('../catalog dev.csv')

        //CONVERTS TO JSONDATA
        .then(response => response.json())

        //PARSES JSONDATA INTO AN ARRAY OF OBJECTS
        .then(jsonData => {
            courseData = parseCSV(jsonData);
            courseData = [...courseData];
           // displayAllCards();
        })
        .catch(error => console.error('Error loading CSV:', error));

}

// Sort JSON data in a neat and organized manner (not currently working)
function sortjsonData(line) {  
}

// Display all course cards (in progress)
function displayAllCards() {
    const courseCards = document.getElementById('course-cards');
    courseCards.innerHTML = ''; // clears cards before displaying new ones
}

// Create a course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const courseCode = `${course.SUBJECT} ${course.CATALOG_NBR}`;
    const capacity = `${course.ENRL_TOT} / ${course.ENRL_CAP}`;
    
    card.innerHTML = `
        <div class="card-header">
            <h3>${courseCode}</h3>
            <span class="card-section">Section ${course.CLASS_SECTION}</span>
        </div>
        <div class="card-body">
            <p class="card-title"><strong>${course.DESCR}</strong></p>
            <div class="card-details">
                <p><strong>Class Number:</strong> ${course.CLASS_NBR}</p>
                <p><strong>Component:</strong> ${course.SSR_COMPONENT}</p>
                <p><strong>Enrollment:</strong> ${capacity}</p>
                <p><strong>Location:</strong> ${course.LOCATION || 'TBA'}</p>
                <p><strong>Dates:</strong> ${course.START_DT} to ${course.END_DT}</p>
                <p><strong>Status:</strong> ${course.CLASS_STAT}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    const searchBtn = document.getElementById('getCard');
    const searchInput = document.getElementById('descr');
    
    searchBtn.addEventListener('click', function() {
        searchCourses();
    });
    
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchCourses();
        }
    });
}

// Search courses by description, subject, or course number (in progress)
function searchCourses() {   
}
