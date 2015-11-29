<?php
$DOMAIN = $_SERVER['HTTP_HOST'];
$PROTOCOL = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

function curl($url) {
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    $output = curl_exec($curl);
    if ($output == false || curl_getinfo($curl)["http_code"] == 502) $output = 'ERROR: ' . curl_error($curl);
    curl_close($curl);
    return $output;
}
