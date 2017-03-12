<html>
<head>
    <?php require "lib.php"; ?>
    <script src="js/login.js" type="text/javascript"></script>
</head>
<body>
<form class="center-block" style="width:300px;margin-top:200px;">
    <div class="row">
        <div class="col-md-12">
            <legend>
                <img class="logo" src="img/logo.png"/>
                <span>Reactor</span>
                <a class="version" target="_blank" href="http://www.deepera.com">v1.3.12</a>
            </legend>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
            <input type="password" class="form-control" id="password" placeholder="Password"/>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
            <button class="btn btn-primary pull-right" id="login-btn">Login</button>
        </div>
    </div>
</form>
</body>
</html>