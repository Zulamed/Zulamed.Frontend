// ========CHIPS==========
import $ from 'jquery';

export function scripts() {
	$(function () {
		$('.chips__choice .chip').on('click', function () {
			$('.chips__choice .chip').removeClass('chip--active');
			$(this).addClass('chip--active');
		});
	});

	document.getElementById('chips-prev').onclick = () => {
		document.getElementById('chips__choise').style.transform = 'translateX(0px)';
		chipsScrollMin();
	};
	document.getElementById('chips-next').onclick = () => {
		document.getElementById('chips__choise').style.transform = 'translateX(-290px)';
		chipsScrollMax();
	};

	function chipsScrollMin() {
		var chipsChoise = document.getElementById('chips__choise');
		var chipsPrev = document.getElementById('chips-prev');
		var chipsNext = document.getElementById('chips-next');
		if ((chipsChoise.style.transform = 'translateX(0px)')) {
			chipsNext.style.display = 'flex';
			chipsPrev.style.display = 'none';
			$('#scroll-chips-overlay').css(
				'mask-image',
				'linear-gradient(to left,transparent 0,transparent 51px,#000 77px, #000 100%)'
			);
			return;
		}
	}
	function chipsScrollMax() {
		var chipsChoise = document.getElementById('chips__choise');
		var chipsPrev = document.getElementById('chips-prev');
		var chipsNext = document.getElementById('chips-next');

		if ((chipsChoise.style.transform = 'translateX(-290px)')) {
			chipsNext.style.display = 'none';
			chipsPrev.style.display = 'flex';
			$('#scroll-chips-overlay').css(
				'mask-image',
				'linear-gradient(to right,transparent 0,transparent 51px,#000 77px,#000 100%)'
			);
			return;
		}
	}

	// ========CHIPS END==========
	// =====================SEARCH IN MOBILE DEVICES=====================
	var isOpen = false;
	document.getElementById('search-mobile-form').onsubmit = function (e) {
		if (!isOpen) {
			e.preventDefault();
			isOpen = true;
		}
	};

	document.getElementById('search-mobile').onclick = function () {
		var searchbarMobile = document.querySelector('.searchbar-mobile');
		var navigation = document.getElementById('navigation');

		searchbarMobile.style.top = '74px';
		navigation.style.boxShadow = '0px 4px 4px #00000040';

		document.getElementById('search-mobile').setAttribute('type', 'submit');
	};

	function mobileSearchbarClose() {
		var searchbarMobile = document.querySelector('.searchbar-mobile');
		var navigation = document.getElementById('navigation');

		searchbarMobile.style.top = '0';
		navigation.style.boxShadow = '0px 0px 0px #00000040';

		document.getElementById('search-mobile').setAttribute('type', 'button');
		isOpen = false;
	}
	// =====================SEARCH IN MOBILE DEVICES=====================
	// =====================SIDEBAR IN MOBILE DEVICES=====================

	function mobileSidebarOpen(e) {
		var menuIconMobile = document.querySelector('.menu-icon-background-small');
		var sidebarMobile = document.querySelector('.sidebar-mobile');
		var overlay = document.querySelector('.overlay');

		sidebarMobile.style.left = '0';
		overlay.style.left = '0';
	}

	function mobileSidebarClose() {
		var sidebarMobile = document.querySelector('.sidebar-mobile');
		var overlay = document.querySelector('.overlay');

		sidebarMobile.style.left = '-100%';
		overlay.style.left = '-100%';
	}

	// =====================SIDEBAR IN MOBILE DEVICES=====================

	function sidebarOpen() {
		sidebar = document.querySelector('.sidebar');

		sidebar.classList.toggle('open');
	}

	// ===========Profile Container===========
	function toggleProfileContainer() {
		var container = document.getElementById('profile-container');
		var display = window.getComputedStyle(container).getPropertyValue('display');
		if (display == 'none') {
			container.style.display = 'block';
		} else {
			container.style.display = 'none';
		}
	}
	function profileContainerClose() {
		var container = document.getElementById('profile-container');
		container.style.display = 'none';
	}
	// ===========Profile Container===========

	// ===========Language Container===========

	function toggleLanguageContainer() {
		var langContainer = document.getElementById('language-container');
		var display = window.getComputedStyle(langContainer).getPropertyValue('display');
		if (display == 'none') {
			langContainer.style.display = 'block';
		} else {
			langContainer.style.display = 'none';
		}
	}
	function languageContainerClose() {
		var langContainer = document.getElementById('language-container');

		langContainer.style.display = 'none';
	}

	document.querySelector('.container').addEventListener('touchmove', function () {
		var profileContainer = document.getElementById('profile-container');
		var langContainer = document.getElementById('language-container');

		langContainer.style.display = 'none';
		profileContainer.style.display = 'none';
	});
	// ===========Language Container===========

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

	function hideBtns() {
		var btns = document.querySelector('.write-comment-buttons');
		btns.style.display = 'none';
	}

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

	function dislikeVideo() {
		var dislikeBtn = document.getElementById('dislike-btn');
		var likeBtn = document.getElementById('like-btn');

		likeBtn.classList.remove('active');
		dislikeBtn.classList.toggle('active');
	}
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

	// =============LIKE/DISLIKE BUTTONS===============

	// =============VOLUME SESSION STORAGE===============

	var player = document.querySelector('media-player');

	let loaded = false;

	player.addEventListener('attached', function (e) {
		let volumeStorage = sessionStorage.getItem('playerVolume');
		let tempVolume;
		if (!volumeStorage) {
			tempVolume = 0.5;
		} else {
			tempVolume = volumeStorage;
		}
		player.volume = tempVolume;
		unsubscribe = player.subscribe(({ volume }) => {
			if (loaded) {
				sessionStorage.setItem('playerVolume', volume);
			}
		});
		loaded = true;
	});

	window.addEventListener('beforeunload', function (e) {
		unsubscribe();
	});

	// =============VOLUME SESSION STORAGE===============
}
