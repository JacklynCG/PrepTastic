// calendar.js
let viewType = "weekly";  // default view
let currentDate = new Date();  // needed for day/week view
let calendarView = document.getElementById("calendar-body"); // make sure this exists in your HTML

// Define an array to store events
let events = [];

// letiables to store event input fields and reminder list
let eventDateInput =
	document.getElementById("eventDate");
let eventTitleInput =
	document.getElementById("eventTitle");
let eventDescriptionInput =
	document.getElementById("eventDescription");
let reminderList =
	document.getElementById("reminderList");

// Counter to generate unique event IDs
let eventIdCounter = 1;

// Function to add events
function addEvent() 
{
	let date = eventDateInput.value;
	let title = eventTitleInput.value;
	let description = eventDescriptionInput.value;

	if (date && title) {
		// Create a unique event ID
		let eventId = eventIdCounter++;

		events.push(
			{
				id: eventId, 
				date: date,
				title: title,
				description: description
			}
		);

		// Refresh all calendar views to reflect the new event
		showCalendar(currentMonth, currentYear);
		eventDateInput.value = "";
		eventTitleInput.value = "";
		eventDescriptionInput.value = "";
		displayReminders();
	}
}


// Function to delete an event by ID
function deleteEvent(eventId) {
	// Find the index of the event with the given ID
	let eventIndex =
		events.findIndex((event) =>
			event.id === eventId);

	if (eventIndex !== -1) {
		// Remove the event from the events array
		events.splice(eventIndex, 1);
		showCalendar(currentMonth, currentYear);
		displayReminders();
	}
}



// Function to display reminders
function displayReminders() {
	reminderList.innerHTML = "";
	for (let i = 0; i < events.length; i++) 
		{
		let event = events[i];
		let eventDate = new Date(event.date);
		if (eventDate.getMonth() ===
			currentMonth &&
			eventDate.getFullYear() ===
			currentYear) 
			{
			let listItem = document.createElement("li");
			listItem.innerHTML =
				`<strong>${event.title}</strong> - 
			${event.description} on 
			${eventDate.toLocaleDateString()}`;

			// Add a delete button for each reminder item
			let deleteButton =
				document.createElement("button");
			deleteButton.className = "delete-event";
			deleteButton.textContent = "Delete";
			deleteButton.onclick = function () {
				deleteEvent(event.id);
			};

			listItem.appendChild(deleteButton);
			reminderList.appendChild(listItem);
		}
	}
}

// Function to generate a range of years for the year select input
function generate_year_range(start, end) {
	let years = "";
	for (let year = start; year <= end; year++) {
		years += "<option value='" +
			year + "'>" + year + "</option>";
	}
	return years;
}

// Initialize date-related letiables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(2015, 2050);

document.getElementById("year").innerHTML = createYear;
document.getElementById("viewType").addEventListener("change", function (e) {
	viewType = e.target.value;
	showCalendar(currentMonth, currentYear);
});

let calendar = document.getElementById("calendar");

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
let days = [
	"Sun", "Mon", "Tue", "Wed",
	"Thu", "Fri", "Sat"];

