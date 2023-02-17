<?php

$ip_address = $_SERVER['REMOTE_ADDR'];


$log_file = fopen("visitors.txt", "a");


fwrite($log_file, $ip_address . "\n");

fclose($log_file);
?>
