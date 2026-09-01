# UofL Course Catalog

A searchable course catalog web application built with Node.js, Express, HTML, CSS, and JavaScript. Browse over 8,400 University of Louisville courses with an intuitive search interface.

## Project Overview

This application provides an easy-to-use interface for exploring the complete UofL course catalog. It displays 10 random courses on page load and allows users to search the entire course database by subject code, catalog number, or course title. The application features responsive design, real-time search feedback, and detailed course information including enrollment capacity and location.

## Features

- **Instant Course Browsing**: Displays 10 random courses on page load for immediate exploration
- **Advanced Search**: Filter by subject code (e.g., "CHEM"), catalog number (e.g., "390"), or course title
- **Comprehensive Course Data**: Each course card shows:
  - Subject and catalog number
  - Course title/description
  - Class section and number
  - Component type (LEC, RES, LAB, etc.)
  - Enrollment status (current/capacity)
  - Class location
- **Real-time Status Feedback**: Displays loading states and result counts
- **Error Handling**: Graceful fallbacks with clear error messages
- **Responsive Design**: Mobile-first design works seamlessly on all screen sizes
- **UofL Branding**: Uses official University of Louisville colors and styling
- **Dual API Approach**: Works with both Express API and static JSON fallback for maximum compatibility

## System Requirements

- Node.js 18.0.0 or newer
- npm 9.0.0 or newer
- 50 MB disk space for course data and dependencies

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/nyalwal12-sudo/Programmer-Challenge.git
cd Programmer-Challenge
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install Express and other required packages.

### Step 3: Data Preparation

The course data is pre-built and included in `back-end/JSONdata-storage.json`. If you need to update the data from the CSV file:

```bash
npm run build-data
```

This converts `catalog dev.csv` into JSON format and stores it in `back-end/JSONdata-storage.json`.

## Running the Application

### Start the Development Server

```bash
npm start
```

The server will start on port 5500. You should see:

```
Course catalog running at http://localhost:5500
```

### Access the Application

Open your browser and navigate to:

```
http://localhost:5500
```

**Important**: Do not open `index.html` directly in your browser or use a static file server. The application requires the Express server to provide the `/api/courses` endpoint for searching and data retrieval.

## Deployment

The application is ready for deployment to any Node.js hosting platform:
- **GitHub Pages**: The static frontend files are included, but require the Express backend


## Project Structure

```
Programmer-Challenge/
├── back-end/
│   ├── server.js                 # Express server and API routes
│   ├── convert-csv.js            # CSV to JSON converter
│   └── JSONdata-storage.json     # Pre-built course database
├── index.html                    # Main HTML page
├── script.js                     # Frontend logic and search handling
├── style.css                     # Responsive styling
├── package.json                  # Project metadata and dependencies
├── catalog dev.csv               # Source course data
└── README.md                     # This file
```



## Note

Thank you for the opportunity to partake in this challenge, I learned a lot. Unfortunately, I'm going to be entirely honest with you, I don't thing my skill level is at the point where I can do this kind of thing regularly yet. I can learn and I'm willing to learn, but I had to look up a lot of specifics for this. If this really is as competitive as you say it is, I think you're better off going with someone who won't have as much of a learning curve. If you still think it's worth your time, at least take a look at it, I spent a lot of time working on it. -Sincerely, Mina
