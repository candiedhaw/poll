let dates = ["Dec 31, Sun", "Jan 1, Mon", "Jan 2, Tue", "Jan 3, Wed", "Jan 4, Thu", "Jan 5, Fri", "Jan 6, Sat", "Jan 7, Sun"];
let times = ["8:00", "8:30", "9:00", "9:30", "10:00"];
let votes = {};

function createTable() {
    let table = document.getElementById('pollTable');
    let headerRow = document.createElement('tr');
    let nameHeader = document.createElement('th');
    nameHeader.innerHTML = "Name/Time";
    headerRow.appendChild(nameHeader);
    for (let date of dates) {
        let dateHeader = document.createElement('th');
        dateHeader.innerHTML = date;
        headerRow.appendChild(dateHeader);
    }
    table.appendChild(headerRow);
    for (let time of times) {
        let row = document.createElement('tr');
        let timeCell = document.createElement('td');
        timeCell.innerHTML = time;
        row.appendChild(timeCell);
        for (let date of dates) {
            let cell = document.createElement('td');
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "vote";
            checkbox.value = date + " " + time;
            cell.appendChild(checkbox);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function getResults() {
    let checkboxes = document.getElementsByName('vote');
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            if (votes[checkbox.value]) {
                votes[checkbox.value]++;
            } else {
                votes[checkbox.value] = 1;
            }
        }
    }
    let results = Object.entries(votes).sort((a, b) => b[1] - a[1]).slice(0, 3);
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";
    for (let result of results) {
        resultsDiv.innerHTML += result[0] + ": " + result[1] + " votes<br>";
    }
}

createTable();
