const express = require('express');
const path = require('path');
const courses = require('./JSONdata-storage.json');

const app = express();
const port = process.env.PORT || 5500;

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

// API ROUTE
app.get('/api/courses', async (request, response) => {
    const filteredCourses = filterCourses(courses, request.query.search);
    response.json(filteredCourses);
});

// Serve the root website so GitHub Pages and local Express both use the same files.
app.use(express.static(path.join(__dirname, '..')));

// Start server
app.listen(port, () => {
    console.log(`Course catalog running at http://localhost:${port}`);
});
