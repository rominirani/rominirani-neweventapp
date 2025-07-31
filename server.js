const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded talk data
const talks = [
    {
        title: "Introduction to Node.js",
        speakers: ["Alice Johnson"],
        category: ["Web Development", "Backend"],
        duration: 60, // minutes
        description: "A foundational talk on Node.js, covering its event-driven architecture and non-blocking I/O."
    },
    {
        title: "Frontend Frameworks: A Comparison",
        speakers: ["Bob Williams", "Carol Davis"],
        category: ["Frontend", "JavaScript"],
        duration: 60,
        description: "An overview and comparison of popular frontend frameworks like React, Angular, and Vue."
    },
    {
        title: "Database Design Best Practices",
        speakers: ["David Lee"],
        category: ["Databases", "Backend"],
        duration: 60,
        description: "Exploring best practices for designing scalable and efficient database schemas."
    },
    {
        title: "Understanding Cloud Native Architectures",
        speakers: ["Eve Brown"],
        category: ["Cloud", "DevOps"],
        duration: 60,
        description: "Dive into the principles and patterns of building cloud-native applications."
    },
    {
        title: "Effective Unit Testing in JavaScript",
        speakers: ["Frank White"],
        category: ["Testing", "JavaScript"],
        duration: 60,
        description: "Learn how to write effective unit tests for your JavaScript applications using popular testing frameworks."
    },
    {
        title: "Introduction to Machine Learning with Python",
        speakers: ["Grace Green", "Harry Black"],
        category: ["AI", "Python", "Data Science"],
        duration: 60,
        description: "A beginner-friendly introduction to machine learning concepts and practical examples using Python."
    }
];

// Function to calculate schedule
function calculateSchedule(talks) {
    const schedule = [];
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

    talks.forEach((talk, index) => {
        // Add talk to schedule
        schedule.push({
            type: 'talk',
            ...talk,
            startTime: new Date(currentTime),
            endTime: new Date(currentTime.getTime() + talk.duration * 60 * 1000)
        });
        currentTime.setTime(currentTime.getTime() + talk.duration * 60 * 1000);

        // Add transition if not the last talk and not before lunch
        if (index < talks.length - 1 && index !== 2) { // index 2 is the talk before lunch
            schedule.push({
                type: 'transition',
                duration: 10,
                startTime: new Date(currentTime),
                endTime: new Date(currentTime.getTime() + 10 * 60 * 1000)
            });
            currentTime.setTime(currentTime.getTime() + 10 * 60 * 1000);
        }

        // Add lunch break after the 3rd talk (index 2)
        if (index === 2) {
            schedule.push({
                type: 'lunch',
                duration: 60,
                startTime: new Date(currentTime),
                endTime: new Date(currentTime.getTime() + 60 * 60 * 1000)
            });
            currentTime.setTime(currentTime.getTime() + 60 * 60 * 1000);
        }
    });
    return schedule;
}

// API endpoint for talks
app.get('/api/talks', (req, res) => {
    const fullSchedule = calculateSchedule(talks);
    res.json(fullSchedule);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
