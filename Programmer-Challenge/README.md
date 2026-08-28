# UofL Course Catalog

A searchable course catalog built with Node.js, Express, HTML, CSS, and browser JavaScript. The application displays ten random courses when it loads and lets users search by subject, catalog number, or course description.

## Features

- Displays ten course cards on initial page load.
- Searches by subject, catalog number, or description.
- Shows a loading state, result count, and errors in the page.
- Uses the provided CSV file as the source dataset.
- Serves the frontend and JSON API from the same Express application.
- Uses a responsive layout with one card per row.

## Requirements

- Node.js 18 or newer
- npm

## Setup

Clone the repository and install its dependencies:

```bash
git clone https://github.com/nyalwal12-sudo/Programmer-Challenge.git
cd Programmer-Challenge
npm install
```

The JSON data file is already included. To regenerate it after changing `catalog dev.csv`, run:

```bash
npm run build-data
```

## Run

Start the Express server:

```bash
npm start
```

Open the URL printed in the terminal, normally:

```text
http://localhost:5500
```

Do not open `front-end/index.html` directly or through a static file server. The page needs Express to provide the `/api/courses` endpoint.

To use another port:

```bash
PORT=3001 npm start
```

## API

Get all courses:

```text
GET /api/courses
```

Search courses:

```text
GET /api/courses?search=CHEM
```

The API returns a JSON array. The browser limits the displayed results to ten cards.

## Project Structure

```text
front-end/
    index.html              Page markup.
    script.js               Card loading, rendering, and search behavior.
    style.css               Responsive presentation.
.github/
    workflows/
        deploy-pages.yml    GitHub Actions workflow for deploying to GitHub Pages.
package.json              npm scripts and dependencies.
README.md                 Project documentation.
```

## Development Checks

Before committing changes, run:

```bash
npm run build-data
node --check back-end/server.js
node --check front-end/script.js
node --check back-end/convert-csv.js
```

Then start the server and test both the page and API:

```bash
curl http://localhost:5500/
curl http://localhost:5500/api/courses
curl "http://localhost:5500/api/courses?search=CHEM"
```

## Note

Thank you for the opportunity to partake in this challenge, I learned a lot. Unfortunately, I'm going to be entirely honest with you, I don't think my skill level is at the point where I can do this kind of thing regularly yet. I can learn and I'm willing to learn, but I had to look up a lot of specifics for this. If this really is as competitive as you say it is, I think you're better off going with someone who will require less training, someone who won't have as much of a learning curve. If you still think it's worth your time, at least take a look at it, I spent a lot of time working on it. -Sincerely, Mina