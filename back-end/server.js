const express = require('express');
const path = require('path');
const courses = require('./JSONdata-storage.json');

const app = express();
const port = process.env.PORT || 5500;

// API ROUTE
app.get('/api/courses', async (request, response) => {
    const searchTerm = String(request.query.search || '').trim().toLowerCase();
    const filteredCourses = searchTerm
        ? courses.filter(course =>
            [course.SUBJECT, course.CATALOG_NBR, course.DESCR]
            .some(value => String(value || '').toLowerCase().includes(searchTerm))
        )
        : courses;

    response.json(filteredCourses);
});

// Serve static files AFTER API routes
app.use(express.static(path.join(__dirname, '..', 'front-end')));

// Start server
app.listen(port, () => {
    console.log(`Course catalog running at http://localhost:${port}`);
});
