var target = window.location.hash;

window.location.hash = "";

$(document).ready(function() {
    setTimeout(function() {
        document.location.hash = target;
    }, 50);
});