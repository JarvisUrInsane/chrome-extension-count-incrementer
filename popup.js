const serverUrl = 'http://127.0.0.1:5000';

// Function to get the current counter value
async function getCount() {
    try {
        const response = await fetch(`${serverUrl}/get_count`);
        const data = await response.json();
        document.getElementById('counter-value').innerText = `Counter: ${data.count}`;
    } catch (error) {
        console.error("Error fetching counter:", error);
        document.getElementById('counter-value').innerText = "Error loading count";
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

// Event listener for the increment button
document.getElementById('increment-button').addEventListener('click', incrementCount);

// Load counter on popup open
getCount();
