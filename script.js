document.addEventListener("DOMContentLoaded", function () {
    // Get variables
    const pollTitle = "PAG prep schedule poll";
    const timeZone = "Central Time";
    const meetingStartTimeWeekends = 9;
    const meetingEndTimeWeekends = 22;
    const meetingStartTimeWorkdays = 20;
    const meetingEndTimeWorkdays = 22;

    const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    // Display poll title
    document.querySelector('.poll-title').innerText = pollTitle;

    // Create table
    const table = document.getElementById("scheduleTable");
    const volterNameInput = document.getElementById("volterName");
    const votingResults = document.getElementById("votingResults");

    // Get date range
    const startDate = new Date("Dec 31, 2023");
    const endDate = new Date("Jan 7, 2024");

    // Populate table
    for (let i = 0; i <= 25; i++) {
        const row = table.insertRow(i);

        for (let j = 0; j <= 8; j++) {
            const cell = row.insertCell(j);

            if (i === 0) {
                if (j === 0) {
                    cell.innerText = "Name";
                } else {
                    const currentDate = new Date(startDate);
                    currentDate.setDate(startDate.getDate() + (j - 1));
                    cell.innerText = currentDate.toLocaleDateString('en-US', dateOptions);
                }
            } else {
                if (j === 0) {
                    cell.innerText = `${(i - 1) * 0.5 + 1}:00`;
                } else {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.className = "vote-checkbox";
                    cell.appendChild(checkbox);
                }
            }
        }
    }

    // Submit votes function
    window.submitVotes = function () {
        const volterName = volterNameInput.value;
        const checkedCheckboxes = document.querySelectorAll('.vote-checkbox:checked');

        const voteDetails = [];

        checkedCheckboxes.forEach((checkbox) => {
            const rowIndex = checkbox.parentElement.parentElement.rowIndex;
            const colIndex = checkbox.parentElement.cellIndex;

            const date = table.rows[0].cells[colIndex].innerText;
            const time = table.rows[rowIndex].cells[0].innerText;

            voteDetails.push({
                voter: volterName,
                date: date,
                time: time
            });
        });

        // Display voting results
        votingResults.innerHTML = "<h2>Voting Results:</h2>";

        voteDetails.forEach((vote) => {
            votingResults.innerHTML += `<p>${vote.voter} voted on ${vote.date} at ${vote.time}</p>`;
        });
    };
});
