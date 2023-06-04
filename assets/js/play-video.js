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


function sidebarOpen() {
    sidebar = document.querySelector(".sidebar");

    sidebar.classList.toggle("open")
}


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
// ========DESCRIPTION==========


function toggleDescription() {
    var description = document.querySelector('#play-video-description');
    if (description.style.height == '125px') {
        description.style.height = 'auto';

    } else {
        description.style.height = '125px';
    }
}

