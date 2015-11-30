var reactor_file = guid() + ".script";

$(document).ready(function () {
    if (!check_login()) window.location.href = "login.php";
    // Script list
    $('#file-upload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        },
        progressall: function (e, data) {
            $(".progress").show();
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(".progress-bar").css('width', progress + '%');
        }
    });
    $('#script-table').DataTable();
    // Editor
    var editor = CodeMirror.fromTextArea(document.getElementById("script-content"));
    editor.setOption("extraKeys", {
        Tab: function (cm) {
            var spaces = "    ";
            cm.replaceSelection(spaces);
        },
        "Shift-Enter": function (cm) {
            $.post("data/writer.php", {
                f: "tmp/" + reactor_file,
                c: editor.getValue()
            }, function () {
                $("#script-result").attr("src", "php/execute.php?f=tmp/" + reactor_file);
            });
        },
        "Ctrl-C": function (cm) {
            $("#script-result").attr("src", "about:blank");
        },
        "Ctrl-S": function (cm) {
            bootbox.prompt("Save to file: ", function (result) {
                if (result != null) {
                    $.post("data/writer.php", {
                        f: result + ".script",
                        c: editor.getValue()
                    }, function () {
                        bootbox.hideAll();
                        bootbox.alert(success_message("Successfully saved to: " + result + ".script"));
                    }).fail(function () {
                        bootbox.alert(error_message("Failed to saved to: " + result + ".script"));
                    });
                }
            });
        }
    });
    // Server status
    $.ajax("php/proxy.php?url=" + $("#server-url-ui").attr("proxy")).done(function (r) {
        if (r.length > 0 && !r.startsWith("ERROR")) generate_up_icon("ui");
        else generate_down_icon("ui");
    }).fail(function () {
        generate_down_icon("ui");
    });
    $.ajax("php/proxy.php?url=" + $("#server-url-api").attr("proxy")).done(function (r) {
        if (r.length > 0 && !r.startsWith("ERROR")) generate_up_icon("api");
        else generate_down_icon("api");
    }).fail(function () {
        generate_down_icon("api");
    });
});

function generate_up_icon(component) {
    $("#server-status-" + component).switchClass("label-default", "label-success");
    $("#server-status-" + component).html("UP");
    $("#server-op-" + component).switchClass("label-default", "label-danger");
    $("#server-op-" + component).html("Stop Server");
    $("#server-op-" + component).click(function () {
        stop_server(component);
    });
}

function generate_down_icon(component) {
    $("#server-status-" + component).switchClass("label-default", "label-danger");
    $("#server-status-" + component).html("DOWN");
    $("#server-op-" + component).switchClass("label-default", "label-success");
    $("#server-op-" + component).html("Start Server");
    $("#server-op-" + component).click(function () {
        start_server(component);
    });
}

function start_server(component) {
    bootbox.dialog({
        message: "<p>The following server will be <span class='text-success'>started</span>:</p><p class='text-info'>" + $("#server-label-" + component).html() + "</p>",
        buttons: {
            Proceed: function () {
                bootbox.hideAll();
                window.open("php/execute.php?f=/data/ui-setup-scripts/smartcube-ui-start-" + component + ".sh&nohup=true");
            }
        }
    });
}

function stop_server(component) {
    bootbox.dialog({
        message: "<p>The following server will be <span class='text-danger'>stopped</span>:</p><p class='text-info'>" + $("#server-label-" + component).html() + "</p>",
        buttons: {
            Proceed: function () {
                bootbox.hideAll();
                window.open("php/execute.php?f=/data/ui-setup-scripts/smartcube-ui-stop-" + component + ".sh&nohup=true");
            }
        }
    });
}

function delete_file(file) {
    bootbox.dialog({
        message: "<p>The following script will be deleted:</p><p class='text-danger'>" + file + "</p>",
        buttons: {
            Proceed: function () {
                $.get("data/delete.php?f=" + file, function (r) {
                    location.reload();
                });
            }
        }
    });
}

function execute_script(file) {
    bootbox.dialog({
        message: "<p>The following script will be executed:</p><p class='text-danger'>" + file + "</p>",
        buttons: {
            Proceed: function () {
                bootbox.hideAll();
                window.open("php/execute.php?f=" + file);
            }
        }
    });
}

function resize_frame(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
