/* eslint-disable no-underscore-dangle */

class DropdownOptions {
	constructor(element, newDrop) {
		this._items = element;
		this._getElement();
		this._processElem();
		this._checkValue();
		this._newDrop = newDrop;
	}

	// Получаем все элементы из dropdown-options
	_getElement() {
		this.option = this._items.querySelector('.dropdown__button-list');
		this._min = this.option.dataset.min ? Number(this.option.dataset.min) : 0;
		// Находим input
		this._num = this._items.querySelector('.dropdown__number');
		this._max = Number(this._num.max);
		this._min = Number(this._num.min);
		this.value = Number(this._num.value);

		this._plusAll = this._items.querySelectorAll('.dropdown__button-plus');
		this._plusAll.forEach((plus) => {
			this._plusBtn = plus;
		});
		this._minusAll = this._items.querySelectorAll('.dropdown__button-minus');
		this._minusAll.forEach((minus) => {
			this._minusBtn = minus;
		});
	}

	// Над плюсом и минусом слушаем событи клик
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
		// Метод включения-отключения Минуса
		this._checkValue();
		this._newDrop(this.value);
	}

	// Метод добавления в _num текущего значения
	_updateNum() {
		this._num.value = this.value;
	}

	// Функция, которая объединяет два метода у минуса
	_checkValue() {
		if (this.value === this._min) {
			this._removeMinus();
		} else {
			this._addMinus();
		}
	}

	// Метод, который возвращает значение, равное минимальному
	isMin() {
		return this.value === this._min;
	}

	// Метод, который возвращает значение, равное 0
	isZerro() {
		return this.value === 0;
	}

	// Функция, которая возвращает значения элементов
	getValue() {
		return this.value;
	}

	// Функция добавления активного и неактивного класса у минуса
	_addMinus() {
		if (
			this._minusBtn.classList.contains('dropdown__minus_disabled')
		) {
			this._minusBtn.classList.remove('dropdown__minus_disabled');
		}
	}

	// Функция добавления неактивного класса у минуса
	_removeMinus() {
		this._minusBtn.classList.add('dropdown__minus_disabled');
	}
}

export { DropdownOptions };
