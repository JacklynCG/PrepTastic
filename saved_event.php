<?php
include('database.php'); // replace this with your actual DB connection file

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => false,
        'msg' => 'Invalid request method.'
    ]);
    exit;
}

// Safely get POST values
$event_name = $_POST['event_name'] ?? null;
$start_date = $_POST['event_start_date'] ?? null;
$end_date = $_POST['event_end_date'] ?? null;

if (!$event_name || !$start_date || !$end_date) {
    echo json_encode([
        'status' => false,
        'msg' => 'Missing required event data.'
    ]);
    exit;
}

// Connect to DB (make sure $conn is set correctly)
$conn = new mysqli('localhost', 'root', '', 'preptastic'); // change credentials as needed

if ($conn->connect_error) {
    echo json_encode(['status' => false, 'msg' => 'DB connection failed: ' . $conn->connect_error]);
    exit;
}

// Insert event
$stmt = $conn->prepare("INSERT INTO event_calendar_master (event_name, event_start_date, event_end_date) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $event_name, $start_date, $end_date);

if ($stmt->execute()) {
    echo json_encode([
        'status' => true,
        'msg' => 'Event saved successfully.'
    ]);
} else {
    echo json_encode([
        'status' => false,
        'msg' => 'Insert failed: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
