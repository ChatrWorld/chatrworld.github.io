<?php
// Get the posted data from JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$username = isset($data['username']) ? htmlspecialchars($data['username']) : 'Guest';
$message = isset($data['message']) ? htmlspecialchars($data['message']) : '';

// Save the message to the chat log
$file = fopen("chat_log.txt", "a");
fwrite($file, "<strong>{$username}</strong>: {$message}\n");
fclose($file);

// Return the updated chat log as a response
echo "<strong>{$username}</strong>: {$message}\n";
?>
