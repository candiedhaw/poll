const daysOfWeek = ["Dec 31, Sun", "Jan 1, Mon", "Jan 2, Tue", "Jan 3, Wed", "Jan 4, Thu", "Jan 5, Fri", "Jan 6, Sat", "Jan 7, Sun"];

// Function to dynamically create schedule grid
function createScheduleGrid() {
    const scheduleContainer = document.querySelector(".schedule-container");

    // Create headers for each day
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement("div");
        dayHeader.classList.add("day-header");
        dayHeader.textContent = day;
        scheduleContainer.appendChild(dayHeader);
    });

    // Create time slots and checkboxes for each day
    for (let hour = 9; hour <= 12; hour++) {
        const timeSlot = document.createElement("div");
        timeSlot.classList.add("time-slot");
        timeSlot.innerHTML = `<div>${hour}:00-${hour + 1}:00</div>`;
        
        // Create a checkbox for each day
        daysOfWeek.forEach((day, index) => {
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.classList.add("check-box");
            checkBox.id = `checkbox-${hour}-${index}`;
            timeSlot.appendChild(checkBox);
        });

        scheduleContainer.appendChild(timeSlot);
    }
}

// Function to submit the vote
function submitVote() {
    const nameInput = document.getElementById("name").value;
    const selectedOptions = [];

    // Loop through checkboxes to check which ones are selected
    for (let hour = 9; hour <= 12; hour++) {
        daysOfWeek.forEach((day, index) => {
            const checkBox = document.getElementById(`checkbox-${hour}-${index}`);
            if (checkBox.checked) {
                selectedOptions.push({ day, time: `${hour}:00-${hour + 1}:00` });
            }
        });
    }

    // You can handle the submission logic here (e.g., send data to a server)
    console.log(`${nameInput} voted for:`, selectedOptions);
}

// Call the function to create the schedule grid when the page loads
createScheduleGrid();
