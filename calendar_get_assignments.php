<?php
// calendar_get_assignments.php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=localhost;dbname=preptastic", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("
        SELECT rc.id, rc.assign_date, rc.assign_time, rc.note, r.name AS recipe_name
        FROM recipe_calendar rc
        JOIN recipes r ON rc.recipe_id = r.id
    ");

    $events = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $title = $row['recipe_name'];
        $start = $row['assign_date'];
        if ($row['assign_time']) {
            $start .= 'T' . $row['assign_time'];
        }

        $events[] = [
            'id' => $row['id'],
            'title' => $title,
            'start' => $start,
            'note' => $row['note']
        ];
    }

    echo json_encode($events);
} catch (Exception $e) {
    echo json_encode([]);
}
?>
