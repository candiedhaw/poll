// script.js

document.addEventListener('DOMContentLoaded', function () {
    createScheduleTable();
});

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function createScheduleTable() {
    const pollTitle = "PAG prep schedule poll";
    const dateRange = "Dec 31, Sun to Jan 7, Sun";
    const timeZone = "Central Time";
    const d = 7; // Number of days in the date range

    // Set poll title
    document.querySelector('.poll-title').textContent = pollTitle;

    // Create table header
    const table = document.getElementById('scheduleTable');
    const headerRow = table.insertRow();
    headerRow.insertCell().textContent = "Name";

    for (let i = 0; i <= d; i++) {
        const currentDate = new Date(dateRange);
        currentDate.setDate(currentDate.getDate() + i);
        const dateInfo = formatDate(currentDate);

        const cell = headerRow.insertCell();
        cell.textContent = dateInfo;
    }

    // Create time slots and checkboxes
    for (let hour = 1; hour <= 24; hour++) {
        const row = table.insertRow();

        for (let day = 0; day <= d; day++) {
            if (day === 0) {
                const cell = row.insertCell();
                cell.textContent = `${hour}:00-${hour + 1}:00`;
            } else {
                const cell = row.insertCell();
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = `vote_${hour}_${day}`;
                checkbox.value = '1';
                cell.appendChild(checkbox);
            }
        }
    }
}

function submitVotes() {
    const volterName = document.getElementById('volterName').value;

    if (volterName === "") {
        alert("Please enter your name before submitting.");
        return;
    }

    const table = document.getElementById('scheduleTable');
    const submittedVotes = document.getElementById('submittedVotes');

    submittedVotes.innerHTML = `<p>${volterName} voted on:</p>`;

    for (let day = 1; day <= d; day++) {
        for (let hour = 1; hour <= 24; hour++) {
            const checkbox = document.querySelector(`input[name="vote_${hour}_${day}"]`);
            if (checkbox.checked) {
                const currentDate = new Date(dateRange);
                currentDate.setDate(currentDate.getDate() + day - 1);
                const dayInfo = formatDate(currentDate);
                submittedVotes.innerHTML += `<p>${volterName} voted on ${dayInfo} at ${hour}:00-${hour + 1}:00</p>`;
            }
        }
    }
}
