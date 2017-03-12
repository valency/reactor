<html>
<head>
    <?php require "lib.php"; ?>
    <link rel="stylesheet" href="lib/codemirror-5.8/lib/codemirror.css">
    <script src="lib/jquery-file-upload-9.10.4/js/vendor/jquery.ui.widget.js"></script>
    <script src="lib/jquery-file-upload-9.10.4/js/jquery.iframe-transport.js"></script>
    <script src="lib/jquery-file-upload-9.10.4/js/jquery.fileupload.js"></script>
    <script src="lib/codemirror-5.8/lib/codemirror.js"></script>
    <script src="js/reactor.js" type="text/javascript"></script>
</head>
<body>
<legend>
    <img class="logo" src="img/logo.png"/>
    <span>Reactor</span>
    <a class="version" target="_blank" href="http://www.deepera.com">v1.3.12</a>
</legend>
<div class="tabbable">
    <ul class="nav nav-pills nav-stacked col-md-2">
        <li class="active"><a href="#script-list" data-toggle="tab">Execute Script</a></li>
        <li><a href="#script-console" data-toggle="tab">Compose Script</a></li>
    </ul>
    <div class="tab-content col-md-10">
        <div class="tab-pane" id="script-console">
            <div class="form-group">
                <label for="comment">Write scripts below and hit <code>Shift + Enter</code> to execute, <code>Ctrl + C</code> to terminate, and <code>Ctrl + S</code> to save.</label>
                <textarea class="form-control" rows="5" id="script-content"></textarea>
            </div>
            <hr/>
            <div class="form-group">
                <iframe id="script-result" src="javascript:void(0)" onload='resize_frame(this);' style="min-height:300px;"></iframe>
            </div>
        </div>
        <div class="tab-pane active" id="script-list">
            <div>
                <button class="btn btn-primary" type="button" onclick="$('#file-upload').click();"><i class="fa fa-upload"></i> Upload</button>
                <input id="file-upload" class="hidden" type="file" name="files[]" data-url="./data/" multiple/>
            </div>
            <div class="progress" style="display:none;margin-top:20px;">
                <div class="progress-bar" style="width:0;"></div>
            </div>
            <hr/>
            <table id="script-table" class="display" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th>File Name</th>
                    <th>Upload Time</th>
                    <th>Size</th>
                    <th>Management</th>
                </tr>
                </thead>
                <tbody>
                <?php if ($handle = opendir('./data/')) {
                    while (false !== ($entry = readdir($handle))) {
                        if (!is_dir('./data/' . $entry) && pathinfo($entry, PATHINFO_EXTENSION) != "php") {
                            echo "<tr>";
                            echo "<td><a href='data/" . $entry . "' target='_blank'><i class='fa fa-file-o'></i> " . $entry . "</a></td>";
                            echo "<td>" . date("Y-m-d H:i:s", filemtime('./data/' . $entry)) . "</td>";
                            echo "<td>" . number_format(filesize('./data/' . $entry)) . "</td>";
                            echo "<td>";
                            echo "<a href='javascript:void(0)' onclick=\"execute_script('" . $entry . "')\">Execute</a> | ";
                            echo "<a href='javascript:void(0)' onclick=\"delete_file('" . $entry . "')\" class='text-danger'>Delete</a>";
                            echo "</td>";
                            echo "</tr>";
                        }
                    }
                    closedir($handle);
                } ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>
