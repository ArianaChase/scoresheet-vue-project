<?php 

$db_server = "localhost";
$db_root = "root";
$db_pass = "";
$db_name = "scoresheet";
$conn = "";

try {
  $conn = mysqli_connect($db_server, $db_root, $db_pass, $db_name);
  //echo json_encode(["connected" => "connected"]);
} catch (error) {
  //echo json_encode(["not connected" => "not connected"]);;
};

?>