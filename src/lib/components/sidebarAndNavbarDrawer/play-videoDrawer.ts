export function scripts(): void {
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

	function sidebarOpen(): void {
		const sidebar = document.querySelector('.sidebar') as HTMLElement;
		sidebar.classList.toggle('open');
	}
	document.querySelector('.menu-icon-background')?.addEventListener('click', sidebarOpen);

	// ===========Profile Container===========
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

	function profileContainerClose(): void {
		const container = document.getElementById('profile-container') as HTMLElement;
		container.style.display = 'none';
	}
	document.querySelector('.overlay')?.addEventListener('click', profileContainerClose);
	document.querySelector('.container')?.addEventListener('click', profileContainerClose);
	// ===========Profile Container===========

	// ===========Language Container===========
	function toggleLanguageContainer(): void {
		const langContainer = document.getElementById('language-container') as HTMLElement;
		const display = window.getComputedStyle(langContainer).getPropertyValue('display');
		if (display === 'none') {
			langContainer.style.display = 'block';
		} else {
			langContainer.style.display = 'none';
		}
	}
	document.querySelector('.lang-icon')?.addEventListener('click', toggleLanguageContainer);

	function languageContainerClose(): void {
		const langContainer = document.getElementById('language-container') as HTMLElement;
		langContainer.style.display = 'none';
	}
	document.querySelector('#lang-close-icon')?.addEventListener('click', languageContainerClose);

	document.querySelector('.container')?.addEventListener('touchmove', function (): void {
		const profileContainer = document.getElementById('profile-container') as HTMLElement;
		const langContainer = document.getElementById('language-container') as HTMLElement;

		langContainer.style.display = 'none';
		profileContainer.style.display = 'none';
	});
	// ===========Language Container===========
}
