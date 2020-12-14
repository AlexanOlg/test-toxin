import '../../index';

const dropdownBtns = document.querySelectorAll(
	'.dropdown__display-button',
);
const dropdownMenu = document.querySelectorAll('.dropdown__menu');
const dropdownInput = document.querySelectorAll('.dropdown__input');
const dropdownReset = document.querySelectorAll('.dropdown__reset');
const dropdownApply = document.querySelectorAll('.dropdown__apply');

function setArray(list) {
	const fullArr = [];
	for (let i = 0; i < list.length; i += 1) {
		const tripleArr = [];
		for (let j = 0; j < list.length; j++) {
			tripleArr.push(list[i + j]);
		}
		fullArr.push(tripleArr);
	}
	return fullArr;
}
const dropdownMinus = setArray(
	document.querySelectorAll('.dropdown__button-minus'),
);
const dropdownPlus = setArray(
	document.querySelectorAll('.dropdown__button-plus'),
);
const dropdownNumbers = setArray(
	document.querySelectorAll('.dropdown__number'),
);

function hideReset(el) {
	el.classList.toggle('hide');
}

function sumValues(i) {
	let value = 0;
	for (let j = 0; j < 3; j++) {
		value += Number(dropdownNumbers[i][j].innerText);
	}
	return value;
}
if (dropdownInput.length > 0) {
	window.onload = function ending() {
		for (let i = 0; i < dropdownInput.length; i++) {
			const value = sumValues(i);
			if (value === 0) {
				dropdownInput[i].value = 'Сколько гостей';

				hideReset(dropdownReset[i]);
			} else {
				dropdownInput[i].value = `${value} гостя`;
			}
		}
	};
}

for (let i = 0; i < dropdownBtns.length; i++) {
	dropdownBtns[i].onclick = function showMenu() {
		hideReset(dropdownMenu[i]);
	};

	dropdownReset[i].onclick = function clearMenu() {
		dropdownInput[i].value = 'Сколько гостей';
		for (let j = 0; j < 3; j++) {
			dropdownNumbers[i][j].innerText = '0';
		}
		hideReset(dropdownReset[i]);
	};

	for (let j = 0; j < 3; j++) {
		dropdownMinus[i][j].onclick = function setOfMinus() {
			let value = dropdownNumbers[i][j].innerText;
			if (value > 0) {
				dropdownNumbers[i][j].innerText = value - 1;
				value = sumValues(i);
				if (value === 0) {
					dropdownInput[i].value = 'Сколько гостей';
					hideReset(dropdownReset[i]);
				} else {
					dropdownInput[i].value = `${value} гостя`;
				}
			}
		};
	}

	for (let j = 0; j < 3; j++) {
		dropdownPlus[i][j].onclick = function setOfPus() {
			let value = dropdownNumbers[i][j].innerText;
			dropdownNumbers[i][j].innerText = Number(value) + 1;
			value = sumValues(i);
			if (value === 1) {
				hideReset(dropdownReset[i]);
			}
			dropdownInput[i].value = `${value} гостя`;
		};
	}

	dropdownApply[i].onclick = function applyClick() {
		hideReset(dropdownMenu[i]);
	};
}
// Проверка на реакцию на клик
$('body').on('click', '.dropdown__button-minus', () => {
	console.log('SomeText');
});
