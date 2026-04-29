<?php
$conn = mysqli_connect('localhost', 'root', '', 'vteen');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT id, short_code, file_path, original_name FROM images ORDER BY id DESC LIMIT 5";
$result = mysqli_query($conn, $sql);

echo "--- 5 ANH MOI NHAT ---\n";
while($row = mysqli_fetch_assoc($result)) {
    echo "ID: " . $row['id'] . "\n";
    echo "Code: " . $row['short_code'] . "\n";
    echo "Path: " . $row['file_path'] . "\n";
    echo "Name: " . $row['original_name'] . "\n";
    echo "----------------------\n";
}
mysqli_close($conn);
?>
