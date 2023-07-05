export function scripts(): void {
	// const allChips: HTMLElement[] = Array.from(document.querySelectorAll('.chip'));
	// const chipsContainer = document.querySelector('.chips__choice') as HTMLElement;
	// allChips.forEach((chip: HTMLElement) => {
	// 	chip.addEventListener('click', () => {
	// 		const activeChip: HTMLElement | null = chipsContainer.querySelector('.chip--active');
	// 		if (activeChip) {
	// 			activeChip.classList.remove('chip--active');
	// 		}
	// 		chip.classList.add('chip--active');
	// 	});
	// });
	// const chipsPrev = document.getElementById('chips-prev') as HTMLElement;
	//
	// chipsPrev.onclick = () => {
	// 	const chipsChoise = document.getElementById('chips__choise') as HTMLElement;
	// 	chipsChoise.style.transform = 'translateX(0px)';
	// 	chipsScrollMin();
	// };
	//
	// const chipsNext = document.getElementById('chips-next') as HTMLElement;
	//
	// chipsNext.onclick = () => {
	// 	const chipsChoise = document.getElementById('chips__choise') as HTMLElement;
	// 	chipsChoise.style.transform = 'translateX(-368px)';
	// 	chipsScrollMax();
	// };
	//
	// function chipsScrollMin(): void {
	// 	const chipsChoise = document.getElementById('chips__choise') as HTMLElement;
	// 	const chipsPrev = document.getElementById('chips-prev') as HTMLElement;
	// 	const chipsNext = document.getElementById('chips-next') as HTMLElement;
	//
	// 	if (chipsChoise.style.transform === 'translateX(0px)') {
	// 		chipsNext.style.display = 'flex';
	// 		chipsPrev.style.display = 'none';
	// 		// $('#scroll-chips-overlay').css(
	// 		// 	'mask-image',
	// 		// 	'linear-gradient(to left,transparent 0,transparent 51px,#000 77px, #000 100%)'
	// 		// );
	// 		const scrollChipsOverlay = document.getElementById('scroll-chips-overlay') as HTMLElement;
	// 		scrollChipsOverlay.style.maskImage =
	// 			'linear-gradient(to left,transparent 0,transparent 51px,#000 77px, #000 100%)';
	// 		return;
	// 	}
	// }
	//
	// function chipsScrollMax(): void {
	// 	const chipsChoise = document.getElementById('chips__choise') as HTMLElement;
	// 	const chipsPrev = document.getElementById('chips-prev') as HTMLElement;
	// 	const chipsNext = document.getElementById('chips-next') as HTMLElement;
	//
	// 	if (chipsChoise.style.transform === 'translateX(-368px)') {
	// 		chipsNext.style.display = 'none';
	// 		chipsPrev.style.display = 'flex';
	// 		// $('#scroll-chips-overlay').css(
	// 		// 	'mask-image',
	// 		// 	'linear-gradient(to right,transparent 0,transparent 51px,#000 77px,#000 100%)'
	// 		// );
	// 		const scrollChipsOverlay = document.getElementById('scroll-chips-overlay') as HTMLElement;
	// 		scrollChipsOverlay.style.maskImage =
	// 			'linear-gradient(to right,transparent 0,transparent 51px,#000 77px,#000 100%)';
	// 		return;
	// 	}
	// }

	// ========CHIPS END==========

	// ========DESCRIPTION==========

	const descriptionText = document.querySelector('.description-text') as HTMLElement;
	const originalText = descriptionText.textContent;
	const description = document.querySelector('#play-video-description') as HTMLElement;
	const text = descriptionText.innerHTML;
	const trimmedText = text.substring(0, 30) + '... Read more';
	descriptionText.textContent = trimmedText;
	function toggleDescription(): void {
		const height = window.getComputedStyle(description).getPropertyValue('height');
		if (height === '64px') {
			description.style.height = 'auto';
			descriptionText.textContent = originalText;
		} else {
			description.style.height = '64px';
			descriptionText.textContent = trimmedText;
		}
	}
	document.querySelector('.play-video-description')?.addEventListener('click', toggleDescription);

	// ========DESCRIPTION==========
	// ========COMMENTS==========

	let contains = false;

	function foo(x: MediaQueryList): void {
		if (x.matches) {
			const comments = document.getElementById('play-video-comments') as HTMLElement;
			const videoContainer = document.getElementById('play-video') as HTMLElement;
			const moreComments = document.getElementById('more-comments') as HTMLElement;
			const row = document.getElementById('row') as HTMLElement;

			videoContainer.removeChild(comments);
			videoContainer.removeChild(moreComments);
			row.insertAdjacentElement('beforeend', comments);
			row.insertAdjacentElement('beforeend', moreComments);
			contains = true;
		} else {
			const comments = document.getElementById('play-video-comments') as HTMLElement;
			const videoContainer = document.getElementById('play-video') as HTMLElement;
			const moreComments = document.getElementById('more-comments') as HTMLElement;
			const row = document.getElementById('row') as HTMLElement;
			if (contains) {
				row.removeChild(comments);
				row.removeChild(moreComments);
				videoContainer.insertAdjacentElement('beforeend', comments);
				videoContainer.insertAdjacentElement('beforeend', moreComments);
				contains = false;
			}
		}
	}

	const media = window.matchMedia('(max-width:1027px)');
	foo(media);
	media.addEventListener('change', () => {
		foo(media);
	});

	// ================VIDEO SHOW MORE MOBILE ==================

	const container = document.getElementById('right-videolist') as HTMLElement;
	const showMoreButton = document.getElementById('showMoreButton') as HTMLElement;
	const itemsToShow = container.getElementsByClassName('side-video-list');

	function screenWidthVideos(): void {
		if (window.innerWidth <= 600) {
			for (let i = 1; i < itemsToShow.length; i++) {
				(itemsToShow[i] as HTMLElement).style.display = 'none';
				showMoreButton.style.display = 'block';
			}

			showMoreButton.addEventListener('click', function () {
				for (let i = 1; i < itemsToShow.length; i++) {
					(itemsToShow[i] as HTMLElement).style.display = 'block';
				}

				showMoreButton.style.display = 'none';
			});
		} else {
			for (let i = 0; i < itemsToShow.length; i++) {
				(itemsToShow[i] as HTMLElement).style.display = 'flex';
			}
			showMoreButton.style.display = 'none';
		}
	}

	screenWidthVideos();
	window.addEventListener('resize', screenWidthVideos);

	// ================VIDEO SHOW MORE MOBILE ==================

	// ================COMMENTS SHOW MORE ==================

	const commentsContainer = document.getElementById('play-video-comments') as HTMLElement;
	const showMoreComments = document.getElementById('more-comments') as HTMLElement;
	const commentsToShow = commentsContainer.getElementsByClassName('comment-container');

	function screenWidthComments(): void {
		if (window.innerWidth > 600) {
			for (let i = 2; i < commentsToShow.length; i++) {
				(commentsToShow[i] as HTMLElement).style.display = 'none';
				showMoreComments.style.display = 'flex';
				commentsContainer.style.maskImage =
					'linear-gradient(180deg, rgba(0, 0, 0, 1), transparent 150%)';
			}

			showMoreComments.addEventListener('click', function () {
				for (let i = 1; i < commentsToShow.length; i++) {
					(commentsToShow[i] as HTMLElement).style.display = 'flex';
					commentsContainer.style.maskImage = 'none';
				}
				showMoreComments.style.display = 'none';
			});
		} else {
			for (let i = 0; i < commentsToShow.length; i++) {
				(commentsToShow[i] as HTMLElement).style.display = 'flex';
			}
			showMoreComments.style.display = 'none';
		}
	}

	screenWidthComments();
	window.addEventListener('resize', screenWidthComments);
	// ================COMMENTS SHOW MORE ==================

	// =============COMMENT INPUT===============

	function showBtns(): void {
		const btns = document.querySelector('.write-comment-buttons') as HTMLElement;
		btns.style.display = 'flex';
	}
	document.querySelector('.comment-input')?.addEventListener('click', showBtns);

	function hideBtns(): void {
		const btns = document.querySelector('.write-comment-buttons') as HTMLElement;
		btns.style.display = 'none';
	}
	document.querySelector('.cancel-btn')?.addEventListener('click', hideBtns);

	const inputComment = document.querySelector('.comment-input') as HTMLInputElement;
	const commentButton = document.querySelector('.comment') as HTMLButtonElement;

	inputComment.addEventListener('input', function () {
		if (inputComment.value.length > 0) {
			commentButton.style.color = '#54B9A2';
			commentButton.style.border = '1px solid #54B9A2';
			commentButton.style.cursor = 'pointer';
			commentButton.disabled = false;
		} else {
			commentButton.style.color = '#616163';
			commentButton.style.border = '1px solid #616163';
			commentButton.style.cursor = 'default';
			commentButton.disabled = true;
		}
	});
	// =============COMMENT INPUT===============

	// =============LIKE/DISLIKE & FOLLOW BUTTONS===============

	function likeVideo(): void {
		const dislikeBtn = document.getElementById('dislike-btn') as HTMLElement;
		const likeBtn = document.getElementById('like-btn') as HTMLElement;
		dislikeBtn.classList.remove('active');
		likeBtn.classList.toggle('active');
	}
	document.querySelector('#like-btn')?.addEventListener('click', likeVideo);

	function dislikeVideo(): void {
		const dislikeBtn = document.getElementById('dislike-btn') as HTMLElement;
		const likeBtn = document.getElementById('like-btn') as HTMLElement;
		likeBtn.classList.remove('active');
		dislikeBtn.classList.toggle('active');
	}
	document.querySelector('#dislike-btn')?.addEventListener('click', dislikeVideo);

	function followToggle(): void {
		const followBtn = document.getElementById('follow-btn') as HTMLElement;
		const unfollowedText = followBtn.textContent;

		followBtn.classList.toggle('active');
		if (followBtn.classList.contains('active')) {
			followBtn.textContent = 'FOLLOWED';
		} else {
			followBtn.textContent = 'FOLLOW';
		}
	}
	document.querySelector('#follow-btn')?.addEventListener('click', followToggle);

	// =============LIKE/DISLIKE BUTTONS===============
}
