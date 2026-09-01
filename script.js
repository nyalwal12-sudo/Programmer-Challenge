// Get refrences to the HTML elements
const courseCards = document.getElementById('course-cards');
const searchInput = document.getElementById('descr');
const searchButton = document.getElementById('getCard');
const statusMessage = document.getElementById('status-message');
const randCards = document.getElementById('rand-cards');

//Displays 10 random course cards under the search bar on page load
async function displayRandomCourses() {
    setStatus('Loading random courses...');

    // Gets courses
    try {
        const response = await fetch('/api/courses');
        const courses = await response.json();

        if (!response.ok) {
            throw new Error(courses.error || 'The course data could not be loaded.');
        }

        const randomCourses = getRandomCourses(courses, 10);
        renderCourses(randomCourses, randCards);
        setStatus(`${randomCourses.length} random course${randomCourses.length === 1 ? '' : 's'} displayed.`);
    } catch (error) {
        randCards.replaceChildren();
        setStatus(error.message, true);
        console.error('Failed to load random courses:', error);
    }

}

//Gets a random selection of courses from a list
function getRandomCourses(courses, count) {
    const shuffled = [...courses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

//Escape HTML
function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Adds event listeners to the search button and input field
searchButton.addEventListener('click', () => loadSearchedCourses(searchInput.value));
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        loadSearchedCourses(searchInput.value);
    }
});

// Gets the courses and renders them on the page.
async function loadSearchedCourses(searchTerm = '') {
    setStatus('Loading courses...');
    randCards.replaceChildren();

    // Get courses from the server
    try {
        const query = searchTerm.trim() ? `?search=${encodeURIComponent(searchTerm.trim())}` : '';
        const response = await fetch(`/api/courses${query}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'The course data could not be loaded.');
        }

        renderCourses(result, courseCards);
        setStatus(`${result.length} course${result.length === 1 ? '' : 's'} found.`);
    } catch (error) {
        courseCards.replaceChildren();
        setStatus(error.message, true);
        console.error('Course search failed:', error);
    }
}

// Renders a limited number of courses in the requested container.
function renderCourses(courses, container, limit = 10) {
    container.innerHTML = '';

    courses.slice(0, limit).forEach(course => {
        container.appendChild(createCourseCard(course));
    });
}

// Creates course card elements
function createCourseCard(course) {
    const card = document.createElement('article');
    card.className = 'card';
    const courseCode = `${course.SUBJECT} ${course.CATALOG_NBR}`;
    const capacity = `${course.ENRL_TOT} / ${course.ENRL_CAP}`;

    card.innerHTML = `
        <div class="card-header">
            <h2>${escapeHtml(courseCode)}</h2>
            <span>Section ${escapeHtml(course.CLASS_SECTION)}</span>
        </div>
        <div class="card-body">
            <p class="card-title">${escapeHtml(course.DESCR)}</p>
            <dl>
                <div><dt>Class number</dt><dd>${escapeHtml(course.CLASS_NBR)}</dd></div>
                <div><dt>Component</dt><dd>${escapeHtml(course.SSR_COMPONENT)}</dd></div>
                <div><dt>Enrollment</dt><dd>${escapeHtml(capacity)}</dd></div>
                <div><dt>Location</dt><dd>${escapeHtml(course.LOCATION || 'TBA')}</dd></div>
            </dl>
        </div>
    `;
    return card;
}

// Sets the status and error message
function setStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle('error', isError);
}

displayRandomCourses();

