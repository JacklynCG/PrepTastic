<?php
require 'database.php'; 

$event_name = $_POST['dbRecipe'] ?? '';
$event_start_date = $_POST['event_start_date'] ?? null;
$event_end_date = $_POST['event_end_date'] ?? null;
$url = $_POST['url'] ?? '';
$color = $_POST['color'] ?? '#54a496'; // default if none provided

$event_start_date = $event_start_date ? date("Y-m-d", strtotime($event_start_date)) : null;
$event_end_date = $event_end_date ? date("Y-m-d", strtotime($event_end_date)) : null;

$insert_query = "
    INSERT INTO calendar_event_master 
    (event_name, event_start_date, event_end_date, url, color)
    VALUES (?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($insert_query);
if (!$stmt) {
    echo json_encode(['status' => false, 'msg' => 'Prepare failed: ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $event_name, $event_start_date, $event_end_date, $url, $color);

if ($stmt->execute()) {
    echo json_encode(['status' => true, 'msg' => 'Event added successfully!']);
} else {
    echo json_encode(['status' => false, 'msg' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
