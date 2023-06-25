export function scripts(): void {
	const menuIcon = document.querySelector('.menu-icon-background') as HTMLElement;
	const sidebar = document.querySelector('.sidebar') as HTMLElement;
	const container = document.querySelector('.container') as HTMLElement;
	const shortcutLink = document.querySelectorAll('.shortcut-link');

	menuIcon.onclick = function (): void {
		sidebar.classList.toggle('small-sidebar');
		container.classList.toggle('large-container');

		if (sidebar?.classList.contains('small-sidebar')) {
			(document.querySelector('.shortcut-links') as HTMLElement).style.display = 'flex';
			for (let i = 0; i < shortcutLink.length; i++) {
				(shortcutLink[i] as HTMLElement).style.padding = '12px 0 11px 0';
			}
		} else {
			(document.querySelector('.shortcut-links') as HTMLElement).style.display = 'block';
			for (let i = 0; i < shortcutLink.length; i++) {
				(shortcutLink[i] as HTMLElement).style.padding = '12px 0 11px 7px';
			}
		}
	};

	// =====================SEARCH IN MOBILE DEVICES=====================
	let isOpen = false;
	(document.getElementById('search-mobile-form') as HTMLFormElement).onsubmit = function (
		e: Event
	): void {
		if (!isOpen) {
			e.preventDefault();
			isOpen = true;
		}
	};

	(document.getElementById('search-mobile') as HTMLElement).onclick = function (): void {
		const searchbarMobile = document.querySelector('.searchbar-mobile') as HTMLElement;
		const navigation = document.getElementById('navigation') as HTMLElement;

		searchbarMobile.style.top = '74px';
		navigation.style.boxShadow = '0px 4px 4px #00000040';

		(document.getElementById('search-mobile') as HTMLInputElement).setAttribute('type', 'submit');
	};

	function mobileSearchbarClose(): void {
		const searchbarMobile = document.querySelector('.searchbar-mobile') as HTMLElement;
		const navigation = document.getElementById('navigation') as HTMLElement;

		searchbarMobile.style.top = '0';
		navigation.style.boxShadow = '0px 0px 0px #00000040';

		(document.getElementById('search-mobile') as HTMLInputElement).setAttribute('type', 'button');
		isOpen = false;
	}

	document.querySelector('.container')?.addEventListener('click', mobileSearchbarClose);

	// =====================SEARCH IN MOBILE DEVICES=====================
	// =====================SIDEBAR IN MOBILE DEVICES=====================

	function mobileSidebarOpen(e: Event): void {
		const menuIconMobile = document.querySelector('.menu-icon-background-small') as HTMLElement;
		const sidebarMobile = document.querySelector('.sidebar-mobile') as HTMLElement;
		const overlay = document.querySelector('.overlay') as HTMLElement;

		sidebarMobile.style.left = '0';
		overlay.style.left = '0';
	}
	document
		.querySelector('.menu-icon-background-small')
		?.addEventListener('click', mobileSidebarOpen);

	function mobileSidebarClose(): void {
		const sidebarMobile = document.querySelector('.sidebar-mobile') as HTMLElement;
		const overlay = document.querySelector('.overlay') as HTMLElement;

		sidebarMobile.style.left = '-100%';
		overlay.style.left = '-100%';
	}
	document.querySelector('.overlay')?.addEventListener('click', mobileSidebarClose);

	// =====================SIDEBAR IN MOBILE DEVICES=====================

	function toggleProfileContainer(): void {
		const container = document.getElementById('profile-container') as HTMLElement;
		const display = window.getComputedStyle(container).getPropertyValue('display');
		if (display === 'none') {
			container.style.display = 'block';
		} else {
			container.style.display = 'none';
		}
	}
	document.querySelector('.user-icon')?.addEventListener('click', toggleProfileContainer);

	function toggleLanguageContainer(): void {
		const langContainer = document.getElementById('language-container') as HTMLElement;
		langContainer.style.display = langContainer.style.display === 'none' ? 'flex' : 'none';
	}
	document.querySelector('.lang-icon')?.addEventListener('click', toggleLanguageContainer);
	function languageContainerClose(): void {
		const closeIcon = document.getElementById('close-icon') as HTMLElement;
		const langContainer = document.getElementById('language-container') as HTMLElement;

		langContainer.style.display = 'none';
	}
	document.querySelector('#lang-close-icon')?.addEventListener('click', languageContainerClose);

	function profileContainerClose(): void {
		const container = document.getElementById('profile-container') as HTMLElement;

		container.style.display = 'none';
	}
	document.querySelector('.overlay')?.addEventListener('click', profileContainerClose);
	document.querySelector('.container')?.addEventListener('click', profileContainerClose);

	document.querySelector('.container')?.addEventListener('touchmove', function (): void {
		const profileContainer = document.getElementById('profile-container') as HTMLElement;
		const langContainer = document.getElementById('language-container') as HTMLElement;

		langContainer.style.display = 'none';
		profileContainer.style.display = 'none';
	});

	// ==================
}
