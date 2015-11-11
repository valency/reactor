<html>
<head>
    <?php require "php/lib.php"; ?>
    <title>SmartCube: Reactor</title>
    <script src="js/login.js" type="text/javascript"></script>
</head>
<body>
<form class="center-block" style="width:300px;margin-top:200px;">
    <div class="row">
        <div class="col-md-12">
            <legend>
                <span class="text-danger">Smart</span><span class="text-info">Cube</span>
                <span>Reactor</span>
                <span class="version">v0.<?php echo date("n.j", filemtime("./reactor.php")); ?></span>
            </legend>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="username" placeholder="User Name"/>
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