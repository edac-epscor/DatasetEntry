<?php
echo '<h5>'.($_SERVER['HTTPS'] ? 'SSESS' : 'SESS') . substr(hash('sha256', $_SERVER['SERVER_NAME']), 0, 32).'</h5>';
?>

