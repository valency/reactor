<?php
$DOMAIN = $_SERVER['HTTP_HOST'];
$PROTOCOL = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

function curl($url) {
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
    $output = curl_exec($curl);
    if ($output == false) $output = 'ERROR: ' . curl_error($curl);
    curl_close($curl);
    return $output;
}
