var currentSortedColumnIndex = -1; // Initially no column is sorted
var currentSortDirection = 'asc'; // Initially sorting direction is ascending

function sortTable(columnIndex, clickedArrow) {
    var table, rows, switching, i, shouldSwitch;
    table = document.getElementById('motorbike-table');
    switching = true;

    // Toggle sorting direction if the same column is clicked
    if (columnIndex === currentSortedColumnIndex) {
        currentSortDirection = (currentSortDirection === 'asc') ? 'desc' : 'asc';
    } else {
        // Reset sorting direction if a different column is clicked
        currentSortDirection = 'asc';
    }

    // Update current sorted column index
    currentSortedColumnIndex = columnIndex;

    // Check if sorting by date column
    if (columnIndex === 0) {
        sortTableByDate(columnIndex, clickedArrow);
        return;
    }

    // Generic sorting for non-date columns
    while (switching) {
        switching = false;
        rows = table.rows;

        // Loop through all table rows (except the first, which contains table headers)
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            // Get the two elements you want to compare, one from the current row and one from the next
            var x = rows[i].getElementsByTagName('td')[columnIndex];
            var y = rows[i + 1].getElementsByTagName('td')[columnIndex];

            // Check if the two rows should switch place, based on the direction (asc or desc)
            if ((currentSortDirection === 'asc' && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
                (currentSortDirection === 'desc' && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())) {
                // If so, mark as a switch and break the loop
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            // If a switch has been marked, make the switch
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    // Update visual indicator for all columns
    updateSortIndicators(clickedArrow);
}

// Function to sort table by date
function sortTableByDate(columnIndex, clickedArrow) {
    var table, rows, switching, i, shouldSwitch;
    table = document.getElementById('motorbike-table');
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        // Loop through all table rows (except the first, which contains table headers)
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            // Get the two dates you want to compare, one from the current row and one from the next
            var x = getDateFromRow(rows[i], columnIndex);
            var y = getDateFromRow(rows[i + 1], columnIndex);

            // Check if the two rows should switch place, based on the direction (asc or desc)
            if ((currentSortDirection === 'asc' && x > y) ||
                (currentSortDirection === 'desc' && x < y)) {
                // If so, mark as a switch and break the loop
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            // If a switch has been marked, make the switch
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    // Update visual indicator for date column
    updateSortIndicators(clickedArrow);
}

// Function to extract date from a table row and parse it into JavaScript Date object
function getDateFromRow(row, columnIndex) {
    var dateString = row.getElementsByTagName('td')[columnIndex].innerHTML;
    var parts = dateString.split('.');
    var day = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // Months are 0-based in JavaScript Date object
    var year = parseInt(parts[2]);
    return new Date(year, month, day);
}

function updateSortIndicators(clickedArrow) {
    var table = document.getElementById('motorbike-table');
    var headers = table.getElementsByTagName('th');

    // Loop through all table headers
    for (var i = 0; i < headers.length; i++) {
        var arrowUp = headers[i].querySelector('.arrow-up');
        var arrowDown = headers[i].querySelector('.arrow-down');
        if (i === currentSortedColumnIndex) {
            // Display arrow indicators for the sorted column and change color based on sorting direction
            arrowUp.style.display = 'inline';
            arrowDown.style.display = 'inline';
            arrowUp.style.color = (currentSortDirection === 'asc') ? 'black' : '#888'; // Black color for ascending, gray for descending
            arrowDown.style.color = (currentSortDirection === 'desc') ? 'black' : '#888'; // Black color for descending, gray for ascending
        } else {
            // Hide arrow indicators for other columns and make them gray
            arrowUp.style.display = 'inline';
            arrowDown.style.display = 'inline';
            arrowUp.style.color = '#888'; // Gray color
            arrowDown.style.color = '#888'; // Gray color
        }
    }

    // Update color of the clicked arrow
    if (clickedArrow) {
        clickedArrow.style.color = (currentSortDirection === 'asc') ? 'black' : '#888';
    }
}
