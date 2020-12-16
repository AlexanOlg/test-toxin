// $(() => {
// // обработка клика по дропдауну
// 	$('.dropdown__inner').click(function setActive() {
// 		const dropdown = $(this).parent('.dropdown');

// 		$(dropdown).toggleClass('active');
// 		$(dropdown).find('.dropdown__menu').toggleClass('active');
// 	});
// });
document.addEventListener('DOMContentLoaded', () => {
	const itemAlls = document.querySelectorAll('.dropdown__menu');

	for (const itemAll of itemAlls) {
		itemAll.addEventListener('click', () => itemAll.classList.toggle('active'));
	}
});
