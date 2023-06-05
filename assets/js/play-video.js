// ========CHIPS==========
$(function () {
    $('.chips__choice .chip').on("click", function () {
        $('.chips__choice .chip').removeClass('chip--active');
        $(this).addClass("chip--active");
    });
});

document.getElementById("chips-prev").onclick = () => {
    document.getElementById("chips__choise").style.transform = "translateX(0px)";
    chipsScrollMin()
}
document.getElementById("chips-next").onclick = () => {
    document.getElementById("chips__choise").style.transform = "translateX(-290px)";
    chipsScrollMax()
}

function chipsScrollMin() {
    var chipsChoise = document.getElementById("chips__choise");
    var chipsPrev = document.getElementById("chips-prev");
    var chipsNext = document.getElementById("chips-next");
    if (chipsChoise.style.transform = "translateX(0px)") {
        chipsNext.style.display = "flex";
        chipsPrev.style.display = "none";
        $('#scroll-chips-overlay').css('mask-image', "linear-gradient(to left,transparent 0,transparent 51px,#000 77px, #000 100%)")
        return
    }

}
function chipsScrollMax() {
    var chipsChoise = document.getElementById("chips__choise");
    var chipsPrev = document.getElementById("chips-prev");
    var chipsNext = document.getElementById("chips-next");

    if (chipsChoise.style.transform = "translateX(-290px)") {
        chipsNext.style.display = "none";
        chipsPrev.style.display = "flex";
        $('#scroll-chips-overlay').css('mask-image', "linear-gradient(to right,transparent 0,transparent 51px,#000 77px,#000 100%)")
        return
    }
}





// ========CHIPS END==========
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

function sidebarOpen() {
    sidebar = document.querySelector(".sidebar");

    sidebar.classList.toggle("open")
}

// ===========Profile Container===========
function toggleProfileContainer() {
    var container = document.getElementById("profile-container");
    var display = window.getComputedStyle(container).getPropertyValue('display')
    if (display == 'none') {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}
function profileContainerClose() {
    var container = document.getElementById("profile-container");
    container.style.display = "none";
}
// ===========Profile Container===========

// ===========Language Container===========


function toggleLanguageContainer() {
    var langContainer = document.getElementById("language-container");
    var display = window.getComputedStyle(langContainer).getPropertyValue('display')
    if (display == 'none') {
        langContainer.style.display = "block";
    } else {
        langContainer.style.display = "none";
    }
}
function languageContainerClose() {
    var langContainer = document.getElementById("language-container");

    langContainer.style.display = "none";
}

document.querySelector(".container").addEventListener("touchmove", function () {
    var profileContainer = document.getElementById("profile-container");
    var langContainer = document.getElementById("language-container");

    langContainer.style.display = "none";
    profileContainer.style.display = "none";
})
// ===========Language Container===========

// ========DESCRIPTION==========


function toggleDescription() {
    var description = document.querySelector('#play-video-description');
    var height = window.getComputedStyle(description).getPropertyValue('height');
    if (height == '125px') {
        description.style.height = 'auto';

    } else {
        description.style.height = '125px';
    }
}
// ========DESCRIPTION==========
// ========COMMENTS==========
function toggleComments() {
    var comments = document.querySelector('#play-video-comments');
    var height = window.getComputedStyle(comments).getPropertyValue('height');
    var moreCommentsIcon = document.querySelector('#more-comments-icon');
    if (height == '350px') {
        comments.style.height = 'auto';
        $('#play-video-comments').css('mask-image', "none");
        moreCommentsIcon.style.transform = "rotate(180deg)"


    } else {
        comments.style.height = '350px';
        $('#play-video-comments').css('mask-image', "linear-gradient(180deg, rgba(0, 0, 0, 1), transparent 100%)")
        moreCommentsIcon.style.transform = "rotate(0deg)"

    }
}
// ========COMMENTS==========

