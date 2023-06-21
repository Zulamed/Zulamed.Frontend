export function scripts() {
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
    document.querySelector('.container')?.addEventListener('click', mobileSearchbarClose)


    // =====================SEARCH IN MOBILE DEVICES=====================
    // =====================SIDEBAR IN MOBILE DEVICES=====================

    function mobileSidebarOpen(e) {
        var menuIconMobile = document.querySelector('.menu-icon-background-small');
        var sidebarMobile = document.querySelector('.sidebar-mobile');
        var overlay = document.querySelector('.overlay');

        sidebarMobile.style.left = '0';
        overlay.style.left = '0';
    }
    document.querySelector('.menu-icon-background-small')?.addEventListener('click', mobileSidebarOpen)

    function mobileSidebarClose() {
        var sidebarMobile = document.querySelector('.sidebar-mobile');
        var overlay = document.querySelector('.overlay');

        sidebarMobile.style.left = '-100%';
        overlay.style.left = '-100%';
    }
    document.querySelector('.overlay')?.addEventListener('click', mobileSidebarClose)

    // =====================SIDEBAR IN MOBILE DEVICES=====================

    function sidebarOpen() {
        var sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
    }
    document.querySelector('.menu-icon-background')?.addEventListener('click', sidebarOpen)
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
    document.querySelector('.user-icon')?.addEventListener('click', toggleProfileContainer)


    function profileContainerClose() {
        var container = document.getElementById('profile-container');
        container.style.display = 'none';
    }
    document.querySelector('.overlay')?.addEventListener('click', profileContainerClose)
    document.querySelector('.container')?.addEventListener('click', profileContainerClose)

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
    document.querySelector('.lang-icon')?.addEventListener('click', toggleLanguageContainer)


    function languageContainerClose() {
        var langContainer = document.getElementById('language-container');
        langContainer.style.display = 'none';
    }
    document.querySelector('#lang-close-icon')?.addEventListener('click', languageContainerClose)


    document.querySelector('.container').addEventListener('touchmove', function () {
        var profileContainer = document.getElementById('profile-container');
        var langContainer = document.getElementById('language-container');

        langContainer.style.display = 'none';
        profileContainer.style.display = 'none';
    });
    // ===========Language Container===========


}