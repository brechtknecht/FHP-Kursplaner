<?php
$response = file_get_contents('https://fhp.incom.org/action/vlv-download-json/'). '('. json_encode($data).')';

echo $response
?>
