const serverUrl = 'http://127.0.0.1:5000';

// Function to fetch and display the counter
async function getCount() {
    try {
        const response = await fetch(`${serverUrl}/get_count`);
        const data = await response.json();
        document.getElementById('counter-value').innerText = `Counter: ${data.count}`;
    } catch (error) {
        console.error("Error fetching counter:", error);
    }
}

// Function to increment the counter
async function incrementCount() {
    try {
        const response = await fetch(`${serverUrl}/increment`, { method: 'POST' });
        const data = await response.json();
        document.getElementById('counter-value').innerText = `Counter: ${data.count}`;
    } catch (error) {
        console.error("Error incrementing counter:", error);
    }
}

// Event listener for the button
document.getElementById('increment-button').addEventListener('click', incrementCount);

// Load the counter value when the page loads
getCount();
