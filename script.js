const daysOfWeek = ["Dec 31, Sun", "Jan 1, Mon", "Jan 2, Tue", "Jan 3, Wed", "Jan 4, Thu", "Jan 5, Fri", "Jan 6, Sat", "Jan 7, Sun"];
const timeSlots = ["8:00-8:30", "8:30-9:00", "9:00-9:30", "9:30-10:00"];

function createVotingTable() {
    const votingTable = document.getElementById("votingTable");

    // Create the header row with date titles
    const headerRow = document.createElement("tr");
    headerRow.appendChild(document.createElement("th")); // Empty cell for the first column

    daysOfWeek.forEach(day => {
        const headerCell = document.createElement("th");
        headerCell.textContent = day;
        headerRow.appendChild(headerCell);
    });

    votingTable.appendChild(headerRow);

    // Create rows for each time slot
    timeSlots.forEach(timeSlot => {
        const row = document.createElement("tr");

        // Add the time slot to the first column
        const timeSlotCell = document.createElement("td");
        timeSlotCell.textContent = timeSlot;
        row.appendChild(timeSlotCell);

        // Add checkboxes for each day
        daysOfWeek.forEach(() => {
            const checkBoxCell = document.createElement("td");
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.classList.add("check-box");
            checkBoxCell.appendChild(checkBox);
            row.appendChild(checkBoxCell);
        });

        votingTable.appendChild(row);
    });
}

function submitVote() {
    const nameInput = document.getElementById("name").value;
    const selectedOptions = [];

    // Loop through checkboxes to check which ones are selected
    timeSlots.forEach((timeSlot, rowIndex) => {
        daysOfWeek.forEach((day, colIndex) => {
            const checkBox = document.getElementById(`checkbox-${rowIndex}-${colIndex}`);
            if (checkBox.checked) {
                selectedOptions.push({ name: nameInput, day, time: timeSlot });
            }
        });
    });

    // Display the selected options
    console.log(`${nameInput} voted for:`, selectedOptions);

    // You can further handle the submission logic (e.g., send data to a server or store in a database)
}

// Call the function to create the voting table when the page loads
createVotingTable();
