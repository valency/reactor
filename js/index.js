$(document).ready(function () {
    if (check_login())  window.location.href = "reactor.php";
    else window.location.href = "login.php";
});