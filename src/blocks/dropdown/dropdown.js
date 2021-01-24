document.addEventListener('DOMContentLoaded', () => {
	// function declination(n, texForms) {
	// 	n = Math.abs(n) % 100; const n1 = n % 10;
	// 	if (n > 10 && n < 20) { return texForms[2]; }
	// 	if (n1 > 1 && n1 < 5) { return texForms[1]; }
	// 	if (n1 === 1) { return texForms[0]; }
	// 	return texForms[2];
	// }
	// const valWord = ['Гость', 'Гостя', 'Гостей'];
	// Находим все дропдауны на странице
	const dropdowns = document.querySelectorAll('.dropdown');
	dropdowns.forEach((dropdown) => {
		// в дропдаунах находим элементы
		const dropInner = dropdown.querySelector('.dropdown__inner');
		const dropMenu = dropdown.querySelector('.dropdown__menu');
		// при нажатии на inner открываем дропдаун
		dropInner.addEventListener('click', () => {
			dropMenu.classList.toggle('active');
		});
		// находим элементы управления
		const btnUsed = dropdown.querySelector('.dropdown__button-used');
		const btnReset = dropdown.querySelector('.dropdown__button-reset');
		const items = dropdown.querySelectorAll('.dropdown__items');
		// перебираем элементы списка
		items.forEach((item) => {
			// находим в элементах списка значение number
			const number = item.querySelectorAll('.dropdown__number');
			// numberItem - значение .dropdown__number
			let numberItem = 0;
			// Перебираем значения элементов списка
			number.forEach((numberIE) => {
				// В первое значение number перезаписываем значение
				// eslint-disable-next-line radix
				numberItem = parseInt(numberIE.innerText);
				// Если дропдаун закрыт без выбора параметров
				btnUsed.addEventListener('click', () => {
					dropMenu.classList.remove('active');
				});
				// Очистить
				btnReset.addEventListener('click', () => {
					// Если значение number > 0, устанавливаем его на 0
					if (numberItem > 0) {
						numberIE.innerText = 0;
						btnReset.classList.add('button__off');
						btnUsed.classList.add('button__off');
					}
				});
				// Находим все минусы и сразу их перебираем
				const minusAll = item.querySelectorAll('.dropdown__button-minus').forEach((minus) => {
					// Находим все плюсы и перебираем их
					const plusAll = item.querySelectorAll('.dropdown__button-plus').forEach((plus) => {
						// Вешаем + на событие
						plus.addEventListener('click', () => {
							// Если значение >= 0
							if (Number.numberItem >= 0) {
								// Делаем минус неактивным
								minus.classList.remove('dropdown__minus_disabled');
							}
							// И к текущему значению прибавляем елиницу
							numberIE.innerText = Number.numberItem + 1;
							// Обновляем дропдаун
							// updateDrop(dropdown);
						});
					});
					// Если все значения по умолчанию в html меньше 1
					if (numberItem < 1) {
						// Кнопке минус - неактивный класс
						minus.classList.remove('dropdown__minus_disabled');
					} else {
						return null;
					}
					// Событие на Минус
					minus.addEventListener('click', () => {
						// Если значение элемента <= 1
						if (numberItem <= 1) {
							// Минусу делаем неактивный класс
							minus.classList.add('dropdown__minus_disabled');
						};
						// Отнимает 1 у текушщего значения
						if (numberItem > 0) {
							numberIE.innerText = Number.numberItem - 1;
						}
						// updateDrop(dropdown);
					});
				});
			});
		});
	});
});