$dataHead = "<tr>";
for (dhead in days) {
	$dataHead += "<th data-days='" +
		days[dhead] + "'>" +
		days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

// Function to navigate to the next month
function next() {
	currentYear = currentMonth === 11 ?
		currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

// Function to navigate to the previous month
function previous() {
	currentYear = currentMonth === 0 ?
		currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ?
		11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

// Function to jump to a specific month and year
function jump() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

// Function to display the calendar
function showCalendar(month, year)
 {
	calendarView.innerHTML = ""; // clear view
	monthAndYear.innerHTML = months[month] + "" + year;
	selectYear.value = year;
	selectMonth.value = month; 

	if (viewType === "daily") {
		renderDailyView();
	} else if (viewType === "weekly") {
		renderWeeklyView();
	} else {
		// Default to monthly view
		renderMonthlyView(month, year);
	}
	displayReminders();	
}

// Function to handle view changes
function changeView() {
    const viewType = document.getElementById("viewType").value;
    
    if (viewType === "daily") {
        renderDailyView();
    } else if (viewType === "weekly") {
        renderWeeklyView();
    } else {
        showCalendar(currentMonth, currentYear); // Monthly
    }
}

// Render daily view
function renderDailyView() {
    const tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    let todayDate = new Date();
    let row = document.createElement("tr");
    let cell = document.createElement("td");

    cell.className = "date-picker selected";
    cell.innerHTML = `<span>${todayDate.getDate()}</span>`;
    row.appendChild(cell);
    tbl.appendChild(row);

    monthAndYear.innerHTML = months[todayDate.getMonth()] + " " + todayDate.getFullYear();
}

// Render weekly view
function renderWeeklyView() {
    const tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    let todayDate = new Date();
    let startOfWeek = new Date(todayDate);
    startOfWeek.setDate(todayDate.getDate() - todayDate.getDay()); // Go to Sunday

    let row = document.createElement("tr");

    for (let i = 0; i < 7; i++) {
        let day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        let cell = document.createElement("td");
        cell.className = "date-picker";
        cell.innerHTML = `<span>${day.getDate()}</span>`;
        row.appendChild(cell);
    }
    
    tbl.appendChild(row);

    monthAndYear.innerHTML = "Week of " + startOfWeek.toLocaleDateString();
}






function renderMonthlyView(month, year) {
	let firstDay = new Date(year, month, 1).getDay();
	let date = 1;

	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {
			let cell = document.createElement("td");

			if (i === 0 && j < firstDay) {
				cell.textContent = "";
			} else if (date > daysInMonth(month, year)) {
				break;
			} else {
				cell.setAttribute("data-date", date);
				cell.setAttribute("data-month", month + 1);
				cell.setAttribute("data-year", year);
				cell.setAttribute("data-month_name", months[month]);
				cell.className = "date-picker";
				cell.innerHTML = "<span>" + date + "</span>";

				if (
					date === today.getDate() &&
					year === today.getFullYear() &&
					month === today.getMonth()
				) {
					cell.classList.add("selected");
				}

				if (hasEventOnDate(date, month, year)) {
					cell.classList.add("event-marker");
					cell.appendChild(createEventTooltip(date, month, year));
				}
				date++;
			}
			row.appendChild(cell);
		}
		calendarView.appendChild(row);
	}
}


// Function to create an event tooltip
function createEventTooltip(date, month, year) 
{
	let tooltip = document.createElement("div");
	tooltip.className = "event-tooltip";
	let eventsOnDate = getEventsOnDate(date, month, year);
	for (let i = 0; i < eventsOnDate.length; i++) {
		let event = eventsOnDate[i];
		let eventDate = new Date(event.date);
		let eventText = `<strong>${event.title}</strong> - 
			<a href="${event.description}" target="_blank">View Recipe</a><br>
			on ${eventDate.toLocaleDateString()}`;
		let eventElement = document.createElement("p");
		eventElement.innerHTML = eventText;
		tooltip.appendChild(eventElement);
	}
	return tooltip;
}

// Function to get events on a specific date
function getEventsOnDate(date, month, year) 
{
	return events.filter(function (event) 
	{
		let eventDate = new Date(event.date);
		return (
			eventDate.getDate() === date &&
			eventDate.getMonth() === month &&
			eventDate.getFullYear() === year
		);
	});
}

// Function to check if there are events on a specific date
function hasEventOnDate(date, month, year) 
{
	return getEventsOnDate(date, month, year).length > 0;
}

// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Call the showCalendar function initially to display the calendar
showCalendar(currentMonth, currentYear);

document.getElementById("addMeal").addEventListener("click", function () 
{
	let date = eventDateInput.value;
	let title = eventTitleInput.value;
	let description = document.getElementById("recipeLink" || recipeID).value; // Use recipe link as description

	if (date && title) {
		let eventId = eventIdCounter++;

		events.push({
			id: eventId,
			date: date,
			title: title,
			description: description
		});

		showCalendar(currentMonth, currentYear);
		eventDateInput.value = "";
		eventTitleInput.value = "";
		document.getElementById("recipeLink").value = "";
		displayReminders();
	}
});
