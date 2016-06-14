$(document).ready(function () {
    $('#login-btn').click(function (event) {
        event.preventDefault();
        $.get("php/auth.php?password=" + $("#password").val(), function (r) {
            if (r == "true") {
                $.cookie('smartcube_reactor', new Date());
                window.location.href = "index.php";
            } else {
                bootbox.alert(error_message("Login failed. Password is not correct."));
            }
        });
    });
});