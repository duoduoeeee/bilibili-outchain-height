<?php

function makeHttpRequest($aid, $p) {
    $RequestURL = file_get_contents('https://api.bilibili.com/x/player/pagelist?aid='.$aid.'&jsonp=jsonp');
    $array = (string)$p-1; //json 从 0 开始计数
    $pageListObject = json_decode($RequestURL);
    $cid = $pageListObject -> data[$array] -> cid;
    return array($cid);
}

?>
