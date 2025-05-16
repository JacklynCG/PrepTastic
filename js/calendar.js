//views
let viewType = "weekly";  
let currentDate = new Date();  
let calendarView = document.getElementById("calendar-body");


let events = [];

let eventDateInput =
	document.getElementById("eventDate");
let eventTitleInput =
	document.getElementById("eventTitle");
let eventDescriptionInput =
	document.getElementById("eventDescription");
let reminderList =
	document.getElementById("reminderList");

let eventIdCounter = 1;

//Adding events
function addEvent() {
    const date = document.getElementById("eventDate").value;
    const mealType = document.querySelector('input[name="mealType"]:checked').value;
    const recipeLink = document.getElementById("mealInput").value;

    if (!date || !mealType || !recipeLink) {
        alert("Please fill in all fields.");
        return;
    }

    fetch("plannedMeals.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `recipeName=${encodeURIComponent(mealType)}&link=${encodeURIComponent(recipeLink)}&date=${encodeURIComponent(date)}`,
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data); // Log the response from the PHP file
            alert("Meal added successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to add meal.");
        });
}

function deleteEvent(eventId) 
{
	let eventIndex =
		events.findIndex((event) =>
			event.id === eventId);

	if (eventIndex !== -1) {
		events.splice(eventIndex, 1);
		showCalendar(currentMonth, currentYear);
		displayReminders();
	}
}


function displayReminders() 
{
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

//the calander's rangfe 
function generate_year_range(start, end) 
{
	let years = "";
	for (let year = start; year <= end; year++) {
		years += "<option value='" +
			year + "'>" + year + "</option>";
	}
	return years;
}

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

//navigation (month)
function next() {
	currentYear = currentMonth === 11 ?
		currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

function previous() {
	currentYear = currentMonth === 0 ?
		currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ?
		11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

//Jumping by year/motnh
function jump() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

//Displays/views:

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


function renderDailyView() {
    const tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    let todayDate = new Date();
    let row = document.createElement("tr");
    let cell = document.createElement("td");

    cell.className = "date-picker selected";
    cell.innerHTML = `<span>${todayDate.getDate()}</span>`;


    const selectedMeal = document.querySelector('input[name="mealOpt"]:checked');

    if (hasEventOnDate(todayDate.getDate(), todayDate.getMonth(), todayDate.getFullYear()) && selectedMeal) {
        if (selectedMeal.id === "breakfast") {
            cell.classList.add("event-marker-breakfast");
        } else if (selectedMeal.id === "lunch") {
            cell.classList.add("event-marker-lunch");
        } else if (selectedMeal.id === "dinner") {
            cell.classList.add("event-marker-dinner");
        }
        cell.appendChild(createEventTooltip(todayDate.getDate(), todayDate.getMonth(), todayDate.getFullYear()));
    }

    row.appendChild(cell);
    tbl.appendChild(row);

    monthAndYear.innerHTML = months[todayDate.getMonth()] + " " + todayDate.getFullYear();
}

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

		if (hasEventOnDate(day.getDate(), day.getMonth(), day.getFullYear())) {
			cell.classList.add("event-marker");
			cell.appendChild(createEventTooltip(day.getDate(), day.getMonth(), day.getFullYear()));
		}

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



//MUST BE IN INDIVIDUALLY RENDERED VIEW
document.querySelectorAll('input[name="mealOpt"]').forEach(radio => {
    radio.addEventListener('change', mealType);
});

function mealType() {
    const selectedMeal = document.querySelector('input[name="mealOpt"]:checked');
    if (selectedMeal) {
        console.log(`Selected meal type: ${selectedMeal.value}`);
        
    }
}




function hasEventOnDate(date, month, year) 
{
	return getEventsOnDate(date, month, year).length > 0;
}


function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}


showCalendar(currentMonth, currentYear);

document.getElementById("addMeal").addEventListener("click", function () 
{
	let date = eventDateInput.value;
	let title = eventTitleInput.value;
	let description = document.getElementById("recipeLink" || recipeID).value; 

	if (date && title)
		 {
		let eventId = eventIdCounter++;
		events.push(
			{
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
