
<?php
// Log the full POST data for debugging
file_put_contents("debug_log.txt", print_r($_POST, true), FILE_APPEND);
?>

<?php
require 'database.php'; 

// Collect inputs
$event_name = $_POST['dbRecipe'] ?? '';
$event_start_date = $_POST['event_start_date'] ?? null;
$event_end_date = $_POST['event_end_date'] ?? null;
$url = $_POST['url'] ?? '';
$color = $_POST['color'] ?? '#54a496'; // default if none provided

// Convert to proper date format if provided
$event_start_date = $event_start_date ? date("Y-m-d", strtotime($event_start_date)) : null;
$event_end_date = $event_end_date ? date("Y-m-d", strtotime($event_end_date)) : null;

// Check for missing required fields and log them
if (!$event_name || !$event_start_date || !$event_end_date) {
    $msg = "Missing fields - Name: $event_name, Start: $event_start_date, End: $event_end_date\n";
    file_put_contents("debug_log.txt", $msg, FILE_APPEND);
    echo json_encode(['status' => false, 'msg' => 'Missing required fields.']);
    exit;
}

// Prepare SQL insert
$insert_query = "
    INSERT INTO calendar_event_master 
    (event_name, event_start_date, event_end_date, url, color)
    VALUES (?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($insert_query);
if (!$stmt) {
    file_put_contents("debug_log.txt", "Prepare failed: {$conn->error}\n", FILE_APPEND);
    echo json_encode(['status' => false, 'msg' => 'Prepare failed: ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $event_name, $event_start_date, $event_end_date, $url, $color);

// Execute and log results
if ($stmt->execute()) {
    file_put_contents("debug_log.txt", "Insert success!\n", FILE_APPEND);
    echo json_encode(['status' => true, 'msg' => 'Event added successfully!']);
} else {
    file_put_contents("debug_log.txt", "Insert error: {$stmt->error}\n", FILE_APPEND);
    echo json_encode(['status' => false, 'msg' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>






/*

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
