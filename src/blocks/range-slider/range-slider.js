import '../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider';

$(() => {
	$('.js-range-slider').ionRangeSlider({
		type: 'double',
		grid: true,
		min: 500,
		max: 15400,
		from: 5000,
		to: 10000,
		step: 100,
		hide_min_max: true,
		hide_from_to: true,
		onChange(data) {
			$('.range-slider__description-output').text(`${data.from.toLocaleString('ru')}₽ - ${data.to.toLocaleString('ru')}₽`);
		},
	});
});
