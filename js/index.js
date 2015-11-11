var reactor_file = guid() + ".script";

$(document).ready(function () {
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
    var editor = CodeMirror.fromTextArea(document.getElementById("script-content"));
    editor.setOption("extraKeys", {
        Tab: function (cm) {
            var spaces = "    ";
            cm.replaceSelection(spaces);
        },
        "Shift-Enter": function (cm) {
            $.post("data/writer.php", {
                f: reactor_file,
                c: editor.getValue()
            }, function () {
                $("#script-result").attr("src", "php/execute.php?f=tmp/" + reactor_file);
            });
        }
    });
});

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