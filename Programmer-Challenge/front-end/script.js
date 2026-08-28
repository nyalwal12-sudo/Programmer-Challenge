// front-end/script.js

document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-container');
    const searchInput = document.getElementById('search-input');
    const loadingIndicator = document.getElementById('loading-indicator');
    const resultCount = document.getElementById('result-count');

    const fetchCourses = async (searchTerm = '') => {
        loadingIndicator.style.display = 'block';
        try {
            const response = await fetch(`/api/courses?search=${searchTerm}`);
            const courses = await response.json();
            displayCourses(courses);
            resultCount.textContent = `Results: ${courses.length}`;
        } catch (error) {
            console.error('Error fetching courses:', error);
            resultCount.textContent = 'Error fetching courses';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    };

    const displayCourses = (courses) => {
        courseContainer.innerHTML = '';
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p><strong>Catalog Number:</strong> ${course.catalog_number}</p>
                <p><strong>Subject:</strong> ${course.subject}</p>
            `;
            courseContainer.appendChild(courseCard);
        });
    };

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.trim();
        fetchCourses(searchTerm);
    });

    // Initial fetch of courses
    fetchCourses();
});