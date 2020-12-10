/* eslint-disable func-names */
const maxNum = 7;
const minNum = 0;
const droptownRoomsText = [];
const droptownGuestsText = [];
const droptownRoomsDefaultText = 'Удобства номера';
const droptownGuestsDefaultText = 'Сколько гостей';
let totalNotbaby = 0;
const itemsGuests = [
	{
		item: 'notbaby',
		words: ['', 'гость', 'гостя', 'гостей'],
	},
	{
		item: 'baby',
		words: ['', 'младенец', 'младенца', 'младенцев'],
	}];
const itemsRooms = [
	{
		item: 'bedroom',
		words: ['', 'спальня', 'спальни', 'спален'],
	},
	{
		item: 'bed',
		words: ['', 'кровать', 'кровати', 'кроватей'],
	},
	{
		item: 'bathroom',
		words: ['', 'ванная комната', 'ванные комнаты', 'ванных комнат'],
	},
];

let type;
let item;
let val;
let DropdownText;

$(document).ready(() => {
	// Функция отключения кнопок, нужна для функции, которая задает текст в дропдауне
	function dropdownButtonDisable(elem) {
		if (val === minNum) {
			$(elem).find('#button-minus').attr('disabled', true);
		}
		if (val !== maxNum) {
			$(elem).find('#button-plus').removeAttr('disabled');
		}
	}
	// Функция определения необходимого окончания, нужна для функции, которая задает текст в дропдауне
	function dropdownTextSemantica(array, outputArray) {
		for (let n = 0; n < array.length; n++) {
			if (array[n].item === item) {
				let message;
				if (val === 0) {
					message = array[n].words[0];
				} else if (val === 1) {
					message = `${val} ${array[n].words[1]}`;
				} else if (val <= 4) {
					message = `${val} ${array[n].words[2]}`;
				} else {
					message = `${val} ${array[n].words[3]}`;
				}
				outputArray[n] = message;
				break;
			}
		}
	}
	// Функция, которая задает текст дропдауну, нужна для функции сбора слов
	function setDropdownText(elem, text) {
		$(elem).text(text);
	}
	// Функция сбора слов с разных параметров в один текст
	function collectDropdownText(elem, arr, def) {
		let text = '';
		for (let i = 0; i < arr.length; i++) {
			if (text.length + arr[i].length > 25) {
				text += '...';
				break;
			}
			if (i !== 0 && text !== '' && arr[i] !== '') {
				text += ', ';
			}

			text += arr[i];
		}
		if (text === '') text = def;
		setDropdownText(elem, text);
	}
	// Задаёт текст в дропдауне, согласно его типу и значениям его параметров
	function dropdownInitialize(dropdown) {
		type = $(dropdown).find('.dropdown__item').data('type');
		DropdownText = $(dropdown).find('.dropdown__text');
		let sum = 0;
		if (type === 'room') {
			$(dropdown).find('.dropdown__item').each(function () {
				item = $(this).data('item');
				val = $(this).find('.dropdown__quantity').text();
				sum += val;
				dropdownButtonDisable(this);// Функция отключения кнопок
				dropdownTextSemantica(val, itemsRooms, droptownRoomsText);// Функция определения необходимого окончания
			});
			collectDropdownText(DropdownText, droptownRoomsText, droptownGuestsDefaultText);// Функция сбора слов с разных параметров в один текст
		} else if (type === 'guest') {
			$(dropdown).find('.dropdown__item').each(function () {
				item = $(this).data('item');
				val = $(this).find('.dropdown__quantity').text();
				sum += val;
				dropdownButtonDisable(this);// Функция отключения кнопок
				if ($(this).data('item') === 'notbaby') {
					totalNotbaby += +val;
					dropdownTextSemantica(totalNotbaby, itemsGuests, droptownGuestsText);// Функция определения необходимого окончания
				} else {
					dropdownTextSemantica(val, itemsGuests, droptownGuestsText);// Функция определения необходимого окончания
				}
				collectDropdownText(DropdownText, droptownGuestsText, droptownGuestsDefaultText);// Функция сбора слов в один текст
			});
			if (sum === 0) {
				$(dropdown).find('.dropdown__clear').addClass('dropdown__clear_disabled');
			}
		}
	}

	// Функция присвоения значений текста в дропдаунах прии загрузке страницы
	$('.dropdown').each(function () {
		dropdownInitialize(this);
	});

	// Функция обработки клика по дропдауну
	$('.dropdown__text').click(function () {
		const dropdown = $(this).parent('.dropdown');
		$(dropdown).toggleClass('dropdown_expanded');
		$(dropdown).find('.dropdown__menu').toggleClass('dropdown__menu_showed');
	});
	// Функция, которая используется в функции обработки клика по плюс-минус
	function dropdownTypeDistribution(text, isCalc) {
		if (type === 'room') {
			dropdownTextSemantica(val, itemsRooms, droptownRoomsText);// Окончание
			collectDropdownText(text, droptownRoomsText, droptownRoomsDefaultText);// Сбор слов в один текст
		} else if (type === 'guest') {
			if (type === 'guest') {
				if (item === 'notbaby') {
					if (isCalc) {
						totalNotbaby++;
					} else {
						totalNotbaby--;
					}
					dropdownTextSemantica(totalNotbaby, itemsGuests, droptownGuestsText);
				} else {
					dropdownTextSemantica(val, itemsGuests, droptownGuestsText);
				}
				collectDropdownText(text, droptownGuestsText, droptownGuestsDefaultText);
			}
		}
	}

	// Функция обработки клика по кнопкам плюс и минус
	$('.dropdown__button').click(function () {
		const parent = $(this).parent('.dropdown__controls');
		const value = $(parent).find('.dropdown__quantity');
		const menu = $(parent).parent('.dropdown__item').parent('.dropdown__menu');
		const clearButton = $(menu).find('.dropdown__clear');
		item = $(parent).parent('.dropdown__item').data('item');
		type = $(parent).parent('.dropdown__item').data('type');
		val = $(value).text();
		let isCalc = false;
		if (this.textContent === '+') {
			val++;
			isCalc = true;
			$(value).text(val);// присвоение значения параметру
			$(clearButton).removeClass('dropdown__clear_disabled');// включение кнопки "очистить"
			if (val === maxNum) {
				$(this).attr('disabled', true);
			} else if (val === minNum + 1) {
				$(parent).find('#button-minus').removeAttr('disabled');
			}
		} else {
			val--;
			$(value).text(val);
			if (val === minNum) {
				$(this).attr('disabled', true);
				let sum = 0;
				$(menu).find('.dropdown__quantity').each(function () {
					sum += +$(this).text();
				});
				if (sum === 0) $(clearButton).addClass('dropdown__clear_disabled');// отключение кнопки "очистить"
			} else if (val === maxNum - 1) {
				$(parent).find('#button-plus').removeAttr('disabled');
			}
		}

		DropdownText = $(parent).parent('.dropdown__item').parent('.dropdown__menu').parent('.dropdown')
			.find('.dropdown__text');

		dropdownTypeDistribution(DropdownText, isCalc);
	});

	// Клик по кнопке "Применить"
	$('.button_purple').click(function () {
		const dropdown = $(this).parent('.dropdown__apply').parent('.dropdown__buttons').parent('.dropdown__menu')
			.parent('.dropdown');

		$(dropdown).find('.dropdown__menu').toggleClass('dropdown__menu_showed');
		$(dropdown).toggleClass('dropdown_expanded');
	});

	// Клик по кнопке "Очистить"
	$('.button_gray').click(function () {
		const dropdown = $(this).parent('.dropdown__clear').parent('.dropdown__buttons').parent('.dropdown__menu')
			.parent('.dropdown');
		const dropdownItem = $(dropdown).find('.dropdown__item');
		const isGuest = $(dropdownItem).data('type') === 'guest';
		if (isGuest) totalNotbaby = 0;
		$(dropdownItem).find('.dropdown__quantity').each(function () {
			$(this).text(minNum);
		});
		dropdownInitialize(dropdown);
	});
});
