const rateButtons = document.querySelectorAll('.button__stars');

for (let i = 0; i <= rateButtons.length - 1; i++) {
	const maxRating = rateButtons[i].dataset.maxRating;
	const rating = rateButtons[i].dataset.rating;
	for (let k = 0; k <= rating - 1; k++) {
		const createButtons = document.createElement('i');
		createButtons.classList.add('material-font');
		createButtons.innerHTML = 'star';
		rateButtons[i].appendChild(createButtons);
	}
	for (let j = 0; j <= maxRating - rating - 1; j++) {
		const createButtons = document.createElement('i');
		createButtons.classList.add('material-font');
		createButtons.innerHTML = 'star_border';
		rateButtons[i].appendChild(createButtons);
	}
}
