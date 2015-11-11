$(document).ready(function () {
    $('#login-btn').click(function (event) {
        event.preventDefault();
        $.get("php/auth.php?username=" + $("#username").val() + "&password=" + $("#password").val(), function (r) {
            if (r == "true") {
                $.cookie('smartcube_reactor', new Date());
                window.location.href = "index.php";
            } else {
                bootbox.alert(error_message("Login failed. User name or password is not correct."));
            }
        });
    });
});