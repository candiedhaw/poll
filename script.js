// Define the schedule
const schedule = [
    "Dec 31, Sun",
    "Jan 1, Mon",
    "Jan 2, Tue",
    "Jan 3, Wed",
    "Jan 4, Thu",
    "Jan 5, Fri",
    "Jan 6, Sat",
    "Jan 7, Sun",
];

// Initialize vote counts
const voteCounts = Array(schedule.length).fill(0);

// Function to render the schedule table
function renderSchedule() {
    const pollContainer = document.getElementById("poll-container");
    const table = document.createElement("table");
    const headerRow = table.insertRow();
    const nameHeader = headerRow.insertCell();
    nameHeader.innerHTML = "Name";

    schedule.forEach((date, index) => {
        const headerCell = headerRow.insertCell();
        headerCell.innerHTML = date;

        const row = table.insertRow();
        const nameCell = row.insertCell();
        nameCell.innerHTML = `<input type="checkbox" name="vote" value="${index}">`;
    });

    pollContainer.appendChild(table);
}

// Function to submit a vote
function submitVote() {
    const name = document.getElementById("name").value;
    const checkboxes = document.getElementsByName("vote");
    const selectedIndexes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.value));

    if (selectedIndexes.length === 0) {
        alert("Please select at least one time slot.");
        return;
    }

    // Update vote counts
    selectedIndexes.forEach(index => voteCounts[index]++);

    // Display results
    displayResults();

    // Clear name input and checkboxes
    document.getElementById("name").value = "";
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

// Function to display results
function displayResults() {
    const mostSelectedIndex = voteCounts.indexOf(Math.max(...voteCounts));
    const mostSelectedDate = schedule[mostSelectedIndex];
    const mostSelectedUsers = getMostSelectedUsers(mostSelectedIndex);
    const totalVotes = voteCounts.reduce((sum, count) => sum + count, 0);

    document.getElementById("most-selected").innerHTML = `Most Selected Date: ${mostSelectedDate} (${mostSelectedUsers.join(", ")})`;
    document.getElementById("total-votes").innerHTML = `Total Votes: ${totalVotes}`;
}

// Function to get users who selected the most voted date
function getMostSelectedUsers(mostSelectedIndex) {
    const checkboxes = document.getElementsByName("vote");
    const mostSelectedUsers = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked && selectedIndexes.includes(index)) {
            mostSelectedUsers.push(document.getElementById("name").value);
        }
    });

    return mostSelectedUsers;
}

// Render the schedule on page load
window.onload = function () {
    renderSchedule();
};
