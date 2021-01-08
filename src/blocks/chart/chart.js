const captionsList = document.querySelectorAll('.chart__legend-item');
const unitsList = document.querySelectorAll('.chart__unit');

captionsList.forEach((item, index) => {
	item.addEventListener('mouseover', () => {
		unitsList[index].classList.add('hovered');
	});

	item.addEventListener('mouseout', () => {
		unitsList[index].classList.remove('hovered');
	});
});
