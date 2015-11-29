<?php
ob_implicit_flush(true);
ob_end_flush();
$cmd = "setsid bash " . $_GET["f"];
$spec = array(
    0 => array("pipe", "r"),
    1 => array("pipe", "w"),
    2 => array("pipe", "w")
);
$process = proc_open($cmd, $spec, $pipes, realpath('../data/'), array());
register_shutdown_function('kill', $process);
echo "<pre>";
if (is_resource($process)) {
    if (!stream_set_blocking($pipes[2], 0)) die("Could not set timeout");
    $read_streams = array($pipes[1], $pipes[2]);
    $write_streams = NULL;
    $except_streams = NULL;
    while (true) {
        if (feof($pipes[1]) && feof($pipes[2])) break;
        $stdout = fgets($pipes[1]);
        $stderr = fgets($pipes[2]);
        if ($stdout) print "<span style='color:black;'>" . $stdout . "</span>";
        if ($stderr) print "<span style='color:red;'>" . $stderr . "</span>";
        flush();
    }
}
echo "</pre>";
proc_close($process);

function kill($process) {
    $status = proc_get_status($process);
    exec('pgrep -P ' . $status['pid'], $child_pid);
    if (sizeof($child_pid) > 0) return exec('kill -9 -' . $child_pid[0]);
    else return null;
}