var reactor_file = guid() + ".script";

$(document).ready(function () {
    if (!check_login()) window.location.href = "login.php";
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
    $('#script-table').DataTable({stateSave: true});
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
                        bootbox.alert("<p>" + success_message("Successfully saved as the following script: ") + "</p><pre>" + result + ".script" + "</pre>");
                    }).fail(function () {
                        bootbox.alert("<p>" + error_message("Failed to save as the following script: ") + "</p><pre>" + result + ".script" + "</pre>");
                    });
                }
            });
        }
    });
});

function delete_file(file) {
    bootbox.dialog({
        message: "<p>The following script will be deleted:</p><pre>" + file + "</pre>",
        buttons: {
            Proceed: function () {
                $.ajax({
                    type: "DELETE",
                    url: "data/index.php?file=" + file,
                    dataType: "json",
                    complete: function (data) {
                        location.reload();
                    }
                });
            }
        }
    });
}

function execute_script(file) {
    bootbox.dialog({
        message: "<p>The following script will be executed:</p><pre>" + file + "</pre>",
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
