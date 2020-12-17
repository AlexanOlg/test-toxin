document.addEventListener('DOMContentLoaded', () => {
	// Обработка клика по дропдауну
	const dropdowns = document.querySelectorAll('.dropdown');
	dropdowns.forEach((dropdown) => {
		const button = dropdown.querySelector('.dropdown__button-tick');
		const menu = dropdown.querySelector('.dropdown__menu');
		button.addEventListener('click', () => menu.classList.toggle('active'));
	});
});
