document.addEventListener('DOMContentLoaded', () => {
	function declination(n, texForms) {
		n = Math.abs(n) % 100; const n1 = n % 10;
		if (n > 10 && n < 20) { return texForms[2]; }
		if (n1 > 1 && n1 < 5) { return texForms[1]; }
		if (n1 === 1) { return texForms[0]; }
		return texForms[2];
	}
	const valWord = ['Гость', 'Гостя', 'Гостей'];
	// Находим все дропдауны на странице
	const dropdowns = document.querySelectorAll('.dropdown-wrap');
	dropdowns.forEach((dropdown) => {
		// в дропдаунах находим элементы
		const dropInput = dropdown.querySelector('.dropdown__input');
		const dropMenu = dropdown.querySelector('.dropdown__menu');
		// при нажатии на inner открываем дропдаун
		dropInput.addEventListener('click', () => {
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
							newDrop(dropdown);
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
						}
						// Отнимает 1 у текушщего значения
						if (numberItem > 0) {
							numberIE.innerText = Number.numberItem - 1;
						}
						newDrop(dropdown);
					});
				});
			});
		});
	});
	function newDrop(dropdown) {
		if (dropdown.hasAttribute('data-dropdown')) {
			const btnUsed = dropdown.querySelector('.dropdown__button-used');
			const btnReset = dropdown.querySelector('.dropdown__button-reset');
			const dropMenu = dropdown.querySelector('.dropdown__menu');
			let result = '';
			let sum = 0;
			// Находим значение по умолчанию у дропдауна "Сколько гостей?"
			const defaultData = dropdown.getAttribute('data-default');
			const items = dropdown.querySelectorAll('.dropdown__items');
			items.forEach((item) => {
				// Если у элемента списка есть атрибут word-forms
				if (item.hasAttribute('data-wordForms')) {
					// Ищем все значения number
					const elNumber = item.querySelectorAll('.dropdown__number');
					// Объявляем переменную для number
					let number;
					elNumber.forEach((numberItem) => {
						// Записываем в number значение .number
						number = Number.parseInt(numberItem.innerText);
						// К sum прибавляем значение .number
						sum += Number.parseInt(numberItem.innerText);
					});
					// Если > 0
					if (number > 0) {
						// Объявляем переменную, куда записываем форму склонения у элемента списка
						const wordForms = item.getAttribute('data-wordForms').split(' ');
						// Вызываем форму склонения
						const rightForm = declination(number, wordForms);
						// Записываем в переменную result текущее значение number и результат функции склонения
						result += ` ${number} ${rightForm}`;
					}
				}
				// Если sum = 0, то кнопке Применить даем класс display: none/ либо отнимаем его
				if (sum === 0) {
					btnUsed.classList.add('button__off');
					btnReset.classList.add('button__off');
				} else {
					btnUsed.classList.remove('button__off');
					btnReset.classList.remove('button__off');
				}
				// Событие для клика по кнопке Применить
				btnUsed.addEventListener('click', () => {
					if (sum !== 0) {
						dropdown.querySelector('.dropdown__input').innerText = `${result}...`;
						dropMenu.classList.remove('active');
					} else {
						// Записываем значение по умолчанию
						dropdown.querySelector('.dropdown__input').innerText = defaultData;
					}
				});
			});
			// Событие на кнопке Очистить
			btnReset.addEventListener('click', () => {
				// Если сумма > 0, то в заголовок пишем Значение по умолчанию
				dropdown.querySelector('.dropdown__input').innerText = defaultData;
			});
		} else {
			const btnUsed = dropdown.querySelector('.dropdown__button-used');
			const btnReset = dropdown.querySelector('.dropdown__button-reset');
			const dropMenu = dropdown.querySelector('.dropdown__menu');
			const dropInput = dropdown.querySelector('.dropdown__input');
			// Получаем значение по умолчанию "Сколько гостей" в поле data-default
			const defaultNumber = dropdown.getAttribute('data-default');
			// Получаем значение для функции склонения
			// Результат получаем из всех .number, которые будут созданны ниже в функции создания элементов управления
			const sumNumber = dropdown.querySelectorAll('.dropdown__number');
			let sum = 0; // Чтоб было к чему прибавлять
			sumNumber.forEach((numberItem) => {
				sum += (Number.parseInt(numberItem.innerText));
			});
			if (sum === 0) {
				btnUsed.classList.add('button__off');
				btnReset.classList.add('button__off');
			} else {
				btnUsed.classList.remove('button__off');
				btnReset.classList.remove('button__off');
			}
			// Вызываем функцию склонения и передаем ей сумму .number и "гость гостя гостей"
			const result = declination(sum, valWord);
			btnUsed.addEventListener('click', () => {
				if (sum !== 0) {
					dropMenu.classList.remove(active);
					dropInput.innerText = `${sum} ${result}`;
				} else {
					dropInput.innerText = defaultNumber;
				}
			});
			btnReset.addEventListener('click', () => {
				dropdown.querySelector('dropdown__input').innerText = ` ${defaultNumber}`;
			});
		}
	}
});
