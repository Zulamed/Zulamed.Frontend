var menuIcon = document.querySelector(".menu-icon-background");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}


// =====================SEARCH IN MOBILE DEVICES=====================
var isOpen = false;
document.getElementById("search-mobile-form").onsubmit = function (e) {
    if (!isOpen) {
        e.preventDefault();
        isOpen = true;
    }
}



document.getElementById("search-mobile").onclick = function () {
    var searchbarMobile = document.querySelector(".searchbar-mobile");
    var navigation = document.getElementById("navigation")

    searchbarMobile.style.top = "74px";
    navigation.style.boxShadow = "0px 4px 4px #00000040"

    document.getElementById("search-mobile").setAttribute("type", "submit");

}

function mobileSearchbarClose() {
    var searchbarMobile = document.querySelector(".searchbar-mobile");
    var navigation = document.getElementById("navigation")

    searchbarMobile.style.top = "0"
    navigation.style.boxShadow = "0px 0px 0px #00000040"



    document.getElementById("search-mobile").setAttribute("type", "button");
    isOpen = false;

}
// =====================SEARCH IN MOBILE DEVICES=====================
// =====================SIDEBAR IN MOBILE DEVICES=====================


function mobileSidebarOpen(e) {
    var menuIconMobile = document.querySelector(".menu-icon-background-small");
    var sidebarMobile = document.querySelector(".sidebar-mobile");
    var overlay = document.querySelector(".overlay");

    sidebarMobile.style.left = "0";
    overlay.style.opacity = "0.75";
    overlay.style.zIndex = "3";
}


function mobileSidebarClose() {
    var sidebarMobile = document.querySelector(".sidebar-mobile");
    var overlay = document.querySelector(".overlay");

    sidebarMobile.style.left = "-100%"
    overlay.style.opacity = "0";
    overlay.style.zIndex = "-1";
}

// =====================SIDEBAR IN MOBILE DEVICES=====================

function toggleProfileContainer() {
    var container = document.getElementById("profile-container");
    container.style.display = (container.style.display === "none") ? "block" : "none";
}
// function profileContainerClose() {


// }

function toggleLanguageContainer() {
    var langContainer = document.getElementById("language-container");
    langContainer.style.display = (langContainer.style.display === "none") ? "flex" : "none";
}
function languageContainerClose() {
    var closeIcon = document.getElementById("close-icon");
    var langContainer = document.getElementById("language-container");

    langContainer.style.display = "none";
}
function profileContainerClose() {
    var container = document.getElementById("profile-container");

    container.style.display = "none";
}
document.querySelector(".container").addEventListener("touchmove", function () {
    var profileContainer = document.getElementById("profile-container");
    var langContainer = document.getElementById("language-container");

    langContainer.style.display = "none";
    profileContainer.style.display = "none";
})

// ==================

