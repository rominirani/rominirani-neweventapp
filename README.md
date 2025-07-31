# Technical Talks Event Website

This project is a simple, single-page website designed to display the schedule of a 1-day event filled with technical talks. Users can view the full schedule and filter talks by category.

## Features

*   **Event Schedule Display:** Shows a detailed schedule of 6 technical talks, including start/end times, speakers, categories, and descriptions.
*   **Dynamic Schedule Calculation:** The backend calculates talk and break timings based on a 10:00 AM start, 1-hour talk durations, 10-minute transitions, and a 1-hour lunch break.
*   **Category Search:** Users can search and filter talks by category in real-time.
*   **Responsive Design:** Basic styling ensures readability across different devices.

## Technologies Used

*   **Backend:** Node.js with Express.js
*   **Frontend:** HTML5, CSS3, JavaScript

## Project Structure

```
.gitignore
package.json
package-lock.json
server.js
public/
├── index.html
├── style.css
└── script.js
```

*   `server.js`: The Node.js backend server. It serves static files and provides the event schedule data via an API endpoint.
*   `public/index.html`: The main HTML file that structures the web page.
*   `public/style.css`: Contains the CSS rules for styling the website.
*   `public/script.js`: Handles fetching data from the backend, dynamically rendering the schedule, and implementing the category search.
*   `.gitignore`: Specifies files and directories to be ignored by Git.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

*   [Node.js & npm](https://nodejs.org/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rominirani/rominirani-neweventapp.git
    cd rominirani-neweventapp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will start and you should see a message like: `Server running on http://localhost:3000`

2.  **Access the website:**
    Open your web browser and navigate to the URL displayed in the console (e.g., `http://localhost:3000`).

## Usage

Once the website is open in your browser, you will see the full event schedule. Use the "Search by Category" input field to filter the talks based on keywords (e.g., "JavaScript", "Backend", "AI"). The filtering is case-sensitive and happens as you type.
