document.addEventListener("DOMContentLoaded", function () {
    // Variables
    const pollTitle = document.querySelector('.poll-title');
    const defaultTimeZone = document.querySelector('.default-timezone');
    const voterNameInput = document.getElementById('voterName');
    const scheduleTable = document.getElementById('scheduleTable');
    const voteResultDiv = document.getElementById('voteResult');

    const startDate = "Dec 31, Sun";
    const endDate = "Jan 7, Sun";
    const timeZone = "Central Time";
    const weekendStartTime = 9;
    const weekendEndTime = 22;
    const weekdayStartTime = 20;
    const weekdayEndTime = 22;

    // Calculate the number of days (d)
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const daysDiff = Math.floor((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    const d = daysDiff + 1;

    // Update Poll Title and Default Time Zone
    pollTitle.style.fontSize = "25px";
    defaultTimeZone.textContent = `Default Time Zone: ${timeZone}`;

    // Generate Schedule Table
    generateScheduleTable();

    // Submit Vote Function
    window.submitVote = function () {
        const voterName = voterNameInput.value;
        const selectedCells = document.querySelectorAll('input[type="checkbox"]:checked');
        const voteDetails = [];

        selectedCells.forEach(cell => {
            const dayIndex = cell.dataset.dayIndex;
            const timeSlot = cell.dataset.timeSlot;
            const date = scheduleTable.rows[0].cells[parseInt(dayIndex) + 1].textContent;
            voteDetails.push(`Name: ${voterName}, Date: ${date}, Time: ${timeSlot}`);
        });

        // Display Vote Results
        voteResultDiv.innerHTML = `<p><strong>Votes Recorded:</strong></p><ul>${voteDetails.map(item => `<li>${item}</li>`).join('')}</ul>`;
    };

    // Function to Generate Schedule Table
    function generateScheduleTable() {
        // Table Body
        const tbody = scheduleTable.getElementsByTagName('tbody')[0];

        // Time Slots (1:00 - 23:00, half-hour intervals)
        for (let i = 1; i <= 23; i++) {
            const timeSlot = `${String(i).padStart(2, '0')}:00 - ${String(i).padStart(2, '0')}:30`;
            const row = tbody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = timeSlot;

            for (let j = 1; j <= d; j++) {
                const cell = row.insertCell(j);
                const isWeekend = j === 1 || j === 7;
                const startTime = isWeekend ? weekendStartTime : weekdayStartTime;
                const endTime = isWeekend ? weekendEndTime : weekdayEndTime;

                if (i >= startTime && i <= endTime) {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.dataset.dayIndex = j - 1;
                    checkbox.dataset.timeSlot = timeSlot;
                    cell.appendChild(checkbox);
                }
            }
        }
    }
});
