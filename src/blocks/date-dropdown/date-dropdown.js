document.addEventListener('DOMContentLoaded', () => {
	// Обработка клика по date-dropdown
	const calendars = document.querySelectorAll('.date-dropdown');
	calendars.forEach((calendar) => {
		const inStart = calendar.querySelector('.date-dropdown__input-in');
		const outEnd = calendar.querySelector('.date-dropdown__input-out');
		const open = calendar.querySelector('.date-dropdown__calendar');
		inStart.addEventListener('click', () => open.classList.toggle('active'));
		outEnd.addEventListener('click', () => open.classList.toggle('active'));
	});
	// Обработка клика по filter_date-dropdown
	const filterCalendars = document.querySelectorAll('.filter_date-dropdown');
	filterCalendars.forEach((filterCalendar) => {
		const start = filterCalendar.querySelector('.filter_date-dropdown__input');
		const open = filterCalendar.querySelector('.filter_date-dropdown__calendar');
		start.addEventListener('click', () => open.classList.toggle('active'));
	});
});
