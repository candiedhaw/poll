const pollTitle = "PAG Prep Schedule Poll";
const timeZone = "Central Time";
const meetingStartTime = { weekdays: "8:00 PM", weekends: "9:00 AM" };
const dateRange = ["Dec 31, Sun", "Jan 1, Mon", "Jan 2, Tue", "Jan 3, Wed", "Jan 4, Thu", "Jan 5, Fri", "Jan 6, Sat", "Jan 7, Sun"];

const container = document.querySelector('.container');
const scheduleTable = document.getElementById('scheduleTable');
const nameInput = document.getElementById('nameInput');
const votingResults = document.getElementById('votingResults');

function createSchedulePoll() {
    // Clear previous content
    scheduleTable.innerHTML = '';

    // Create header row with dates
    const headerRow = scheduleTable.insertRow(0);
    headerRow.insertCell(0); // Empty cell for names
    dateRange.forEach((date, index) => {
        const cell = headerRow.insertCell(index + 1);
        cell.textContent = date;
    });

    // Create rows for time slots
    for (let hour = 1; hour <= 23; hour++) {
        const timeSlotRow = scheduleTable.insertRow(hour);
        const timeSlotCell = timeSlotRow.insertCell(0);
        timeSlotCell.textContent = `${hour}:00 - ${hour + 1}:00`;

        // Create checkboxes for each day
        for (let dayIndex = 0; dayIndex < dateRange.length; dayIndex++) {
            const checkBoxCell = timeSlotRow.insertCell(dayIndex + 1);
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.classList.add("check-box");
            checkBoxCell.appendChild(checkBox);
        }
    }
}

function submitVote() {
    const voterName = nameInput.value;
    const selectedOptions = [];

    // Loop through checkboxes to check which ones are selected
    for (let hour = 1; hour <= 23; hour++) {
        for (let dayIndex = 0; dayIndex < dateRange.length; dayIndex++) {
            const checkBox = scheduleTable.rows[hour].cells[dayIndex + 1].querySelector("input");
            if (checkBox.checked) {
                const selectedDate = dateRange[dayIndex];
                const selectedTime = `${hour}:00 - ${hour + 1}:00`;
                selectedOptions.push({ voterName, selectedDate, selectedTime });
            }
        }
    }

    // Display the selected options
    displayResults(selectedOptions);
}

function displayResults(selectedOptions) {
    // Clear previous results
    votingResults.innerHTML = '';

    // Display the results
    if (selectedOptions.length > 0) {
        const resultsHeading = document.createElement('h2');
        resultsHeading.textContent = "Voting Results";
        votingResults.appendChild(resultsHeading);

        const resultsList = document.createElement('ul');
        selectedOptions.forEach(option => {
            const listItem = document.createElement('li');
            listItem.textContent = `${option.voterName} voted on ${option.selectedDate} at ${option.selectedTime}`;
            resultsList.appendChild(listItem);
        });
        votingResults.appendChild(resultsList);

        // Calculate most selected date and time
        const mostSelected = calculateMostSelected(selectedOptions);
        const mostSelectedMessage = document.createElement('p');
        mostSelectedMessage.textContent = `Most selected date and time: ${mostSelected.date} at ${mostSelected.time} (${mostSelected.count} votes)`;
        votingResults.appendChild(mostSelectedMessage);

        // Display total number of votes
        const totalVotesMessage = document.createElement('p');
        totalVotesMessage.textContent = `Total number of votes: ${selectedOptions.length}`;
        votingResults.appendChild(totalVotesMessage);
    } else {
        const noVotesMessage = document.createElement('p');
        noVotesMessage.textContent = "No votes recorded yet.";
        votingResults.appendChild(noVotesMessage);
    }
}

function calculateMostSelected(selectedOptions) {
    const countMap = {};
    selectedOptions.forEach(option => {
        const key = `${option.selectedDate} ${option.selectedTime}`;
        countMap[key] = (countMap[key] || 0) + 1;
    });

    let mostSelected = { date: "", time: "", count: 0 };
    for (const key in countMap) {
        if (countMap[key] > mostSelected.count) {
            mostSelected.count = countMap[key];
            [mostSelected.date, mostSelected.time] = key.split(" ");
        }
    }

    return mostSelected;
}

// Call the function to create the schedule poll when the page loads
createSchedulePoll();
