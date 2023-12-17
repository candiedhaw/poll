// Variables
const pollTitle = "PAG Prep Schedule Poll";
const defaultTimeZone = "Central Time";
const meetingStartTimeWeekend = "9:00";
const meetingEndTimeWeekend = "22:00";
const meetingStartTimeWorkday = "20:00";
const meetingEndTimeWorkday = "22:00";

const dateRangeStart = "Dec 31, Sun";
const dateRangeEnd = "Jan 7, Sun";

// Function to generate schedule table dynamically
function generateScheduleTable() {
    const container = document.getElementById("schedule-table");
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dateStart = new Date(dateRangeStart);
    const dateEnd = new Date(dateRangeEnd);
    const numDays = Math.floor((dateEnd - dateStart) / (24 * 60 * 60 * 1000));

    // Create table header
    let tableHTML = "<tr><th>Name</th>";
    for (let i = 0; i <= numDays; i++) {
        const currentDate = new Date(dateStart);
        currentDate.setDate(dateStart.getDate() + i);
        tableHTML += `<th>${currentDate.toDateString().substring(4)}</th>`;
    }
    tableHTML += "</tr>";

    // Create table rows with time slots and checkboxes
    for (let hour = 1; hour <= 24; hour++) {
        tableHTML += "<tr>";
        tableHTML += `<td>${formatTimeSlot(hour, hour + 1)}</td>`;
        for (let day = 0; day <= numDays; day++) {
            tableHTML += `<td><input type="checkbox" class="vote-checkbox" data-day="${day}" data-hour="${hour}"></td>`;
        }
        tableHTML += "</tr>";
    }

    container.innerHTML = tableHTML;
}

// Function to format time slot
function formatTimeSlot(startHour, endHour) {
    return `${startHour.toString().padStart(2, '0')}:00-${endHour.toString().padStart(2, '0')}:00`;
}

// Function to submit vote
function submitVote() {
    const nameInput = document.getElementById("name");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name before submitting.");
        return;
    }

    const checkboxes = document.getElementsByClassName("vote-checkbox");
    const votes = [];

    // Collect selected votes
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            const day = checkbox.dataset.day;
            const hour = checkbox.dataset.hour;
            const currentDate = new Date(dateRangeStart);
            currentDate.setDate(currentDate.getDate() + parseInt(day));
            const date = currentDate.toDateString().substring(4);
            const time = formatTimeSlot(parseInt(hour), parseInt(hour) + 1);
            votes.push({ name, date, time });
        }
    }

    // Display the most selected date and time
    displayMostSelected(votes);

    // Reset name input and checkboxes
    nameInput.value = "";
    for (const checkbox of checkboxes) {
        checkbox.checked = false;
    }
}

// Function to display the most selected date and time
function displayMostSelected(votes) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "";

    // Count votes for each date and time
    const voteCounts = {};
    for (const vote of votes) {
        const key = `${vote.date} ${vote.time}`;
        voteCounts[key] = (voteCounts[key] || 0) + 1;
    }

    // Find the most selected date and time
    let mostSelected = { date: "", time: "", count: 0, names: [] };
    for (const key in voteCounts) {
        if (voteCounts[key] > mostSelected.count) {
            mostSelected.count = voteCounts[key];
            [mostSelected.date, mostSelected.time] = key.split(" ");
            mostSelected.names = [key];
        } else if (voteCounts[key] === mostSelected.count) {
            mostSelected.names.push(key);
        }
    }

    // Display the result
    resultContainer.innerHTML = `<p>Most selected date and time: ${mostSelected.date} ${mostSelected.time}</p>`;
    resultContainer.innerHTML += `<p>Names who selected: ${mostSelected.names.join(", ")}</p>`;
    resultContainer.innerHTML += `<p>Total number of votes: ${votes.length}</p>`;
}

// Generate schedule table on page load
generateScheduleTable();
