/* eslint-disable max-len */
/* eslint-disable radix */
document.addEventListener('DOMContentLoaded', () => {
	// Функция склонения слов
	// function declination(n, textForms) {
	// 	n = Math.abs(n) % 100; const n1 = n % 10;
	// 	if (n > 10 && n < 20) { return textForms[2]; }
	// 	if (n1 > 1 && n1 < 5) { return textForms[1]; }
	// 	if (n1 === 1) { return textForms[0]; }
	// 	return textForms[2];
	// }
	// let wordsVariant = ['гость', 'гостя', 'гостей'];
	// Находим все дропдауны на странице
	const dropdowns = document.querySelectorAll('.dropdown');

	// Обработка клика по дропдауну
	dropdowns.forEach((dropdown) => {
		const dropdownName = dropdown.querySelector('.dropdown__name');
		const dropdownList = dropdown.querySelector('.dropdown-list');
		dropdownName.addEventListener('click', () => dropdownList.classList.toggle('active'));
		// Обработка кнопки плюс
		const number = dropdown.querySelector('.dropdown__number');
		const btnPlus = dropdown.querySelectorAll('.dropdown__button-plus');
		for (let j = 0; j < btnPlus.length; j++) {
			btnPlus[j].onclick = () => {
				const plusValue = +number.textContent;
				number.innerHTML = plusValue + 1;
			};
		}
		// Обработка кнопки минус
		const btnMinus = dropdown.querySelectorAll('.dropdown__button-minus');
		for (let j = 0; j < btnMinus.length; j++) {
			btnMinus[j].onclick = () => {
				const plusValue = +number.textContent;
				number.innerHTML = plusValue - 1;
			};
		}
	});
});
