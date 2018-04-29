<?php
header("Referer: https://api.bilibili.com");
header('Content-Type: application/json');
require_once ('jinkela.php');

$avid = isset($_GET['aid']) ? $_GET['aid']: '7248433'; 
$pn = isset($_GET['p']) ? $_GET['p']: '1';

$result = makeHttpRequest($avid, $pn);
$data = "{\"cid\":" .$result[0]. "}";
echo $data;
?>
