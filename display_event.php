<?php
require 'database.php';
header('Content-Type: application/json');

if ($conn->connect_error) {
    echo json_encode(['status' => false, 'msg' => 'DB connection failed']);
    exit;
}

$sql = "SELECT event_name AS title, event_id AS id, event_start_date as start, event_end_date as end, color as color, url FROM calendar_event_master";
$result = $conn->query($sql);

$events = [];
while ($row = $result->fetch_assoc()) {
    $events[] = $row;  // ✅ push as array elements, not object properties
}

echo json_encode(['status' => true, 'msg' => 'success', 'data' => $events]);
$conn->close();
?>
