/* eslint-disable no-underscore-dangle */

class DropdownOptions {
	constructor(element, newDrop) {
		this._items = element;
		this._getElement();
		this._processElem();
		this._checkValue();
		this._newDrop = newDrop;
		// Значение data-name находим у каждого items, а не у dropdown
		// что бы он видео сколько кроватей, ванных и.т.д
		this.name = this._items.dataset.name;
	}

	_getElement() {
		this.option = this._items.querySelector('.dropdown__button-list');
		this._min = this.option.dataset.min ? Number(this.option.dataset.min) : 0;
		this._num = this._items.querySelector('.dropdown__number');
		this.value = Number(this._num.textContent);
		this._plusAll = this._items.querySelectorAll('.dropdown__button-plus');
		this._plusAll.forEach((plus) => {
			this._plusBtn = plus;
		});
		this._minusAll = this._items.querySelectorAll('.dropdown__button-minus');
		this._minusAll.forEach((minus) => {
			this._minusBtn = minus;
		});
		console.log(this._min);
	}

	_allChildSum(index, length_) {
		let valueAdult = 0;
		let valueBabies = 0;
		const item = this._items.querySelector('.dropdown__number');
		if (index !== length_ - 1) {
			valueAdult += Number(item.textContent);
		} else {
			valueBabies += Number(item.textContent);
		}
		return [valueAdult, valueBabies];
	}

	_processElem() {
		this._processPlus = this._processPlus.bind(this);
		this._plusBtn.addEventListener('click', this._processPlus);
		this._processMinus = this._processMinus.bind(this);
		this._minusBtn.addEventListener('click', this._processMinus);
	}

	// При нажатии на плюс-минус вызываем метод upValue
	_processPlus() {
		this._upValue(this.value + 1);
	}

	_processMinus() {
		this._upValue(this.value - 1);
	}

	// Метод upValue вызывает функцию обновления заголовка дропдауна
	_upValue(value_) {
		const value = value_ > this._min ? value_ : this._min;
		this.value = value;
		// Метод добавления в _num текущего значения
		this._updateNum();
		this._checkValue();
		this._newDrop(this.value);
	}

	// Метод добавления в _num текущего значения
	_updateNum() {
		this._num.innerHTML = this.value;
	}

	_checkValue() {
		if (this.value === this._min) {
			this._removeMinus();
		} else {
			this._addMinus();
		}
	}

	isMin() {
		return this.value === this._min;
	}

	isZerro() {
		return this.value === 0;
	}

	getString() {
		if (this.name !== undefined) {
			// return this.value;
		}
		return this.value;
	}

	// Функция, которая возвращает значения элементов
	_getValue() {
		return this.value;
	}

	_addMinus() {
		if (
			this._minusBtn.classList.contains('dropdown__minus_disabled')
		) {
			this._minusBtn.classList.remove('dropdown__minus_disabled');
		}
	}

	_removeMinus() {
		this._minusBtn.classList.add('dropdown__minus_disabled');
	}
}

export { DropdownOptions };
