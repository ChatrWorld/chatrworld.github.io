<?php
// Read the chat log from the file
if (file_exists("chat_log.txt")) {
    $chat_log = file_get_contents("chat_log.txt");
    echo $chat_log;
}
?>
