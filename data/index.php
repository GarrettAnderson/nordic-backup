<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');

$servername = $_SERVER['38.77.132.45'];
$username = 'root';
$password = 'dvHJ7fbfbF3jUFjD';
$dbname = 'performance_schema';

$conn = new mysqli($servername, $username, $password, $dbname);

?>