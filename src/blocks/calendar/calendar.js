import 'air-datepicker/dist/css/datepicker.min.css';
import 'air-datepicker';

$(() => {
	$('.calendar').datepicker({
		multipleDates: '2',
		multipleDatesSeparator: '',
		range: true,
		prevHtml: 'arrow_back',
		nextHtml: 'arrow_forward',
		navTitles: {
			days: '<h2>MM yyyy</h2>',
		},
		onSelect(formattedDate) {
			$.dates = formattedDate;
		},
		showButtonPanel: false,
	});
});
$.fn.datepicker.language.ru = {
	days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
	daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
	today: 'Применить',
	clear: 'Очистить',
	dateFormat: 'dd.mm.yyyy',
	timeFormat: 'hh:ii',
	firstDay: 1,
};
$(() => {
	$('.js-datepicker-container').each(function findCalendar() {
		const item = $(this);

		const dateFrom = item.find('.js-datepicker-start');
		const dateTo = item.find('.js-datepicker-end');

		item.find('.js-datepicker').datepicker({
			clearButton: true,
			range: true,
			multipleDatesSeparator: ' - ',
			prevHtml: '<i class="datepicker--icon material-icons">arrow_back</i>',
			nextHtml: '<i class="datepicker--icon material-icons">arrow_forwards</i>',
			navTitles: {
				days: 'MM  <i>yyyy</i>',
			},

			onSelect(data) {
				dateFrom.val(data.split('-')[0]);
				dateTo.val(data.split('-')[1]);
			},
		});

		const datep = item.find('.js-datepicker').data('datepicker');

		const datepEl = datep.$datepicker;

		const applyButton = $("<span class='datepicker--button'>Применить</span>");

		applyButton.click(() => {
			if (datep.selectedDates.length < 2) return;
			datep.hide();
		});

		datepEl.find('.datepicker--buttons').append(applyButton);
		dateTo.click(() => datep.show());
		dateFrom.click(() => datep.show());
	});
});
