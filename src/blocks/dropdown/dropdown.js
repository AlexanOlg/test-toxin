document.addEventListener('DOMContentLoaded', () => {
	// Находим все дропдауны на странице
	const dropdowns = document.querySelectorAll('.dropdown');

	// Обработка клика по дропдауну
	dropdowns.forEach((dropdown) => {
		const button = dropdown.querySelector('.dropdown__button-tick');
		const menu = dropdown.querySelector('.dropdown__menu');
		button.addEventListener('click', () => menu.classList.toggle('active'));
	});
});
// // Клик по кнопке применить - скрытие дропдауна
// const buttonSimple = document.querySelectorAll('.button-simple');
// const menu = document.querySelector('.dropdown__menu');
// buttonSimple.forEach((listItem) => {
// 	listItem.addEventListener('click', (event) => {
// 		event.stopPropagation();
// 		menu.classList.remove('active');
// 	});
// });
// // Закрыть дропдаун по клику по странице
// document.addEventListener('click', (event) => {
// 	if (event.target !== dropdowns) {
// 		menu.classList.remove('active');
// 	}
// });
