document.addEventListener('DOMContentLoaded', function () {
    // Set the poll title
    document.querySelector('.poll-title').innerHTML = "Schedule Poll";

    // Set the default time zone
    const timeZone = "Central Time";

    // Get the days from the date range
    const startDate = new Date("Dec 31, 2023");
    const endDate = new Date("Jan 7, 2024");
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Generate the table
    generateTable(days);

    // Function to generate the table dynamically
    function generateTable(days) {
        const table = document.getElementById('scheduleTable');
        const headerRow = table.insertRow(0);

        // Add name column
        const nameCell = headerRow.insertCell(0);
        nameCell.textContent = "Name";

        // Add date columns
        for (let i = 0; i < days; i++) {
            const dateCell = headerRow.insertCell(i + 1);
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            dateCell.textContent = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
        }

        // Add time rows
        for (let hour = 1; hour <= 24; hour++) {
            const row = table.insertRow(hour);
            const timeCell = row.insertCell(0);
            timeCell.textContent = `${hour}:00 - ${hour + 1}:00`;

            for (let day = 1; day <= days; day++) {
                const checkboxCell = row.insertCell(day);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkboxCell.appendChild(checkbox);
            }
        }
    }
});

function submitVotes() {
    const voterName = document.getElementById('voterName').value;
    const table = document.getElementById('scheduleTable');
    const resultDiv = document.getElementById('result');

    let result = `<p>${voterName} voted on:</p>`;

    for (let day = 1; day <= table.rows[0].cells.length - 1; day++) {
        for (let hour = 1; hour <= 24; hour++) {
            const checkbox = table.rows[hour].cells[day].querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const date = table.rows[0].cells[day].textContent;
                const time = table.rows[hour].cells[0].textContent;
                result += `<p>${date}, ${time}</p>`;
            }
        }
    }

    resultDiv.innerHTML = result;
}
