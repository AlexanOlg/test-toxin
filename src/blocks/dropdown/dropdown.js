/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable radix */
// document.addEventListener('DOMContentLoaded', () => {

// });

$(document).ready(() => {
	$('.minus').click(function () {
		const $input = $(this).parent().find('input');
		let count = parseInt($input.val()) - 1;
		count = count < 0 ? 0 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.plus').click(function () {
		const $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

	function declOfNum(number, titles) {
		cases = [2, 0, 1, 1, 1, 2];
		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
	}
	function numberOfInputs() {
		const $inputs = $(this).closest('.dropdown').find('input');
		const $content = $(this).closest('.dropdown').find('.dropdown-content__box');
		let text = '';
		const valArr = [];
		const textArr = [];
		let summ = parseInt('0');
		const $numberInputs = $inputs.map((indx, element) => parseInt($(element).val()));
		for (let i = 0; i < $numberInputs.length; i++) {
			summ += $numberInputs[i];
		}
		if (summ === 0 && $(this).closest('.dropdown').find('.dropdown__dropdownBtn').hasClass('dropdown-guests')) {
			$(this).closest('.dropdown').find('.btnText').text('Сколько гостей');
			return true;
		}

		if ($(this).closest('.dropdown').find('.dropdown__dropbtn').hasClass('dropdown-guests')) {
			$(this).closest('.dropdown').find('.btnText').text(`${summ} ${declOfNum(summ, ['гость', 'гостя', 'гостей'])}`);
		} else if ($(this).closest('.dropdown').hasClass('dropdown-services')) {
			for (let i = 0; i < $content.length; i++) {
				valArr.push($($content[i]).closest('.dropdown-content__line').find('input').val());
				textArr.push($($content[i]).closest('.dropdown-content__line').find('p').html());
				text += `${valArr[i]} ${textArr[i]}`;
				if (i !== $content.length - 1) {
					text += ',';
				}
			}
			$(this).closest('.dropdown').find('.btnText').text(text);
		}
	}
	$('.dropdown-content__box-button').find('button').click(numberOfInputs);
	window.addEventListener('load', () => {
		const dropdownContent = document.querySelectorAll('.dropdown-guests');
		for (const content of dropdownContent) {
			const inputs = content.parentElement.getElementsByTagName('input');
			const btnText = content.querySelector('.btnText');
			let i = 0;

			for (const input of inputs) {
				i += Number(input.value);
			}
			if (i > 0) {
				btnText.innerHTML = (`${i} ${declOfNum(i, ['гость', 'гостя', 'гостей'])}`);
			}
		}
	});
	// default val for input for services
	const $content = $('.dropdown-services');
	$content.each((indx, element) => {
		let text = '';
		const valArr = [];
		const textArr = [];
		const $lines = $(element).find('.dropdown-content__line');
		for (let i = 0; i < $lines.length; i++) {
			valArr.push($($lines[i]).find('input').val());
			textArr.push($($lines[i]).find('p').html());
			text += `${valArr[i]} ${textArr[i]}`;
			if (i !== $lines.length - 1) {
				text += ',';
			}
		}
		$(element).find('.btnText').text(text);
	});
	// resize input

	function resizeInput() {
		$(this).attr('size', $(this).val().length);
	}
	$('input[type="text"]')
	// event handler
		.keyup(resizeInput)
	// resize on page load
		.each(resizeInput);

	// show-hide
	$('.dropdown__dropbtn').click(function () {
		if ($(this).next('.dropdown-content').hasClass('dropdown-content__show')) {
			$(this).next('.dropdown-content').removeClass('dropdown-content__show');
		} else $(this).next('.dropdown-content').addClass('dropdown-content__show');
	});
	// buttons
	$('.form-elements__btn-container .clear').click(function () {
		$(this).closest('.dropdown').find('.btnText').text('Сколько гостей');
		const $inputs = $(this).closest('.dropdown').find('input');
		const $numberInputs = $inputs.map((indx, element) => parseInt($(element).val()));
		for (let i = 0; i < $numberInputs.length; i++) {
			$numberInputs[i] = 0;
			$inputs.val('0');
		}
	});
	$('.form-elements__btn-container .submit').click(() => {
		$('.dropdown-content').removeClass('dropdown-content__show');
	});
});
