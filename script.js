// Get refrences to the HTML elements
const courseCards = document.getElementById('course-cards');
const searchInput = document.getElementById('descr');
const searchButton = document.getElementById('getCard');
const statusMessage = document.getElementById('status-message');
const randCards = document.getElementById('rand-cards');

function getProjectBaseUrl() {
    const pathname = window.location.pathname.endsWith('/')
        ? window.location.pathname
        : `${window.location.pathname}/`;

    return new URL(pathname, `${window.location.origin}`);
}

const staticCoursesUrl = new URL('back-end/JSONdata-storage.json', getProjectBaseUrl());

function filterCourses(allCourses, searchTerm = '') {
    const normalizedSearch = String(searchTerm || '').trim().toLowerCase();

    if (!normalizedSearch) {
        return allCourses;
    }

    return allCourses.filter(course =>
        [course.SUBJECT, course.CATALOG_NBR, course.DESCR]
            .some(value => String(value || '').toLowerCase().includes(normalizedSearch))
    );
}

async function loadCourseData(searchTerm = '') {
    const normalizedSearch = String(searchTerm || '').trim();
    const apiUrl = new URL('api/courses', getProjectBaseUrl());

    if (normalizedSearch) {
        apiUrl.searchParams.set('search', normalizedSearch);
    }

    try {
        const response = await fetch(apiUrl.href);

        if (response.ok) {
            const courses = await response.json();
            return { courses: filterCourses(courses, normalizedSearch) };
        }
    } catch (error) {
        console.warn('Express API unavailable, falling back to static JSON.', error);
    }

    const staticResponse = await fetch(staticCoursesUrl.href);

    if (!staticResponse.ok) {
        throw new Error('The course data could not be loaded.');
    }

    const courses = await staticResponse.json();
    return { courses: filterCourses(courses, normalizedSearch) };
}

//Displays 10 random course cards under the search bar on page load
async function displayRandomCourses() {
    setStatus('Loading random courses...');

    try {
        const { courses } = await loadCourseData();
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

    try {
        const { courses } = await loadCourseData(searchTerm);
        renderCourses(courses, courseCards);
        setStatus(`${courses.length} course${courses.length === 1 ? '' : 's'} found.`);
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

