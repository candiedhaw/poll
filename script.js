document.addEventListener('DOMContentLoaded', function () {
    const pollTitle = "PAG prep schedule poll";
    const startDate = new Date("Dec 31, 2023");
    const endDate = new Date("Jan 7, 2024");
    const timezone = "Central Time";
    const weekendStartTime = 9;
    const weekendEndTime = 22;
    const weekdayStartTime = 20;
    const weekdayEndTime = 22;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const numOfDays = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000));
    const table = document.getElementById('scheduleTable');
    const voterNameInput = document.getElementById('voterName');

    // Create table header
    let headerRow = '<tr><th>Name</th>';
    for (let i = 0; i <= numOfDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dayName = days[currentDate.getDay()];
        headerRow += `<th>${dayName}</th>`;
    }
    headerRow += '</tr>';

    // Create time slots
    let timeRows = '';
    for (let hour = 1; hour <= 23; hour++) {
        timeRows += `<tr><td>${hour}:00 - ${hour}:30</td>`;
        for (let day = 0; day <= numOfDays; day++) {
            const isWeekend = days[(startDate.getDay() + day) % 7] === "Sun" || days[(startDate.getDay() + day) % 7] === "Sat";
            const startTime = isWeekend ? weekendStartTime : weekdayStartTime;
            const endTime = isWeekend ? weekendEndTime : weekdayEndTime;
            const isDisabled = hour < startTime || hour > endTime;
            timeRows += `<td><input type="checkbox" ${isDisabled ? 'disabled' : ''}></td>`;
        }
        timeRows += '</tr>';
    }

    // Append table to the document
    table.innerHTML = `<table>${headerRow}${timeRows}</table>`;

    // Handle checkbox click
    table.addEventListener('click', function (event) {
        const target = event.target;
        if (target.type === 'checkbox' && target.checked) {
            const rowIndex = target.parentNode.parentNode.rowIndex;
            const colIndex = target.parentNode.cellIndex;

            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + colIndex - 1);
            const dayName = days[currentDate.getDay()];
            const selectedDate = `${currentDate.toDateString()}, ${dayName}`;
            const selectedTime = `${(rowIndex - 1).toString().padStart(2, '0')}:00 - ${(rowIndex - 1).toString().padStart(2, '0')}:30`;

            const voterName = voterNameInput.value.trim();
            if (voterName !== '') {
                alert(`${voterName} voted on ${selectedDate} at ${selectedTime}`);
            } else {
                alert('Please enter your name before voting.');
                target.checked = false;
            }
        }
    });
});
