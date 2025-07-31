document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categorySearchInput = document.getElementById('category-search');
    let allTalks = []; // To store the original fetched data

    // Function to format time
    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Function to render the schedule
    const renderSchedule = (talksToRender) => {
        scheduleContainer.innerHTML = ''; // Clear previous content

        if (talksToRender.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No talks found for this category. Please try a different search term.';
            noResultsMessage.style.textAlign = 'center';
            noResultsMessage.style.padding = '20px';
            noResultsMessage.style.color = '#666';
            scheduleContainer.appendChild(noResultsMessage);
            return; // Exit the function as there's nothing else to render
        }

        talksToRender.forEach(item => {
            const itemDiv = document.createElement('div');
            const startTime = formatTime(new Date(item.startTime));
            const endTime = formatTime(new Date(item.endTime));

            if (item.type === 'talk') {
                itemDiv.classList.add('talk-item');
                itemDiv.innerHTML = `
                    <span class="time-slot">${startTime} - ${endTime}</span>
                    <h3>${item.title}</h3>
                    <p class="speakers"><strong>Speakers:</strong> ${item.speakers.join(', ')}</p>
                    <p class="category"><strong>Category:</strong> ${item.category.join(', ')}</p>
                    <p>${item.description}</p>
                `;
            } else if (item.type === 'lunch') {
                itemDiv.classList.add('break-item');
                itemDiv.innerHTML = `
                    <span class="time-slot">${startTime} - ${endTime}</span>
                    <h4>Lunch Break</h4>
                `;
            } else if (item.type === 'transition') {
                itemDiv.classList.add('break-item');
                itemDiv.innerHTML = `
                    <span class="time-slot">${startTime} - ${endTime}</span>
                    <h4>Transition (${item.duration} min)</h4>
                `;
            }
            scheduleContainer.appendChild(itemDiv);
        });
    };

    // Fetch data from the backend
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderSchedule(allTalks);
        })
        .catch(error => {
            console.error('Error fetching schedule:', error);
            scheduleContainer.innerHTML = '<p>Failed to load schedule. Please try again later.</p>';
        });

    // Category search functionality
    categorySearchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.trim();

        if (searchTerm === '') {
            renderSchedule(allTalks);
            return;
        }

        const filteredTalks = allTalks.filter(item => {
            if (item.type === 'talk') {
                return item.category.some(cat => cat.includes(searchTerm));
            }
            return true; // Always show breaks and transitions
        });
        renderSchedule(filteredTalks);
    });
});
