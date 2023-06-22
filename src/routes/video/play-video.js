//@ts-nocheck
// ========CHIPS==========
import $ from 'jquery';

export function scripts() {
	const tabsBox = document.querySelector(".tabs-box"),
		allTabs = tabsBox.querySelectorAll(".tab"),
		arrowIcons = document.querySelectorAll(".icon i");

	let isDragging = false;

	const handleIcons = (scrollVal) => {
		let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
		arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
		arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
	}

	arrowIcons.forEach(icon => {
		icon.addEventListener("click", () => {
			// if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
			let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
			handleIcons(scrollWidth);
		});
	});

	allTabs.forEach(tab => {
		tab.addEventListener("click", () => {
			tabsBox.querySelector(".active").classList.remove("active");
			tab.classList.add("active");
		});
	});

	const dragging = (e) => {
		if (!isDragging) return;
		tabsBox.classList.add("dragging");
		tabsBox.scrollLeft -= e.movementX;
		handleIcons(tabsBox.scrollLeft)
	}

	const dragStop = () => {
		isDragging = false;
		tabsBox.classList.remove("dragging");
	}

	tabsBox.addEventListener("mousedown", () => isDragging = true);
	tabsBox.addEventListener("mousemove", dragging);
	document.addEventListener("mouseup", dragStop);

	// ========CHIPS END==========


	// ========DESCRIPTION==========

	var descriptionText = document.querySelector('.description-text');
	var originalText = descriptionText.textContent;
	var description = document.querySelector('#play-video-description');
	var text = descriptionText.innerHTML;
	var trimmedText = text.substring(0, 30) + '... Read more';
	descriptionText.textContent = trimmedText;
	function toggleDescription() {
		var height = window.getComputedStyle(description).getPropertyValue('height');
		if (height == '64px') {
			description.style.height = 'auto';
			descriptionText.textContent = originalText;
		} else {
			description.style.height = '64px';
			descriptionText.textContent = trimmedText;
		}
	}
	document.querySelector('.play-video-description')?.addEventListener('click', toggleDescription)

	// ========DESCRIPTION==========
	// ========COMMENTS==========

	var contains = false;

	function foo(x) {
		if (x.matches) {
			var comments = document.getElementById('play-video-comments');
			var videoContainer = document.getElementById('play-video');
			var moreComments = document.getElementById('more-comments');
			var row = document.getElementById('row');

			videoContainer.removeChild(comments);
			videoContainer.removeChild(moreComments);
			row.insertAdjacentElement('beforeend', comments);
			row.insertAdjacentElement('beforeend', moreComments);
			contains = true;
		} else {
			var comments = document.getElementById('play-video-comments');
			var videoContainer = document.getElementById('play-video');
			var moreComments = document.getElementById('more-comments');
			var row = document.getElementById('row');
			if (contains) {
				row.removeChild(comments);
				row.removeChild(moreComments);
				videoContainer.insertAdjacentElement('beforeend', comments);
				videoContainer.insertAdjacentElement('beforeend', moreComments);
				contains = false;
			}
		}
	}

	var media = window.matchMedia('(max-width:1027px)');
	foo(media);
	media.addEventListener('change', foo);

	// ================VIDEO SHOW MORE MOBILE ==================

	var container = document.getElementById('right-videolist');
	var showMoreButton = document.getElementById('showMoreButton');
	var itemsToShow = container.getElementsByClassName('side-video-list');

	function screenWidthVideos() {
		if (window.innerWidth <= 600) {
			for (var i = 1; i < itemsToShow.length; i++) {
				itemsToShow[i].style.display = 'none';
				showMoreButton.style.display = 'block';
			}

			showMoreButton.addEventListener('click', function () {
				for (var i = 1; i < itemsToShow.length; i++) {
					itemsToShow[i].style.display = 'block';
				}

				showMoreButton.style.display = 'none';
			});
		} else {
			for (var i = 0; i < itemsToShow.length; i++) {
				itemsToShow[i].style.display = 'flex';
			}
			showMoreButton.style.display = 'none';
		}
	}

	screenWidthVideos();
	window.addEventListener('resize', screenWidthVideos);

	// ================VIDEO SHOW MORE MOBILE ==================

	// ================COMMENTS SHOW MORE ==================

	var commentsContainer = document.getElementById('play-video-comments');
	var showMoreComments = document.getElementById('more-comments');
	var commentsToShow = commentsContainer.getElementsByClassName('comment-container');

	function screenWidthComments() {
		if (window.innerWidth > 600) {
			for (var i = 2; i < commentsToShow.length; i++) {
				commentsToShow[i].style.display = 'none';
				showMoreComments.style.display = 'flex';
				commentsContainer.style.maskImage =
					'linear-gradient(180deg, rgba(0, 0, 0, 1), transparent 150%)';
			}

			showMoreComments.addEventListener('click', function () {
				for (var i = 1; i < commentsToShow.length; i++) {
					commentsToShow[i].style.display = 'flex';
					commentsContainer.style.maskImage = 'none';
				}
				showMoreComments.style.display = 'none';
			});
		} else {
			for (var i = 0; i < commentsToShow.length; i++) {
				commentsToShow[i].style.display = 'flex';
			}
			showMoreComments.style.display = 'none';
		}
	}

	screenWidthComments();
	window.addEventListener('resize', screenWidthComments);
	// ================COMMENTS SHOW MORE ==================

	// =============COMMENT INPUT===============

	function showBtns() {
		var btns = document.querySelector('.write-comment-buttons');
		btns.style.display = 'flex';
	}
	document.querySelector('.comment-input')?.addEventListener('click', showBtns)

	function hideBtns() {
		var btns = document.querySelector('.write-comment-buttons');
		btns.style.display = 'none';
	}
	document.querySelector('.cancel-btn')?.addEventListener('click', hideBtns)

	var inputComment = document.querySelector('.comment-input');
	var commentButton = document.querySelector('.comment');

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

	function likeVideo() {
		var dislikeBtn = document.getElementById('dislike-btn');
		var likeBtn = document.getElementById('like-btn');
		dislikeBtn.classList.remove('active');
		likeBtn.classList.toggle('active');
	}
	document.querySelector('#like-btn')?.addEventListener('click', likeVideo)

	function dislikeVideo() {
		var dislikeBtn = document.getElementById('dislike-btn');
		var likeBtn = document.getElementById('like-btn');
		likeBtn.classList.remove('active');
		dislikeBtn.classList.toggle('active');
	}
	document.querySelector('#dislike-btn')?.addEventListener('click', dislikeVideo)
	function followToggle() {
		var followBtn = document.getElementById('follow-btn');
		var unfollowedText = followBtn.textContent;

		followBtn.classList.toggle('active');
		if (followBtn.classList.contains('active')) {
			followBtn.textContent = 'FOLLOWED';
		} else {
			followBtn.textContent = 'FOLLOW';
		}
	}
	document.querySelector('#follow-btn')?.addEventListener('click', followToggle)

	// =============LIKE/DISLIKE BUTTONS===============

	// =============VOLUME SESSION STORAGE===============

	var player = document.querySelector('media-player');

	let loaded = false;

	// player.addEventListener('attached', function (e) {
	// 	let volumeStorage = sessionStorage.getItem('playerVolume');
	// 	let tempVolume;
	// 	if (!volumeStorage) {
	// 		tempVolume = 0.5;
	// 	} else {
	// 		tempVolume = volumeStorage;
	// 	}
	// 	player.volume = tempVolume;
	// 	unsubscribe = player.subscribe(({ volume }) => {
	// 		if (loaded) {
	// 			sessionStorage.setItem('playerVolume', volume);
	// 		}
	// 	});
	// 	loaded = true;
	// });
	//
	// window.addEventListener('beforeunload', function (e) {
	// 	unsubscribe();
	// });

	// =============VOLUME SESSION STORAGE===============
}
