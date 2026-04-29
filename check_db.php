<?php
$conn = mysqli_connect('localhost', 'root', '', 'vteen');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT id, short_code, file_path, original_name FROM images WHERE original_name LIKE 'd1a6%' OR file_path LIKE '%d1a6%' LIMIT 10";
$result = mysqli_query($conn, $sql);

echo "--- KET QUA TIM KIEM d1a6 ---\n";
while($row = mysqli_fetch_assoc($result)) {
    echo "ID: " . $row['id'] . "\n";
    echo "Code: " . $row['short_code'] . "\n";
    echo "Path: " . $row['file_path'] . "\n";
    echo "Name: " . $row['original_name'] . "\n";
    echo "----------------------\n";
}
mysqli_close($conn);
?>
