<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Access-Control-Allow-Headers: DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');

$offset = $_GET['offset'];
// sanitize input (make sure this is a number)
if (!is_numeric($offset)){
    exit();
}

$servername = "127.0.0.1";
$username = "root";
$password = "password";
$dbname = "stats";
// $password = "dvHJ7fbfbF3jUFjD";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

$sql = "SELECT customer_id, client_id, job_id, Backupset, time_stamp FROM stats.Statistics LIMIT 50 OFFSET " . $offset . ";";
$result = $conn->query($sql);
// var_dump($sql);
// var_dump($result);
$json_array = array();


// if ($result->num_rows > 0) {
//     // output data of each row
//     while($row = $result->fetch_assoc()) {
//       echo "<tr><td> " . $row["customer_id"]. "</td><td>" . $row["client_id"]. "</td><td>" . $row["job_id"] . "</td><td>" . $row["Backupset"] . "</td><td>" . $row["time_stamp"] . "</td></tr>";
//     }
//     echo "</table>";
//   } else {
//     echo "0 results";
//   }

// this builds the json structure
while($row = $result->fetch_assoc()) {
    $json_array[] =$row;
}
// respond with json
echo json_encode($json_array, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

// close connection
  $conn-> close();
?>