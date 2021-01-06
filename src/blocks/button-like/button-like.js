window.addEventListener('DOMContentLoaded', () => {
	const likeButtons = document.querySelectorAll('.button-like');
	likeButtons.forEach((likeButton) => {
		const likeCount = likeButton.querySelector('.button-like__count');
		likeButton.addEventListener('click', (event) => {
			event.stopPropagation();

			const checked = event.target.checked;
			// eslint-disable-next-line radix
			const value = parseInt(likeCount.innerHTML);
			if (checked === true) {
				likeCount.innerHTML = value + 1;
			}
			if (checked === false) {
				likeCount.innerHTML = value - 1;
			}
		});
	});
});
